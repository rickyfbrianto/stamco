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
import { FaFreeCodeCamp } from 'react-icons/fa'

export default async function page() {
    const products = await getAllProducts()
    const featured_product = await getAllFeaturedProducts()
    const categories = await getAllCategories()
    const ImagesList = [Img1, Img2, Img3, Img4]

    return (
        <div className='flex flex-col relative'>
            {/* <BannerHome /> */}
            <div className="relative">
                <ImageSlider images={ImagesList} />
                <div className="flex absolute items-center left-[50%] translate-x-[-50%] bottom-[-3rem] h-[6rem] bg-slate-200 px-10 py-2 rounded-lg gap-x-10 font-urbanist">
                    <div className="flex flex-col text-gray-500 items-center gap-1">
                        <span>24 jam</span>
                        <Truck size={16} />
                    </div>
                    <Separator orientation='vertical' className='bg-slate-400 h-[70%]' />
                    <div className="flex flex-col text-gray-500">
                        <span>24 jam</span>
                        <FaFreeCodeCamp />
                    </div>
                    <Separator orientation='vertical' className='bg-slate-400 h-[70%]' />
                    <div className="flex flex-col text-gray-500">
                        <span>24 jam</span>
                    </div>
                </div>
            </div>

            <div className="container flex flex-col mx-auto mt-14 pt-5 font-urbanist">
                <div className="flex mb-4">
                    <span className='text-xl '>Our Category</span>
                </div>
                <div className="grid grid-cols-12 grid-rows-8 gap-4 items-stretch h-full">
                    <div className="relative flex border col-start-1 col-end-7 row-start-1 row-end-9">
                        <div className="flex h-full">
                            <Image src={Img1} className='rounded-lg' alt="Category" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        </div>
                        <span className='absolute left-[50%] translate-x-[-50%] bottom-[20px] p-2 bg-white rounded-lg'>Sepatu</span>
                    </div>
                    <div className="flex border col-start-7 col-end-10 row-start-1 row-end-5 p-4 bg-gray-300 rounded-lg">da</div>
                    <div className="flex border col-start-10 col-end-13 row-start-1 row-end-5 p-4 bg-gray-300 rounded-lg">da</div>
                    <div className="flex border col-start-7 col-end-9 row-start-5 row-end-9 p-4 bg-gray-300 rounded-lg">ea</div>
                    <div className="flex border col-start-9 col-end-11 row-start-5 row-end-9 p-4 bg-gray-300 rounded-lg">ea</div>
                    <div className="flex border col-start-11 col-end-13 row-start-5 row-end-9 p-4 bg-gray-300 rounded-lg">ea</div>
                </div>
            </div>

            <div className="container flex flex-wrap justify-between mx-auto mt-14 font-urbanist p-4 gap-4 bg-white rounded-lg">
                <div className="flex flex-col flex-1 gap-4 items-stretch h-full">
                    <div className="">
                        <span className='text-xl '>Top Up</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-1 border p-4 bg-gray-300 rounded-lg">da</div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4 items-stretch h-full">
                    <div className="">
                        <span className='text-xl '>Kategori Pilihan</span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex flex-1 border p-4 bg-gray-300 rounded-lg">da</div>
                        <div className="flex flex-1 border p-4 bg-gray-300 rounded-lg">da</div>
                        <div className="flex flex-1 border p-4 bg-gray-300 rounded-lg">da</div>
                        <div className="flex flex-1 border p-4 bg-gray-300 rounded-lg">da</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-14 font-urbanist">
                <span className='text-xl'></span>
                <ProductsView title='Featured Products' showSortPrice={true} products={products} display='line' length={6} />
            </div>
        </div>
    )
}
