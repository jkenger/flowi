
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
    if(hasupVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: {
          upvotes: userId,
        },
      })
    }else {
      await Question.findByIdAndUpdate(questionId, {
        $addToSet: {
          upvotes: userId,
        },
        $pull: {
          downvotes: userId,
        },
      });
    }
    
    revalidatePath(path);
  }catch(e)
  {
    console.log(e)
  }
}

export async function downvoteQuestion(params: any){
  const {userId, questionId, path, hasdownVoted} = params;
  console.log(params)
  try{
    connectToDatabase();
    if (hasdownVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: {
          downvotes: userId,
        },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $addToSet: {
          downvotes: userId,
        },
        $pull: {
          upvotes: userId,
        },
      });
    }
      

    revalidatePath(path);
  }catch(e){
    console.log(e)
  }
}