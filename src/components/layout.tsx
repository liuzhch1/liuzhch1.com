'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavLink {
  path: string
  text: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const links: NavLink[] = [
    { path: '/', text: 'Home' },
    { path: '/posts', text: 'Posts' },
    { path: '/about', text: 'About Me' },
  ]

  const isCurrentPage = (path: string): 'page' | undefined => {
    return pathname === path ? 'page' : undefined
  }

  return (
    <div className="max-w-3xl mx-auto">
      <header className="flex p-4 pb-3.5 border-b border-dashed border-gray-200">
        <div className="flex items-center gap-4 box-border">
          <Link href="/" className="text-base font-bold no-underline mr-4">
            Joey's Blog
          </Link>
          <nav>
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`ml-4 leading-normal hover:underline ${
                  isCurrentPage(link.path) ? 'underline' : ''
                }`}
                aria-current={isCurrentPage(link.path)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4 [&>:first-child]:mt-0">{children}</main>
    </div>
  )
}

export default Layout
