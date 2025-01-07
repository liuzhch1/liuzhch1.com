import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Joey Liu's Page</title>
        <meta name="description" content="Joey Liu's personal page" />
      </Head>
      <div>
        <p className="text-lg m-0">
          <span className="text-gray-400">我是一名</span>软件工程师、
          <br />
          游戏玩家<span className="text-gray-400">、以及</span>
          <br />
          游戏开发者<span className="text-gray-400">。</span>
        </p>
        <p className="text-lg m-0 mt-12">
          我目前在{' '}
          <a href="https://www.hiorka.com/" target="_blank">
            Orka
          </a>{' '}
          工作，致力于让助听器更加普惠。
        </p>
        <p className="text-lg m-0 mt-4">
          我喜欢探索优雅、有创造性的软件。把它们分享给身边的人，讨论我们的想法。希望能给大家带来效率、启发或者只是
          happiness。
        </p>
        <p className="text-lg m-0 mt-4">
          最近我推荐{' '}
          <a href="https://www.cursor.com/" target="_blank">
            Cursor
          </a>{' '}
          来高效写码、和 ChatGPT{' '}
          <a href="https://chatgpt.com/" target="_blank">
            o1
          </a>{' '}
          来探讨有趣的话题，o1 真的比 4o 强了不少。一个月前我会推荐 Claude 的
          sonnet 3.5，但是前段时间它把我号封了，最近只在用 API。
        </p>
        <p className="text-lg m-0 mt-4">
          我是一个单机游戏爱好者。喜欢有挑战性的游戏，比如{' '}
          <a href="https://store.steampowered.com/app/814380" target="_blank">
            只狼
          </a>
          、
          <a href="https://store.steampowered.com/app/2138710" target="_blank">
            师傅
          </a>
          。还有独立游戏，比如{' '}
          <a href="https://store.steampowered.com/app/813230" target="_blank">
            动物井
          </a>
          、
          <a href="https://store.steampowered.com/app/460950" target="_blank">
            武士零
          </a>{' '}
          和{' '}
          <a href="https://store.steampowered.com/app/504230" target="_blank">
            蔚蓝
          </a>
          。这几天在磨 武士零 的最后一个速通成就。
        </p>
        <p className="text-lg m-0 mt-4">
          <strong>最近痴迷游戏开发</strong>，正在学习{' '}
          <a href="https://godotengine.org/" target="_blank">
            Godot
          </a>{' '}
          和{' '}
          <a href="https://www.aseprite.org/" target="_blank">
            Aseprite
          </a>
          。 大学时期有一些{' '}
          <a href="https://github.com/liuzhch1/UnityProject" target="_blank">
            Unity 经历
          </a>
          。 <br />
          我比较熟悉 coding，偏好 2D
          游戏，如果你正在做有意思的游戏项目，请联系我{' '}
          <code>hi@liuzhch1.com</code>。
        </p>
        <p className="text-gray-400 text-xs m-0 mt-6 flex justify-end">
          本页更新于 2025.01.07
        </p>
      </div>
    </>
  )
}
