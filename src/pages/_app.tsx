import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <link
          rel="stylesheet"
          href="https://unpkg.com/katex@latest/dist/katex.min.css"
        />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
