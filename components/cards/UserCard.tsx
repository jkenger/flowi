import Image from 'next/image';
import React from 'react'
import Tag from '../ui/tag';

interface UserCardProps {
  name: string;
  avatar: string;
  userName: string;
  tags: string[];
}

const UserCard = ({ name, avatar, userName, tags }: UserCardProps) => {
  return (
    <div className="w-[260px] p-8 text-center background-light900_dark200 border light-border rounded-lg">
      <Image
        alt="Avatar"
        src={avatar}
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3 className="text-dark300_light900">{name ?? "Ken Gervacio"}</h3>
      <span className="body-regular text-light400_light500">
        @{userName ?? "gervacioken"}
      </span>
      <div className="flex gap-2 pt-6">
        {tags?.map((tag) => (
          <Tag title={tag} key={tag} />
        ))}
      </div>
    </div>
  );
};

export default UserCard