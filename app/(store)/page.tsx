import Banner from '@/components/Banner'
import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import React from 'react'

export default async function page() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div>
            <Banner />

            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-5">
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    )
}
