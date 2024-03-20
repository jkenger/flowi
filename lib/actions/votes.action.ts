
"use server"

import Question from "@/app/database/question.model";
import { connectToDatabase } from "../mongoose";
import { QuestionVoteParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "@/app/database/user.model";
import { Model } from "mongoose";
import Answer from "@/app/database/answer.model";

interface IVoteParams {
  userId: string;
  id: string;
  path: string;
  hasupVoted?: boolean;
  hasdownVoted?: boolean;
  mongoModel: string;
}

const Models = {
  Question: Question,
  Answer: Answer,
}

export async function upvote(params: IVoteParams) {
  const { userId, id, path, hasupVoted, mongoModel } = params;
  console.log(mongoModel)
  try {
    connectToDatabase();
    let query = {};
    if (hasupVoted) {
      query = {
        $pull: {
          upvotes: userId,
        },
      };
    } else {
      query = {
        $addToSet: {
          upvotes: userId,
        },
        $pull: {
          downvotes: userId,
        },
      };
    }
    await (Models as any)[mongoModel].findByIdAndUpdate(id, query);
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function downvote(params: IVoteParams) {
  const { mongoModel, userId, id, path, hasdownVoted } = params;
  let query = {};
  try {
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
      };
    }
    await (Models as any)[mongoModel].findByIdAndUpdate(id, query);

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}