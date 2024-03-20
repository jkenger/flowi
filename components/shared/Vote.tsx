"use client"

import { downvote, upvote } from '@/lib/actions/votes.action';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

type VoteProps = {
  id: string;
  userId: string;
  source: string;
  type: "upvote" | "downvote";
  votes: number;
  hasVoted: boolean;
  mongoModel: string;
};



const Vote = ({source="question", id, userId, type = "upvote", votes = 0, hasVoted, mongoModel}: VoteProps) => {
  const pathname = usePathname();
  const hasUpvoted = type === "upvote" ? hasVoted : false;
  const hasDownvoted = type === "downvote" ? hasVoted : false;

  async function handleVote(vote: any){
    const voteResult = await vote({
      mongoModel,
      id: JSON.parse(id),
      userId: JSON.parse(userId),
      hasupVoted: hasUpvoted,
      hasdownVoted: hasDownvoted,
      path: pathname,
    });
    console.log(voteResult) 
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={() => handleVote(type === "upvote" ? upvote : downvote)}>
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