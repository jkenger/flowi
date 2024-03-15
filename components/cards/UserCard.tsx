import Image from 'next/image';
import React from 'react'
import Tag from '../ui/tag';
import Link from 'next/link';
import { getTopInteractedTags } from '@/lib/actions/tag.action';
import { Badge } from '../ui/badge';

interface UserCardProps {
  user: {
    _id : string;
    clerkId: string;
    name: string;
    avatar: string;
    userName: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const { _id, name, avatar, userName, clerkId } = user;
  const interactiveTags = await getTopInteractedTags({userId: _id, limit: 3}) || []
  return (
    <Link
      href={`/profile/${clerkId}`}
      className="w-[230px] md:w-[260px] p-8 flex flex-col items-center justify-center background-light900_dark200 border light-border rounded-lg"
    >
      <Image
        alt="Avatar"
        src={avatar}
        width={100}
        height={100}
        className="rounded-full object-contain max-h-[100px]"
      />
      <h3 className="text-dark300_light900 pt-6">{name ?? "Ken Gervacio"}</h3>
      <span className="body-regular text-light400_light500">
        @{userName ?? "gervacioken"}
      </span>
      <div className="flex gap-2 mt-6">
        {interactiveTags?.length > 0 ? (
          interactiveTags?.map((tag) => <Tag title={tag.name} key={tag._id} />)
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </Link>
  );
};

export default UserCard