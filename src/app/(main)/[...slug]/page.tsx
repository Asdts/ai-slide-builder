export default function Page({ params }: { params: { slug: string[] } }) {
    return (
        <div>
        <h1>Dynamic Route</h1>
        <p>Slug: {params.slug.join('/')}</p>
        </div>
    );
    }