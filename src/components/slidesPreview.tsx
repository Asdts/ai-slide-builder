'use client'

import { useEffect, useState } from 'react'
import { renderMarpMarkdown } from '@/slides/libs/marpRenderer'

export default function SlidePreview({ markdown, selectedTheme }: {
  markdown: string
  selectedTheme: string
}) {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')

  useEffect(() => {
    async function fetchThemeAndRender() {
      const res = await fetch(`/slides/theme/${selectedTheme}.css`)
      const themeCSS = await res.text()
      const { html, css } = renderMarpMarkdown(markdown, themeCSS)
      setHtml(html)
      setCss(css)
    }
    fetchThemeAndRender()
  }, [markdown, selectedTheme])

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-96 overflow-y-auto border border-gray-300 rounded-lg shadow-md">
      <input type="file" accept=".css" onChange={(e) => {
                    if (!e?.target.files?.length) return
                    const reader = new FileReader()
                    reader.onload = () => {
                        const css = reader.result as string
                        const { html, css: renderedCSS } = renderMarpMarkdown(markdown, css)
                        setHtml(html)
                        setCss(renderedCSS)
                    }
                    reader.readAsText(e.target.files[0])
        }} />
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <style>{css}</style>
    </div>
  )
}
