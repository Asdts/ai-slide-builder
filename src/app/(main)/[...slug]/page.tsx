export default function SlideDeckPage({ params }: { params: { slug: string } }) {
    // const { slug } = params
    // const slideDeck = await getSlideDeckBySlug(slug)
    // if (!slideDeck) {
    //     return <div>Slide deck not found</div>
    // }
    // const { html, css } = renderMarpMarkdown(slideDeck.content, slideDeck.theme)
    return (
        <div>
            <h1>Slide Deck Page</h1>
            {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        </div>
    )
}