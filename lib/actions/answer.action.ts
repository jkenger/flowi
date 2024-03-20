import Question from '@/app/database/question.model';
import { connectToDatabase } from './../mongoose';
import { GetAnswersParams } from './shared.types.d';
export async function getAnswers(params: GetAnswersParams) {
  // questionId: string;
  // sortBy?: string;
  // page?: number;
  // pageSize?: number;

  const { questionId } = params;

  try {
    connectToDatabase();
    const question = await Question.findById(questionId)
      .populate({
        path: "answers",
        model: "Answer",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .sort({
        createdAt: -1,
      });
    return question.answers;
  } catch (e) {
    console.log(e);
  }
}

