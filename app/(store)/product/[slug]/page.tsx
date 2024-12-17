import AddToBasketProduct from '@/components/AddToBasketProduct';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { TriangleAlert } from 'lucide-react';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export const metadata: Metadata = {
    title: ""
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    console.log(product)

    if (!product) return notFound()

    const isOutOfStock = product.stock != null && product.stock <= 0
    metadata.title = `Product Detail | ${product.name}`

    return (
        <div className="container mx-auto py-8 px-8 md:px-0">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
            <div className="flex flex-col md:flex-row gap-x-14 gap-y-10">
                {/* section untuk gambar produk */}
                <div className={`relative min-w-full md:min-w-[25rem] max-h-[25rem] h-[25rem] aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"}
                            fill className='object-contain h-[20rem] w-[20rem] transition-transform duration-300 hover:scale-105' />
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white font-bold text-lg">Out of stock</span>
                        </div>
                    )}
                </div>

                {/* section untuk deskripsi dan tambah keranjang */}
                <div className="flex flex-col min-h-[70vh] w-full">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">{product.price?.toFixed(2)}</div>
                        {(product?.stock ?? 0) > 10
                            ? <span className='text-[.9rem] text-gray-500'>Stok {product.stock}</span>
                            : <div className='text-[.8rem]'>
                                <span className='flex gap-2 mt-4 font-bold text-[--warna-red]'><TriangleAlert size={16} className='text-[--warna-red]' strokeWidth={1.5} /> Stok tersisa {product.stock}!</span>
                                <span>Checkout sekarang sebelum kehabisan</span>
                            </div>
                        }
                        <AddToBasketProduct product={product} disabled={isOutOfStock} />
                    </div>
                    <Separator className='my-4' />

                    <Tabs defaultValue="description" className="">
                        <TabsList className="bg-white border-b-[2px] pb-5 rounded-none">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="rules">Rules</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description">
                            <div className="flex flex-col text-[.9rem] text-gray-400">
                                <span>Kondisi Bekas</span>
                                <span>Category Shorts</span>
                            </div>
                            <div className="prose max-w-none mb-6 p-2">
                                {/* <h1 className="font-urbanist font-bold">Description</h1> */}
                                {Array.isArray(product.description) && (
                                    <PortableText value={product.description} />
                                )}
                            </div>
                            <Separator className='my-4' />
                            <div className="flex">
                                <span>Ada masalah dengan produk ini?</span>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
