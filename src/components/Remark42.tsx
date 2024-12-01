import Script from 'next/dist/client/script'
import { useEffect } from 'react'

export default function Remark42() {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          const isDark = mutation.target.classList.contains('dark')
          // @ts-expect-error Remark42 global type not defined
          window.REMARK42?.changeTheme(isDark ? 'dark' : 'light')
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="mt-8">
        <div className="h-0.5 bg-gray-200 dark:bg-gray-700 mx-auto w-[48%]"></div>
        <div className="pt-3 pb-1 text-lg font-bold">Comments</div>
        <div id="remark42"></div>
        <Script defer src="/scripts/remark42.js" />
      </div>
    </>
  )
}
