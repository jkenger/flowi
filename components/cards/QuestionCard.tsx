import React from 'react'
import Tag from '../ui/tag'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import { formatNumber, getTimestamp } from '@/lib/utils';
import Link from 'next/link';
import { Stat } from '../shared/Stat';
import { IAnswer } from '@/app/database/answer.model';


type CustomQuestionProps = {
    _id: number,
    title: string,
    tags: {
      _id: number,
      name: string,
    }[],
    author: {
      clerkId: string,
      name: string,
      avatar: string,
    },
    views: number,
    answers: IAnswer[],
    upvotes: number,
    createdAt: Date,
}


const QuestionCard = ({
  _id,
  tags = [],
  title = "The Lightning Component",
  author,
  createdAt,
  views, upvotes, answers,
}: CustomQuestionProps) => {
  console.log(author);
  return (
    <div className="flex flex-col gap-3 background-light800_darkgradient p-8 rounded-lg">
      <Link href={`/question/${_id}`} className="h3-bold text-dark300_light900">
        {title}
      </Link>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Link href={`/tags/${tag._id}`} key={tag._id}>
            <Tag title={tag?.name} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between mt-4">
        <div className="flex items-center gap-1">
          <Avatar className="w-4 h-4">
            <AvatarImage src={author?.avatar} />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>
          <Link href={`/profile/${author?.clerkId}`}>
            <span className="body-medium text-dark400_light800">
            {author?.name || "Ken Gervacio"}{" "}
            <span className="small-regular text-dark400_light800">
              • {getTimestamp(createdAt) || "1 day ago"}
            </span>
          </span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Stat
            icon="/assets/icons/like.svg"
            value={upvotes || 0}
            label="Votes"
          />
          <Stat
            icon="/assets/icons/message.svg"
            value={answers.length || 0}
            label="Answers"
          />
          <Stat icon="/assets/icons/eye.svg" value={views || 0} label="Views" />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard