import { FilterButtons, FilterSelect } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearch";
import { CommunityFilters, UserFilters } from "@/constants/filter";

import Link from "next/link";
import React from "react";
import UserCard from "@/components/cards/UserCard";
import { getUsers } from "@/lib/actions/user.action";

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
  
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing contributors here..."
          others="w-full"
        />
        <FilterSelect
          options={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="flex flex-wrap justify-start pt-8 gap-6">
        {users?.length || 0 > 0 ? (
          users?.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Be the first to join
            </Link>
          </div>  
        )}
      </div>
    </>
  );
};

export default Community;
