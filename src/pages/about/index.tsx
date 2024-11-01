import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Joey's Blog</title>
        <meta name="description" content="About Joey" />
      </Head>
      <div className="text-lg">
        <p>
          This personal website was built in a fall raining day, though fall is
          my favorite season, I don't like its rainy parts.
        </p>
        <p>Design inspiration drawn from:</p>
        <ul>
          <li>
            <a href="https://www.ekzhang.com/">Eric Zhang</a>
          </li>
          <li>
            <a href="https://sgt.hootr.club/">Molten Matter</a>
          </li>
          <li>
            <a href="https://github.com/11ty/eleventy-base-blog">
              Eleventy Base Blog
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
