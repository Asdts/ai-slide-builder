// /src/components/slidesPreview.tsx
// created by ASDTS
'use client'

import { useEffect, useState } from 'react'
import { renderMarpMarkdown } from '@/slides/libs/marpRenderer'
import { extractMarkdown } from '@/slides/libs/extractMarkdownContent'

export default function SlidePreview({ markdown, selectedTheme }: {
  markdown: string
  selectedTheme: string
}) {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')

  useEffect(() => {
    async function fetchThemeAndRender() {
      const res = await fetch(`/slide/theme/${selectedTheme}.css`)
      console.log(res)
      const themeCSS = await res.text()
      const { html, css } = renderMarpMarkdown(markdown as string, themeCSS)
      setHtml(html)
      setCss(css)
    }
    fetchThemeAndRender()
  }, [markdown, selectedTheme])

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md">
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <style>{css}</style>
    </div>
  )
}
