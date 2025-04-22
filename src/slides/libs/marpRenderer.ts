// /src/slides/utils/marpRender.ts
// created by ASDTS
import { Marp } from '@marp-team/marp-core'
import MarkdownIt from 'markdown-it'

export function renderMarpMarkdown(markdown: string, themeCSS: string) {
  const marp = new Marp({
    markdown: new MarkdownIt(),
    html: true,
  })

  marp.themeSet.default = marp.themeSet.add(themeCSS)

  const { html, css } = marp.render(markdown)
  return { html, css }
}


