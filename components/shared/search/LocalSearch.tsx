"use client"
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react'

type CustomInputProps = {
  route?: string;
  iconPosition?: string;
  imgSrc?: string;
  placeholder?: string;
  others?: string;
}

const LocalSearchBar = ({route, iconPosition, imgSrc, placeholder = "Search questions...", others}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${others}`}
    >
      {iconPosition === "left" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}

export default LocalSearchBar