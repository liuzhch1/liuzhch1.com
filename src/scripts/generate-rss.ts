import fs from 'fs'
import path from 'path'
import { generateRssFeed } from '../utils/feed'

async function main() {
  const publicDir = path.join(process.cwd(), 'public')

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir)
  }

  const rss = await generateRssFeed()
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss)
}

main().catch(console.error)
