'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'liuzhch1/liuzhch1.com')
    script.setAttribute('data-repo-id', 'R_kgDONJDFtQ')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDONJDFtc4Cj_jT')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute(
      'data-theme',
      resolvedTheme === 'dark' ? 'dark' : 'light',
    )
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const container = ref.current
    container.innerHTML = ''
    container.appendChild(script)
  }, [resolvedTheme])

  return <div ref={ref} />
}
