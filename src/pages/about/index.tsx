import Head from 'next/head'
import Remark42 from '@/components/Remark42'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Joey's Blog</title>
        <meta name="description" content="About Joey" />
      </Head>
      <div>
        <p className="text-lg mt-2">
          我目前在{' '}
          <a href="https://www.hiorka.com/" target="_blank">
            Orka
          </a>{' '}
          工作，致力于让助听器更加 <span>accessible</span>。
        </p>
        <p className="text-lg m-0 mt-4">
          我喜欢探索优雅、有创造性的软件。把它们分享给身边的人，讨论我们的想法。希望能给大家带来效率、启发或者只是
          happiness。
        </p>
        <p className="text-lg m-0 mt-4">
          我是单机游戏爱好者。喜欢有挑战性的游戏，比如只狼、Sifu
          。喜欢独立游戏，比如动物井、武士零和蔚蓝。前段时间拿下了武士零的
          <a
            href="https://liuzhch1.com/posts/katana-zero-speedrun"
            target="_blank"
          >
            速通成就
          </a>
          。
        </p>
      </div>
      <hr className="my-8" />
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
            <a href="https://antfu.me/">Antfu's Blog</a>
          </li>
          <li>
            <a href="https://github.com/11ty/eleventy-base-blog">
              Eleventy Base Blog
            </a>
          </li>
        </ul>
      </div>
      <p className="text-gray-400 text-xs m-0 mt-6 flex justify-end">
        本页更新于 2025.02.22
      </p>
      <Remark42 />
    </>
  )
}
