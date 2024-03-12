"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedOut, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'

const NavContent = () => {
  const pathname = usePathname()
  const {isSignedIn} = useAuth()
  return (
    <section className="flex h-full flex-col gap-6">
      {sidebarLinks.map((link, index) => {
        const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route) 
        return link.label === "Profile" && !isSignedIn ? null : (
          <Link href={link.route} key={index} className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}>
            <Image src={link.imgURL} alt={link.label} width={20} height={20} className={`${isActive ? "" : "invert-colors"}`} />
            <p className={`${isActive ? 'base-bold' : 'base-medium'} hidden lg:block`}>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}


const LeftSidebar = () => {
  return (
    <nav className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col justify-between h-full background-light900_dark200 border-none w-full">
        <NavContent />
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in" className="flex items-center gap-3">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient hidden lg:block">
                  Log In
                </span>
                <Image
                  src="/assets/icons/account.svg"
                  alt="Log In"
                  width={20}
                  height={20}
                  className="lg:hidden primary-text-gradient invert-colors"
                />
              </Button>
            </Link>
            <Link href="/sign-up" className="flex items-center gap-3">
              <Button className="small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] w-full border rounded-lg px-4 py-3 shadow-none">
                <span className="hidden lg:block">Sign up</span>
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="Log In"
                  width={20}
                  height={20}
                  className="lg:hidden invert-colors"
                />
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}

export default LeftSidebar