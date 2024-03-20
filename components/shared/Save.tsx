"use client";

import { toggleSaveQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type SaveProps = {
  hasSaved: boolean;
  questionId: string;
  userId: string;
};

const Save = ({ hasSaved, questionId, userId }: SaveProps) => {
  const pathname = usePathname();
  const [saved, setSaved] = useState(hasSaved);

  async function handleSave() {
    setSaved(!saved);
    await toggleSaveQuestion({
      questionId: JSON.parse(questionId),
      userId: JSON.parse(userId),
      path: pathname,
      hasSaved,
    });
  }

  return (
    <div onClick={handleSave} className="hover:cursor-pointer">
      {saved ? (
        <Image
          src="/assets/icons/star-filled.svg"
          width={18}
          height={18}
          alt="save"
          className="ml-2"
          
        />
        ) : (
        <Image
          src="/assets/icons/star.svg"
          width={18}
          height={18}
          alt="save"
          className="ml-2 invert-colors"
        />
      )}
    </div>
  );
};

export default Save;
