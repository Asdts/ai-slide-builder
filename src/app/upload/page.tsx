import SlidePreview from "@/components/slidesPreview"
export default function UploadPage() {
    const markdown = `# Hello World
## This is a test slide
\`\`\`js
console.log("Hello, world!");
- Item 1
- Item 2
- Item 3
\`\`\`
`
    return (
        <SlidePreview markdown={markdown} selectedTheme="beam"/>
    )
}
