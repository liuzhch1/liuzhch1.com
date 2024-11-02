import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { ImagePreview } from '@/components/ImagePreview'

export default function App({ Component, pageProps }: AppProps) {
  const [previewImage, setPreviewImage] = useState<{
    src: string
    alt?: string
  } | null>(null)

  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName !== 'IMG' || target.classList.contains('no-preview'))
        return

      const initialRect = target.getBoundingClientRect()
      setTimeout(() => {
        const newRect = target.getBoundingClientRect()
        if (
          initialRect.left !== newRect.left ||
          initialRect.top !== newRect.top
        )
          return

        setPreviewImage({
          src: (target as HTMLImageElement).src,
          alt: (target as HTMLImageElement).alt,
        })
      }, 50)
    }

    document.addEventListener('click', handleImageClick)
    return () => document.removeEventListener('click', handleImageClick)
  }, [])

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
        {previewImage && (
          <ImagePreview
            {...previewImage}
            onClose={() => setPreviewImage(null)}
          />
        )}
      </Layout>
    </ThemeProvider>
  )
}
