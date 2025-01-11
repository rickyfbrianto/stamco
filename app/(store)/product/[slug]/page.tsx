import AddToBasketProduct from '@/components/AddToBasketProduct';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import { TriangleAlert } from 'lucide-react';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import { Category, SanityImageAsset, SanityImageHotspot, Seller } from '@/sanity.types';
import Link from 'next/link';
import { GetProductBySlug } from '@/sanity/lib/products/GetProductBySlug';
import { dividerClasses } from '@mui/material';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await GetProductBySlug(slug)

    return {
        title: `${product?.name}`,
        description: `Product ${product?.name}`,
    };
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await GetProductBySlug(slug)
    const { seller }: { seller: Seller } = product || {}

    if (!product) return notFound()

    const isOutOfStock = product.stock != null && product.stock <= 0

    return (
        <div className='bg-white'>
            <div className="container mx-auto py-8 px-8 md:px-0">
                <div className="flex flex-col md:flex-row gap-x-8 gap-y-10">
                    {/* section untuk gambar produk */}
                    <div className={`relative min-w-full md:min-w-[20rem] h-[20rem] max-h-[20rem] aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}
                    lg:sticky lg:top-[--tinggi11] lg:left-0`}>
                        {product.image && (
                            // <Image priority src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"} width={300} height={300}
                            //     className='object-contain transition-transform duration-300 hover:scale-105' />
                            <Image src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"} fill priority quality={100} sizes='100%'
                                className='object-contain transition-transform duration-300 hover:scale-105' />
                            // <div className="relative">
                            // </div>
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
                            <p className="text-xl font-semibold mb-4">{product.price?.toFixed(2)}</p>
                            {(product?.stock ?? 0) > 10
                                ? (product?.stock ?? 0) <= 50 && <p className='text-[.9rem] text-gray-500'>Stok {product.stock}</p>
                                : <div className='text-[.8rem] mb-4'>
                                    <span className='flex gap-2  font-bold text-[--warna-red]'><TriangleAlert size={16} className='text-[--warna-red]' strokeWidth={1.5} /> Stok tersisa {product.stock}!</span>
                                    <span>Checkout sekarang sebelum kehabisan</span>
                                </div>
                            }
                            <Separator className='my-4' />
                            <div className="flex gap-x-2">
                                <Image src={urlFor(seller.image as any).url()} width={50} height={50} alt='Seller Image' className='rounded-full p-[2px] bg-slate-500 min-w-[50px] min-h-[50px]' />
                                <div className="flex flex-col justify-center">
                                    <Link href={`/seller/${seller.name}`}>
                                        <p className='font-bold text-[1rem]'>{seller.name}</p>
                                    </Link>
                                    <p className='text-[.9rem] text-gray-500'>Indonesia</p>
                                </div>
                            </div>
                        </div>
                        <Separator className='my-4' />

                        <Tabs defaultValue="description" className="">
                            <TabsList className="bg-white border-b-[2px] pb-5 rounded-none">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="rules">Rules</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description">
                                <div className="flex flex-col text-[.9rem] text-gray-400 gap-y-2">
                                    <div className="flex">
                                        <span className='w-[6em]'>Kondisi</span>
                                        <span className=''>Kondisi</span>
                                    </div>
                                    <div className="flex">
                                        <span className='w-[6em]'>Category</span>
                                        <div className="flex gap-x-2">
                                            {product.categories?.map((v: Category) => (
                                                <Link key={v._id} href={`/categories/${v.title}`}>
                                                    <Badge variant="secondary">{v.title}</Badge>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="prose max-w-none my-4 py-2">
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

                    <AddToBasketProduct product={product} disabled={isOutOfStock} />
                </div>
            </div>
        </div>
    )
}
