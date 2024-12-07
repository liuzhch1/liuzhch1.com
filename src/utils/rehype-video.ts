import { visit } from 'unist-util-visit'

export function rehypeVideo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'img' &&
        node.properties?.src?.toLowerCase().endsWith('.mp4')
      ) {
        const src = node.properties.src
        // Transform to a <video> element with a <source> child
        node.tagName = 'video'
        node.properties = {
          id: 'player',
          playsinline: true,
          controls: false,
        }
        node.children = [
          {
            type: 'element',
            tagName: 'source',
            properties: {
              src,
              type: 'video/mp4',
            },
            children: [],
          },
        ]
        delete node.properties.src
        delete node.properties.alt
      }
    })
  }
}
