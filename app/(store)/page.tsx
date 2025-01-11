import Banner from '@/components/Banner'
import BannerHome from '@/components/BannerHome'
import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllFeaturedProducts } from '@/sanity/lib/products/getAllFeaturedProducts'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import Image from 'next/image'
import React from 'react'

export default async function page() {
    const products = await getAllProducts()
    const featured_product = await getAllFeaturedProducts()

    return (
        <div className='flex flex-col'>
            {/* <BannerHome /> */}
            <Image className="object-cover w-full h-[60vh]" sizes='100vw' width={0} height={0} src={"/pic1.jpg"} alt='Gambar' />

            <div className="container mx-auto">
                {/* <Banner /> */}

                <div className="flex flex-col items-center justify-top h-screen mt-4">
                    <ProductsView products={products} />
                </div>
            </div>
        </div>
    )
}
