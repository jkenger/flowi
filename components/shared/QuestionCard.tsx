import React from 'react'
import Tag from '../ui/tag'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import { formatNumber, getTimestamp } from '@/lib/utils';


type CustomQuestionProps = {
    _id: number,
    title: string,
    tags: {
      _id: number,
      name: string,
    }[],
    author: {
      name: string,
      avatar: string,
    },
    views: number,
    answers: number,
    upvotes: number,
    createdAt: Date,
}
const Stat = ({icon, value, label, containerClasses, otherClasses}: {icon: string, value: number, label: string, containerClasses?: string, otherClasses?: string}) => {
  return (
    <div className={`flex gap-1 items-center ${containerClasses}`}>
      <Image alt="Stat Icon" src={icon} width={16} height={16} />
      <span className={`text-dark400_light800 small-medium ${otherClasses}`}>
        {formatNumber(value)} {label}{" "}
      </span>
    </div>
  );
}

const QuestionCard = ({
  tags = [],
  title = "The Lightning Component",
  author,
  createdAt,
  views, upvotes, answers,
}: CustomQuestionProps) => {
  return (
    <div className="flex flex-col gap-3 background-light800_darkgradient p-8 rounded-lg">
      <h3 className="h3-semibold text-dark300_light900">{title}</h3>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Tag key={tag?._id} title={tag?.name} />
        ))}
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between mt-4">
        <div className="flex items-center gap-1">
          <Avatar className="w-4 h-4">
            <AvatarImage src={author?.avatar} />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>
          <span className="body-medium text-dark400_light800">
            {author?.name || "Ken Gervacio"}{" "}
            <span className="small-regular text-dark400_light800">
              • {getTimestamp(createdAt) || "1 day ago"}
            </span>
          </span>
        </div>
        <div className="flex gap-2">
          <Stat
            icon="/assets/icons/like.svg"
            value={upvotes || 0}
            label="Votes"
          />
          <Stat
            icon="/assets/icons/message.svg"
            value={answers || 0}
            label="Answers"
          />
          <Stat icon="/assets/icons/eye.svg" value={views || 0} label="Views" />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard