import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Head>
      <div>
        <h2 className=" font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-lg">
          No worries, let's <Link href="/">go back home</Link>.
        </p>
      </div>
    </>
  )
}
