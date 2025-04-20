import { renderMarpMarkdown } from "@/slides/libs/marpRenderer"

export default function UploadPage() {

    return (
        <div>
            <input type="file" accept=".css" onChange={(e) => {
  const reader = new FileReader()
  reader.onload = () => {
    const css = reader.result as string
    const { html, css: renderedCSS } = renderMarpMarkdown(markdown, css)
    setHtml(html)
    setCss(renderedCSS)
  }
  reader.readAsText(e.target.files[0])
}} />

        </div>
    )
    }
