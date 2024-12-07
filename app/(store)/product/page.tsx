import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import React from 'react'

async function page() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div className="flex flex-col container">
            <span>Product</span>
            <div className="flex flex-col items-center justify-top h-screen mt-4">
                <ProductsView products={products} categories={categories} />
            </div>
        </div>
    )
}

export default page