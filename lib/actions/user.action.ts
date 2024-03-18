"use server"

import User from "@/app/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/app/database/question.model";
import Answer from "@/app/database/answer.model";

export async function getUserById(params: any){
  try{
    connectToDatabase();
    const {userId} = params;
    const user = await User.findOne({clerkId: userId});
    console.log("user", user)
    return user;
  }catch(e){
    console.log(e)
  }
}

export async function createUser(userData: any){
  try{
    connectToDatabase();
    const user = await User.create(userData);
    return user;
  }catch(e){
    console.log(e)
  }

}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    
    const {clerkId, updateData, path} = params;

    await User.findOneAndUpdate({clerkId}, updateData, {new: true});
    
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if(!user){
      throw new Error('User not found')
    }

    // Delete user from database
    const userQuestionIds = await Question.find({author: user._id}).distinct('_id');

    await Question.deleteMany({author: user._id});

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (e) {
    console.log(e);
  }
}

export const getUsers = async (params: any) => {
  try {
    connectToDatabase();

    const {page = 1, pageSize = 20, filter, searchQuery} = params
    
    const users = await User.find({}).sort({createdAt: -1});
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase();
    const {question, author, content, path} = params;
    const answer = await Answer.create({
      content,
      author,
      question,
      path,
    });
    await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: answer._id } },
      { new: true }
    );
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

