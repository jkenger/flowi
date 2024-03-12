import Tag from '@/components/ui/tag';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Questions = [
  {
    title: "How to use Next.js with Tailwind CSS?",
  },
  {
    title: "What are the best practices for React component organization?",
  },
  {
    title: "How to implement authentication in a React app?",
  },
  {
    title: "What are the differences between React and Angular?",
  },
  {
    title: "How to optimize performance in a React app?",
  },
];

const Tags = [
  {
    title: "React",
    total: 31
  },
  {
    title: "Next.js",
    total: 19
  },
  {
    title: "Tailwind CSS",
    total: 18
  },
  {
    title: "Authentication",
    total: 14
  },
  {
    title: "Performance",
    total: 9
  }
]



const TopQuestionCard = ({ title }: { title: string }) => {
  return (
    <Link href="#" className="flex justify-between gap-4">
      <p className="text-dark500_light700 body-medium">{title}</p>
      <Image src="/assets/icons/chevron-right.svg" alt="Chevron Right" width={20} height={20} className='invert-colors' />
    </Link>
  );
}

const TagCard = ({ title, total }: { title: string, total: number }) => {
  return (
    <Link href="#" className="flex justify-between gap-2 bg-light-300_dark-900 rounded-lg">
      <Tag title={title}/>
      <p className="text-dark300_light900 small-medium">{total}</p>
    </Link>
  );
}

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6">
          <h3 className="h3-bold text-dark300_light900">Top Questions</h3>
          {Questions.map((question, index) => (
            <TopQuestionCard key={index} title={question.title} />
          ))}
        </div>
        <div className="flex flex-col gap-6 mt-16">
          <h3 className="h3-bold text-dark300_light900">Popular Tags</h3>
          <div className="flex flex-col gap-4">
            {Tags.map((tag, index) => (
              <TagCard key={index} title={tag.title} total={tag.total} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RightSidebar