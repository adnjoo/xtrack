"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { APP_NAME, PAGES } from "@/app/lib/constants";

export default function MyNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href={PAGES.HOME.href}>
        <img src="/logo.svg" className="mr-3 h-9" alt="XT Logo" />
        <span className="hidden sm:block whitespace-nowrap text-xl font-semibold dark:text-white">
          {APP_NAME}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <Navbar.Toggle className='ml-2' />
      </div>
      <Navbar.Collapse>
        {Object.values(PAGES).map((page) => (
          <Navbar.Link key={page.label} as={Link} href={page.href}>
            {page.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
