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
          来高效写码、和{' '}
          <a href="https://www.deepseek.com/" target="_blank">
            DeepSeek R1
          </a>
          来探讨各种话题。DS真的挺强的，挑战到o1的地位，而且还开放了模型，可以
          <a href="https://ollama.com/library/deepseek-r1" target="_blank">
            本地试玩蒸馏版本
          </a>
          。难以想象它居然成为了春节的热点话题，同学、家人都在问。
          <br />
          半个月前我会推荐 Claude 的 sonnet 3.5，但是 R1 出来之后，它就失宠了。
        </p>
        <p className="text-lg m-0 mt-4">
          我是单机游戏爱好者。喜欢有挑战性的游戏，比如只狼、Sifu
          。还有独立游戏，比如动物井、武士零和蔚蓝。前段时间拿下了武士零的
          <a
            href="https://liuzhch1.com/posts/katana-zero-speedrun"
            target="_blank"
          >
            速通成就
          </a>
          。
        </p>
        <p className="text-lg m-0 mt-4">
          <strong>最近痴迷游戏开发</strong>，正在玩 Godot 和 Aseprite
          。大学时期有一些{' '}
          <a href="https://github.com/liuzhch1/UnityProject" target="_blank">
            Unity 经历
          </a>
          。 <br />
          我比较熟悉 coding，偏好 2D 游戏。我喜欢动作、挑战和成就类型游戏。
          如果你正在做有意思的游戏项目，可以联系我加入{' '}
          <code>hi@liuzhch1.com</code>。
        </p>
        <p className="text-gray-400 text-xs m-0 mt-6 flex justify-end">
          本页更新于 2025.02.02
        </p>
      </div>
    </>
  )
}
