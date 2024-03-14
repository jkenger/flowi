import { FilterButtons, FilterSelect } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/QuestionCard";
import LocalSearchBar from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters, QuestionFilters } from "@/constants/filter";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";


const Home = async () => {
  const questions = await getQuestions({});
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
        {questions?.length || -1 > 0 ? (
          questions?.map((question) => (
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
          <NoResult />
        )}
      </div>
    </>
  );
};

export default Home;
