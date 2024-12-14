import Banner from '@/components/Banner'
import BannerHome from '@/components/BannerHome'
import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import Image from 'next/image'
import React from 'react'

export default async function page() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div className='flex flex-col'>
            {/* <BannerHome /> */}
            <Image className="object-cover w-full h-screen" sizes='100vw 50vh' width={0} height={0} src={"/pic1.jpg"} alt='Gambar' />

            <div className="container mx-auto">
                {/* <Banner /> */}

                <span>tes</span>

                <div className="flex flex-col items-center justify-top h-screen mt-4">
                    <ProductsView products={products} categories={categories} />
                </div>
            </div>
        </div>
    )
}
