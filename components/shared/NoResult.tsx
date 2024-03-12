import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const NoResult = () => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No Result Illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No Result Illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />

      <h2 className="h2-bold text-dark300_light900 mt-4">
        There&apos;s no question to show
      </h2>
      <p className="body-regular text-dark500_light700 text-center max-w-sm mt-4">
        Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡
      </p>
      <Link href="/ask-question">
        <Button className="paragraph-medium primary-gradient min-h-[46px] px-4 py-3 !text-light-900 mt-6">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
}

export default NoResult