import { FilterButtons, FilterSelect } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearch";
import { CommunityFilters } from "@/constants/filter";

import Link from "next/link";
import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getUsers } from "@/lib/actions/community.action";

const USERS = [
  {
    _id: "1",
    name: "John Doe",
    avatar: "",
    username: "johndoe",
    tags: ["HTML", "CSS", "Python"],
  },
  {
    _id: "2",
    name: "Jane Smith",
    avatar: "",
    username: "janesmith",
    tags: ["engineer", "writer"],
  },
];

const Community = async () => {
  const users = await getUsers({});
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing contributors here..."
          others="w-full"
        />
        <FilterSelect
          options={CommunityFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="md:hidden"
        />
      </div>
      <div className="flex flex-wrap justify-start pt-8 gap-6">
        {users?.length || -1 > 0 ? (
          users?.map((user) => (
            <UserCard
              key={user._id}
              name={user.name}
              avatar={user.avatar}
              userName={user.userName}
              tags={user.tags}
            />
          ))
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
};

export default Community;
