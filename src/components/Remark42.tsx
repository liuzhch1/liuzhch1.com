import { useEffect } from 'react'

export default function Remark42() {
  const remark_config = {
    host: 'https://remark42.liuzhch1.com',
    site_id: 'liuzhch1.com',
    url: '',
    components: ['embed'],
    max_shown_comments: 100,
    theme: 'light',
    locale: 'en',
    show_email_subscription: false,
    simple_view: true,
    no_footer: false,
  }

  useEffect(() => {
    window.remark_config = remark_config
    remark_config.url = window.location.pathname
    remark_config.theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'

    const remark42 = window.REMARK42
    if (remark42) {
      remark42.destroy()
      remark42.createInstance(remark_config)
    } else {
      for (const component of remark_config.components) {
        const s = document.createElement('script')
        s.src = `${remark_config.host}/web/${component}.mjs`
        s.type = 'module'
        s.defer = true
        document.head.appendChild(s)
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          const isDark = mutation.target.classList.contains('dark')
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
      </div>
    </>
  )
}
