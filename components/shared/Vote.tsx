"use client"

import {  downvoteQuestion, upvoteQuestion } from '@/lib/actions/votes.action';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

type VoteProps = {
  questionId: string;
  userId: string;
  source: string;
  type: "upvote" | "downvote";
  votes: number;
  hasVoted: boolean;
};


const Vote = ({source="question", questionId, userId, type = "upvote", votes = 0, hasVoted}: VoteProps) => {
  const pathname = usePathname();
  

  async function handleVote(vote: any){
    const voteResult = await vote({
      questionId: JSON.parse(questionId),
      userId: JSON.parse(userId),
      hasupVoted: type === "upvote" ? hasVoted : false,
      hasdownVoted: type === "downvote" ? hasVoted : false, 
      path: pathname,
    });
    console.log(voteResult) 
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={() => handleVote(type === "upvote" ? upvoteQuestion : downvoteQuestion)}>
      {hasVoted ? (
        <Image
          src={`/assets/icons/${type}d.svg`}
          width={20}
          height={20}
          alt={type}
        />
      ) : (
        <Image
          src={`/assets/icons/${type}.svg`}
          width={20}
          height={20}
          alt={type}
        />
      )}
      <span className="small-regular text-dark400_light800 ml-1 background-light800_dark300 px-1.5 py-1 rounded-sm">
        {votes}
      </span>
    </div>
  );
}

export default Vote