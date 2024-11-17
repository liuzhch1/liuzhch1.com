'use client'

import Script from 'next/dist/client/script'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Head from 'next/head'
import { IcBaselineRssFeed } from './IcBaselineRssFeed'

interface NavLink {
  path: string
  text: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const links: NavLink[] = [
    { path: '/posts', text: 'Posts' },
    { path: '/about', text: 'About' },
  ]

  const isCurrentPage = (path: string): 'page' | undefined => {
    return pathname === path ? 'page' : undefined
  }

  // Check if we're on a single post page
  const isPostPage = pathname?.startsWith('/posts/') && pathname !== '/posts'

  return (
    <>
      <Head>
        <meta name="author" content="Joey Liu" />
      </Head>
      <div className="max-w-[44em] mx-auto">
        <header
          className={`flex justify-between p-4 pb-3.5 transition-opacity duration-200 ${
            pathname === '/' ? 'pb-1' : 'pb-12'
          } ${isPostPage ? 'opacity-10 dark:opacity-20 hover:opacity-100' : ''}`}
        >
          <div className="flex items-center gap-4 box-border">
            <Link href="/" className="text-2xl font-bold no-underline">
              Joey Liu
              <span className="text-sm text-gray-400 pl-3 font-normal">
                aka liuzhch1
              </span>
            </Link>
          </div>
          <nav className="flex">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-lg font-medium leading-normal hover:underline mx-4 ${
                  isCurrentPage(link.path)
                    ? 'underline text-gray-900 dark:text-gray-200'
                    : 'no-underline text-gray-500 dark:text-gray-400'
                }`}
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="/feed.xml"
              className="text-lg font-medium leading-normal hover:underline mx-2"
            >
              <IcBaselineRssFeed
                width="1.45rem"
                height="1.45rem"
                className="text-gray-500 dark:text-gray-400"
              />
            </Link>
          </nav>
          <Script
            defer
            src="/scripts/script.js"
            data-website-id="428d2de9-9ee4-4391-b59e-1ab846697d13"
          />
        </header>
        <main className="p-4 [&>:first-child]:mt-0">{children}</main>
      </div>
    </>
  )
}

export default Layout
