"use client";

import Link from "next/link";
import { Footer } from "flowbite-react";
import {
  BsGithub,
  BsTwitter,
} from "react-icons/bs";

import { APP_NAME, PAGES } from "@/app/lib/constants";

export default function MyFooter() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Link passHref href={PAGES.HOME.href}>
              <Footer.Brand src="/logo.svg" alt={APP_NAME} name={APP_NAME} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Link href="/">Home</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/about">About</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="learn" />
              <Footer.LinkGroup col>
                <Link href="/blog">Blog</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Link href="/privacy">Privacy</Link>
                <Link href="/tos">Terms &amp; Conditions</Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by={APP_NAME} year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://x.com/adnjoo" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/adnjoo/abc" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
