import { FilterButtons, FilterSelect } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters, QuestionFilters } from "@/constants/filter";
import Link from "next/link";
import React from "react";

const QUESTIONS = [
  {
    _id: 1,
    title: "React, A Javascript Library for Building User Interfaces",
    tags: [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "react" },
    ],
    author: {
      name: "Ken Gervacio",
      avatar: "https:placehold.co/100x100?text=Ken+Gervacio",
    },
    views: 100404,
    answers: 10,
    upvotes: 5,
    createdAt: new Date(),
  },
  {
    _id: 2,
    title: "JavaScript Promises: A Beginner's Guide",
    tags: [
      { _id: 3, name: "javascript" },
      { _id: 4, name: "promises" },
    ],
    author: {
      name: "Alice Smith",
      avatar: "https:placehold.co/100x100?text=Alice+Smith",
    },
    views: 50,
    answers: 3,
    upvotes: 2,
    createdAt: new Date(),
  },
  {
    _id: 3,
    title: "Introduction to TypeScript",
    tags: [
      { _id: 5, name: "typescript" },
      { _id: 6, name: "javascript" },
    ],
    author: {
      name: "Bob Johnson",
      avatar: "https:placehold.co/100x100?text=Bob+Johnson",
    },
    views: 80,
    answers: 8,
    upvotes: 4,
    createdAt: new Date(),
  },
  {
    _id: 4,
    title: "Getting Started with React Hooks",
    tags: [
      { _id: 7, name: "react" },
      { _id: 8, name: "hooks" },
    ],
    author: {
      name: "Carol Davis",
      avatar: "https:placehold.co/100x100?text=Carol+Davis",
    },
    views: 120,
    answers: 12,
    upvotes: 6,
    createdAt: new Date(),
  },
  {
    _id: 5,
    title: "CSS Flexbox: A Comprehensive Guide",
    tags: [
      { _id: 9, name: "css" },
      { _id: 10, name: "flexbox" },
    ],
    author: {
      name: "David Wilson",
      avatar: "https:placehold.co/100x100?text=David+Wilson",
    },
    views: 90,
    answers: 6,
    upvotes: 3,
    createdAt: new Date(),
  },
  {
    _id: 6,
    title: "Node.js Basics: Getting Started",
    tags: [
      { _id: 11, name: "node.js" },
      { _id: 12, name: "javascript" },
    ],
    author: {
      name: "Eve Thompson",
      avatar: "https:placehold.co/100x100?text=Eve+Thompson",
    },
    views: 70,
    answers: 5,
    upvotes: 2,
    createdAt: new Date(),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          others="w-full"
        />
        <FilterSelect
          options={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="md:hidden"
        />
      </div>
      <FilterButtons
        options={HomePageFilters}
        containerClasses="hidden md:flex mt-8"
      />
      <div className="flex flex-col pt-8 gap-6">
        {QUESTIONS.length > 0 ? (
          QUESTIONS.map((question) => (
          <QuestionCard 
            key={question._id}
            _id={question._id} 
            tags={question.tags} 
            title={question.title} 
            author={question.author} 
            views={question.views} 
            answers={question.answers} 
            upvotes={question.upvotes} 
            createdAt={question.createdAt} 
            />
        ))
        ) : (
          <NoResult/>
        )}
      </div>
    </>
  );
};

export default Home;
