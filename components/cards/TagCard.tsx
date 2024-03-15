import Image from "next/image";
import React from "react";
import Tag from "../ui/tag";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface TagCardProps {
  tag: {
    _id: string;
    name: string;
    description: string;
    followers: string[];
  };
}

const TagCard = async ({ tag }: TagCardProps) => {
  const { _id, name, description, followers } = tag;
  return (
    <Link
      href={`/tags/${_id}`}
      className="w-[230px] md:w-[260px] p-8 flex flex-col items-start gap-4 justify-center background-light900_dark200 border light-border rounded-lg"
    >
        <div className="background-light800_dark400 px-5 py-1.5 ">
          <span className="text-dark300_light900 paragraph-semibold">
            {name}
          </span>
        </div>
        <p className="small-regular text-dark500_light700">
          {" "}
          {description}
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="body-semibold primary-text-gradient">
            {followers.length || 0}
          </span>
          <span className="small-medium text-dark400_light500">Questions</span>
        </div>
    </Link>
  );
};

export default TagCard;
