import { FilterButtons, FilterSelect } from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearch";
import { TagFilters, UserFilters } from "@/constants/filter";

import Link from "next/link";
import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getTags } from "@/lib/actions/tag.action";
import TagCard from "@/components/cards/TagCard";

const Tags = async () => {
  const tags = await getTags();
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing contributors here..."
          others="w-full"
        />
        <FilterSelect
          options={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="flex flex-wrap justify-start pt-8 gap-6">
        {tags?.length || 0 > 0 ? (
          tags?.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No tags yet</p>
            <Link href="/ask-question" className="mt-1 font-bold text-accent-blue">
               Create a tag
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Tags;
