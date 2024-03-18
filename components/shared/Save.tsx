"use client";

import Image from "next/image";
import React from "react";

type SaveProps = {
  hasSaved: boolean;
};

const Save = ({ hasSaved }: SaveProps) => {
  function handleSave() {}

  return hasSaved ? (
    <Image
      src="/assets/icons/star-filled.svg"
      width={20}
      height={20}
      alt="save"
      className="ml-2"
      onClick={handleSave}
    />
  ) : (
    <Image
      src="/assets/icons/star.svg"
      width={20}
      height={20}
      alt="save"
      className="ml-2"
      onClick={handleSave}
    />
  );
};

export default Save;
