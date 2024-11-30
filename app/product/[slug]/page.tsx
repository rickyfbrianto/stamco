import ProductDetail from '@/app/components/ProductDetail';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';


export default async function page({
    params, searchParams
}: {
    params: Promise<{ slug: string }>, searchParams: Promise<{ q: string }>
}) {
    const { slug } = await params
    const product = await client.fetch(groq`*[_type == "product" && slug.current == '${slug}'][0]`);

    return (
        <ProductDetail product={product} />
    )
}
