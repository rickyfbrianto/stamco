import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    metadata.title = "Categories " + slug.charAt(0).toUpperCase() + slug.slice(1)

    const products = await getProductsByCategory(slug)
    const categories = await getAllCategories()

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {slug.split("-").map((word) => word.at(0)?.toUpperCase() + word.slice(1)).join(" ")}{" "}
                    Collection
                </h1>
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    )
}

export default page