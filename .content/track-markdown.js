const fs = require('fs')
const path = require('path')

const contentDir = path.join(process.cwd(), 'content')
const currentContents = fs.readdirSync(contentDir)

const publishNeeded = (filePath) => {
  return fs.readFileSync(filePath, 'utf8').includes('publish: true')
}

const updateNeeded = (content, source) => {
  return fs.readFileSync(content, 'utf8') !== fs.readFileSync(source, 'utf8')
}

function trackMarkdownFiles(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      trackMarkdownFiles(filePath)
      return
    }
    if (path.extname(file) !== '.md') {
      return
    }
    if (publishNeeded(filePath)) {
      if (!currentContents.includes(file)) {
        fs.writeFileSync(`${contentDir}/${file}`, fs.readFileSync(filePath))
        console.log(`\x1b[32mAdded    "${file}" to content\x1b[0m`)
      } else if (updateNeeded(filePath, `${contentDir}/${file}`)) {
        fs.writeFileSync(`${contentDir}/${file}`, fs.readFileSync(filePath))
        console.log(`\x1b[33mUpdated  "${file}" in content\x1b[0m`)
      }
    } else if (currentContents.includes(file)) {
      fs.rmSync(`${contentDir}/${file}`)
      console.log(`\x1b[31mRemoved  "${file}" from content\x1b[0m`)
    }
  })
}

trackMarkdownFiles('/Users/liuzhch1/Documents/JoeyDocs')
