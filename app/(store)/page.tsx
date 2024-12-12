import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function page() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div className=''>
            <div className="flex h-[60vh] bg-gradient-to-tr from-slate-400 to-teal-500 mb-10">
                {/* <Image src={}/> */}
            </div>
            <div className="container mx-auto">
                <Banner />

                <div className="flex flex-col items-center justify-top h-screen mt-4">
                    <ProductsView products={products} categories={categories} />
                </div>
            </div>
        </div>
    )
}
