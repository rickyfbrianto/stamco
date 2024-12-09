import AddToBasketButton from '@/components/AddToBasketButton';
import AddToBasketProduct from '@/components/AddToBasketProduct';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { TriangleAlert } from 'lucide-react';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: ""
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) return notFound()

    const isOutOfStock = product.stock != null && product.stock <= 0
    metadata.title = `Product Detail | ${product.name}`

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative w-[500px] h-[500px] aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"}
                            fill className='object-contain h-[10rem] w-[10rem] transition-transform duration-300 hover:scale-105' />
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Out of stock</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">{product.price?.toFixed(2)}</div>
                        {(product?.stock ?? 0) <= 10 &&
                            <span className='flex gap-2 mt-4 font-bold text-[--warna-red] text-[.8rem]'><TriangleAlert size={16} className='text-[--warna-red]' strokeWidth={1.5} /> Stok tersisa {product.stock}!</span>
                        }
                        <AddToBasketProduct product={product} disabled={isOutOfStock} />
                    </div>
                    <Separator className='my-4' />
                    <div className="">
                        {/* <AddToBasketButton product={product} disabled={isOutOfStock} /> */}
                        <div className="prose max-w-none mb-6">
                            <span className="font-urbanist font-bold">Description</span>
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
