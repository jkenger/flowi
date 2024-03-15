import { Stat } from '@/components/shared/Stat'
import { getQuestionById } from '@/lib/actions/question.action'
import { getTimestamp } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type QuestionDetailProps = {
  params: {
    id: string
  }
}

const QuestionDetail = async ({params}: QuestionDetailProps) => {
  const { id } = params;
  const question = await getQuestionById({ questionId: id });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              alt="Avatar"
              src={question.author.avatar}
              width={22}
              height={22}
              className="rounded-full object-contain max-h-[100px]"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex-justify-end">Voting</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Stat
          icon="/assets/icons/clock.svg"
          value={` asked ${getTimestamp(question.createdAt)}`}
        />
        <Stat
          icon="/assets/icons/message.svg"
          value={question.answers.length || 0}
          label="Answers"
        />
        <Stat
          icon="/assets/icons/eye.svg"
          value={question.views || 0}
          label="Views"
        />
      </div>
    </>
  );
}

export default QuestionDetail