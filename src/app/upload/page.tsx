/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderMarpMarkdown } from "@/slides/libs/marpRenderer"

export default function UploadPage() {

    function setHtml(html: string) {
        throw new Error("Function not implemented.")
    }

    function setCss(renderedCSS: string) {
        throw new Error("Function not implemented.")
    }
    const markdown = `# Hello World
---`
    return (
        <div>
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
        </div>
    )
    }
