import Banner from '@/components/Banner'
import BannerHome from '@/components/BannerHome'
import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllFeaturedProducts } from '@/sanity/lib/products/getAllFeaturedProducts'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import Image from 'next/image'
import React from 'react'
import Img1 from '@/public/pic1.jpg'
import Img2 from '@/public/pic2.jpg'
import Img3 from '@/public/pic3.jpg'
import Img4 from '@/public/pic4.jpg'
import ImageSlider from '@/components/ImageSlider'
import { Separator } from '@/components/ui/separator'
import { Truck } from 'lucide-react'
import { FaUserAstronaut } from "react-icons/fa";
import { FaFreeCodeCamp } from 'react-icons/fa'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { Category } from '@/sanity.types'
import { searchProductsByFilter } from '@/sanity/lib/products/searchProductsByFilter'

export default async function page() {
    const featured_product = await searchProductsByFilter({ featured: true })
    const categories = await getAllCategories()
    const ImagesList = [Img1, Img2, Img3, Img4]

    return (
        <div className='flex flex-col pb-20'>
            <div className="relative">
                <ImageSlider images={ImagesList} />
                <div className="hidden sm:flex absolute items-center left-[50%] translate-x-[-50%] bottom-[-3.5rem] h-[7rem] bg-gradient-to-b from-white to-slate-200 px-10 py-2 rounded-lg gap-x-10 font-urbanist">
                    <div className="flex flex-col items-center text-gray-500 gap-1">
                        <span>24 jam</span>
                        <Truck size={16} />
                    </div>
                    <Separator orientation='vertical' className='bg-slate-400 h-[70%]' />
                    <div className="flex flex-col items-center text-gray-500 gap-1">
                        <span>Cheapest Price</span>
                        <FaFreeCodeCamp />
                    </div>
                    <Separator orientation='vertical' className='bg-slate-400 h-[70%]' />
                    <div className="flex flex-col items-center text-gray-500 gap-1">
                        <span>Good Looking Admin</span>
                        <FaUserAstronaut />
                    </div>
                </div>
            </div>

            <div className="container flex flex-col sm:flex-row flex-wrap mx-auto mt-10 sm:mt-20 font-urbanist gap-5 rounded-lg sm:h-[24rem] px-4">
                <div className="flex flex-col flex-1 gap-4">
                    <span className='text-xl font-bold'>Promo</span>
                    <div className="relative flex-1">
                        <Banner />
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <span className='text-xl font-bold'>Kategori Pilihan</span>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.slice(0, 4).map((cat: Category) => (
                            <Link key={cat._id} className="flex flex-col bg-white rounded-lg" href={`/product?category=${cat._id}`}>
                                <div className="relative w-full h-[8rem] sm:h-full p-2">
                                    {cat.image && <Image src={urlFor(cat.image).url()} fill className="object-contain transition-transform duration-250 hover:scale-125 hover:rotate-[20deg] bg-transparent" alt={cat.title || 'Product Image'} />}
                                </div>
                                <span className='m-2 text-center text-sm text-gray-500 font-bold'>{cat.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-14 font-urbanist px-4">
                <ProductsView title='Featured Products' length={5} products={featured_product} display='line' />
            </div>
        </div>
    )
}
