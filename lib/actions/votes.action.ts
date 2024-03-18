
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

export async function voteQuestion(params: QuestionVoteParams){
  const {userId, questionId, hasupVoted, hasdownVoted, path} = params;
  console.log(params)
  try{
    connectToDatabase();
    const question = await Question.findById(questionId);
    if(!hasupVoted){
      await Question.findByIdAndUpdate(questionId, {
        $addToSet: {
          upvotes: userId,
        },
        $pull: {
          downvotes: userId,
        },
      })
      return {type: "upvote", value: true}
    }

    if(hasupVoted){
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId }
      })
      return {type: "upvote", value: false}
    }

    if (!hasdownVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $addToSet: {
          downvotes: userId,
        },
        $pull: {
          upvotes: userId,
        },
      });
      return { type: "downvote", value: true };
    }

    if (hasdownVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
      return { type: "downvote", value: false };
    }
    revalidatePath(path)
  }catch(e){
    console.log(e)
  }
}