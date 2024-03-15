"use server"

import Question from "@/app/database/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/app/database/tag.model";
import { revalidatePath } from "next/cache";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/app/database/user.model";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    
    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    })  

    console.log("question", question)

    let tagDocuments = []

    // Create tags if they don't exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {name: {$regex: new RegExp(`^${tag}$`, "i")}},
        {$setOnInsert: {name: tag}, $push: {questions: question._id}},
        {upsert: true, new: true}
      )
      tagDocuments.push(existingTag)
      await Question.findByIdAndUpdate(question._id, {$push: {tags: existingTag._id}})
    }
    revalidatePath("/");
  } catch (error) {
    console.log(error)
  }
}

export async function getQuestions(param: GetQuestionsParams){
  try{
    connectToDatabase();
    const questions = await Question.find().populate({
      path: "tags",
      model: Tag
    }).populate({
      path: "author",
      model: User
    }).sort({
      createdAt: -1
    });
    return questions;
  }catch(e){
    console.log(e)
  }
}

