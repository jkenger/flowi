"use client"
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Item } from '@radix-ui/react-menubar';

type CustomFilterProps = {
  options: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}


export const FilterSelect = ({options, otherClasses, containerClasses}: CustomFilterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 ${otherClasses}`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const FilterButtons = ({ options, otherClasses, containerClasses }: CustomFilterProps) => {
  const active = "newest";

  return (
    <div className={`flex gap-4 ${containerClasses}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          className={`body-medium capitalize rounded-lg shadow-none px-6 h-8 ${
            active === option.value
              ? "bg-primary-100 dark:bg-dark-400 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300"
          } ${otherClasses}`}
          onClick={() => {}}
        >
          {option.name}
        </Button>
      ))}
    </div>
  );
};
