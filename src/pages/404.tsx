import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className=" font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-lg">
          It's ok, let's <Link href="/">go back home</Link>
        </p>
      </div>
    </>
  )
}
