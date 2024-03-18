
"use server"

import Question from "@/app/database/question.model";
import { connectToDatabase } from "../mongoose";
import { QuestionVoteParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "@/app/database/user.model";

// questionId: string;
// userId: string;
// hasupVoted: boolean;
// hasdownVoted: boolean;
// path: string;

export async function upvoteQuestion(params: any){
  const {userId, questionId, path, hasupVoted} = params;
  try{

    
    connectToDatabase();
    let query = {}
    if(hasupVoted) {
      query = {
        $pull: {
          upvotes: userId,
        },
      };
      
    }else {
      query = {
        $addToSet: {
          upvotes: userId,
        },
        $pull: {
          downvotes: userId,
        },
      };
    }
    await Question.findByIdAndUpdate(questionId, query);
    revalidatePath(path);
  }catch(e)
  {
    console.log(e)
  }
}

export async function downvoteQuestion(params: any){
  const {userId, questionId, path, hasdownVoted} = params;
  let query = {};
  try{
    connectToDatabase();
    if (hasdownVoted) {
      query = {
        $pull: {
          downvotes: userId,
        },
      };
    } else {
      query = {
        $addToSet: {
          downvotes: userId,
        },
        $pull: {
          upvotes: userId,
        },
      }
    }
    await Question.findByIdAndUpdate(questionId, query);

    revalidatePath(path);
  }catch(e){
    console.log(e)
  }
}