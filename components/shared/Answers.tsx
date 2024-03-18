import React from 'react'
import { FilterSelect } from './Filter';
import { AnswerFilters } from '@/constants/filter';
import { getAnswers } from '@/lib/actions/question.action';
import ParseHTML from './ParseHTML';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { getTimestamp } from '@/lib/utils';
import Vote from './Vote';
import Save from './Save';
import { getUserById } from '@/lib/actions/user.action';
import { IUser } from '@/app/database/user.model';
import { mongo } from 'mongoose';
interface IAnswersProps {
  questionId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
  mongoUser: IUser;
}

const Answers = async ({questionId, totalAnswers, mongoUser}: IAnswersProps) => {
  const answers = await getAnswers({ questionId: JSON.parse(questionId) });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <FilterSelect options={AnswerFilters} />
      </div>

      <div>
        {answers?.map((answer: any) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex justify-between ">
              <div className="flex items-center gap-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={answer.author?.avatar} />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
                <Link href={`/profile/${answer.author?.clerkId}`}>
                  <span className="body-medium text-dark400_light800">
                    {answer.author?.name || "Ken Gervacio"}{" "}
                    <span className="small-regular text-dark400_light800">
                      • {getTimestamp(answer.createdAt) || "1 day ago"}
                    </span>
                  </span>
                </Link>
              </div>
              <div className="flex gap-2">
                <Vote
                  userId={JSON.stringify(mongoUser._id)}
                  questionId={JSON.stringify(questionId)}
                  source="question"
                  type="upvote"
                  votes={answer.upvotes.length}
                  hasVoted={answer.upvotes.includes(mongoUser._id)}
                />
                <Vote
                  userId={JSON.stringify(mongoUser._id)}
                  questionId={JSON.stringify(questionId)}
                  source="question"
                  type="downvote"
                  votes={answer.downvotes.length}
                  hasVoted={answer.downvotes.includes(mongoUser._id)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ParseHTML data={answer.content} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Answers