import AddToBasketProduct from '@/components/AddToBasketProduct';
import { Separator } from '@/components/ui/separator';
import { urlFor } from '@/sanity/lib/image';
import { TriangleAlert, Truck } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { Category, Product } from '@/sanity.types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    return {
        title: `${product?.name}`,
        description: `Product ${product?.name}`,
    };
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)
    const { seller } = product || {}

    if (!product) return notFound()

    const isOutOfStock = product.stock != null && product.stock <= 0

    return (
        <div className='bg-white'>
            <div className="container mx-auto py-8 px-8 md:px-0">
                <div className="flex flex-col md:flex-row gap-x-8 gap-y-10">
                    {/* section untuk gambar produk */}
                    <div className={`relative min-w-full md:min-w-[20rem] h-[20rem] max-h-[20rem] aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}
                    lg:sticky lg:top-[--tinggi11] lg:left-0 border`}>
                        {product.image && (
                            // <Image priority src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"} width={300} height={300}
                            //     className='object-contain transition-transform duration-300 hover:scale-105' />
                            <Image src={urlFor(product.image).url()} alt={product?.name ?? "Product Image"} fill priority quality={100} sizes='100%'
                                className='object-contain transition-transform duration-300 hover:scale-105' />
                        )}
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <span className="text-white font-bold text-lg">Out of stock</span>
                            </div>
                        )}
                    </div>
                    {/* section untuk deskripsi dan tambah keranjang */}
                    <div className="flex flex-col min-h-[70vh] gap-4 w-full">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                            <p className="text-xl font-semibold mb-4">{product.price?.toLocaleString('id-ID')}</p>
                            {(product?.stock ?? 0) > 10
                                ? (product?.stock ?? 0) <= 50 && <p className='text-[.9rem] text-gray-500'>Stok {product.stock}</p>
                                : <div className='text-[.8rem] mb-4'>
                                    <span className='flex gap-2  font-bold text-[--warna-red]'><TriangleAlert size={16} className='text-[--warna-red]' strokeWidth={1.5} /> Stok tersisa {product.stock}!</span>
                                    <span>Checkout sekarang sebelum kehabisan</span>
                                </div>
                            }
                            <Separator className='my-4' />
                            <div className="flex gap-x-2">
                                <Image src={urlFor(seller?.image as any).url()} width={50} height={50} alt='Seller Image' className='rounded-full p-[2px] bg-slate-500 min-w-[50px] min-h-[50px]' />
                                <div className="flex flex-col justify-center">
                                    <Link href={`/seller/${seller?.name}`}>
                                        <p className='font-bold text-[1rem]'>{seller?.name}</p>
                                    </Link>
                                    <p className='text-[.9rem] text-gray-500'>{seller.country}</p>
                                </div>
                            </div>
                        </div>
                        {/* <Separator /> */}

                        <div className="flex flex-col gap-2 border rounded-lg self-start p-4 font-urbanist">
                            <span className='text-lg text-gray-800 font-extrabold'>Shipped</span>
                            <div className="flex gap-x-2 items-center">
                                <Truck size={16} />
                                <span className='text-sm text-gray-500'>Shipped from <span className='font-bold'>{seller.city}</span></span>
                            </div>
                        </div>
                        <Separator />

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
                                            {product.categories?.map((value: Category) => (
                                                <Link href={`/product?category=${value._id}`} key={value._id}>
                                                    <Badge variant="secondary">{value.title}</Badge>
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

                    <AddToBasketProduct product={product as unknown as Product} disabled={isOutOfStock} />
                </div>
            </div>
        </div>
    )
}
