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
          <span className="text-gray-400">I'm a </span>software engineer,
          <br />
          <span className="text-gray-400">more of a </span>
          gamer<span className="text-gray-400">, and</span>
          <br />
          fall savorer<span className="text-gray-400">.</span>
          <br />{' '}
        </p>
        <p className="text-lg m-0 mt-12">
          I currently working at{' '}
          <a href="https://www.hiorka.com/" target="_blank">
            Orka
          </a>
          , aiming to make hearing aids more accessible.
        </p>
        <p className="text-lg m-0 mt-6">
          I'm passionate about exploring and crafting elegant, creative
          softwares. I love sharing them with others and exchanging experiences,
          to bring efficiency, inspiration, and simple joy to those around me.
          <br />
          Recently, I'm recommending{' '}
          <a href="https://www.cursor.com" target="_blank">
            Cursor
          </a>{' '}
          for code composing, and{' '}
          <a href="https://claude.ai/new" target="_blank">
            Claude
          </a>{' '}
          for sparking creativity.
        </p>
        <p className="text-lg m-0 mt-6">
          Besides, I'm an avid single-player gamer who enjoys challenging action
          games like{' '}
          <a href="https://store.steampowered.com/app/814380" target="_blank">
            Sekiro: Shadows Die Twice
          </a>{' '}
          and{' '}
          <a href="https://store.steampowered.com/app/2138710" target="_blank">
            Sifu
          </a>
          , along with indie gems such as{' '}
          <a href="https://store.steampowered.com/app/813230" target="_blank">
            Animal Well
          </a>
          ,{' '}
          <a href="https://store.steampowered.com/app/460950" target="_blank">
            Katana Zero
          </a>
          , and{' '}
          <a href="https://store.steampowered.com/app/504230" target="_blank">
            Celeste
          </a>
          . Lately, I've been completely hooked on{' '}
          <a href="https://store.steampowered.com/app/418240" target="_blank">
            Shadow Tactics
          </a>
          .
        </p>
        <p className="text-lg m-0 mt-6">
          Fall is my favorite season, enveloping both mind and body in its
          peaceful, cozy embrace.
        </p>
      </div>
    </>
  )
}
