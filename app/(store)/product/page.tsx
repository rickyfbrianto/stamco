import ProductsView from '@/components/ProductsView'
import SaveTes from '@/components/SaveTes'
import { Button } from '@/components/ui/button'
import { client } from '@/sanity/lib/client'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Product List"
}

async function page() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

    return (
        <div className="flex flex-col">
            <div className="container mx-auto flex flex-col items-center justify-top h-screen mt-4">
                <span>Product</span>
                <ProductsView products={products} categories={categories} />
            </div>
            <SaveTes />
        </div>
    )
}

export default page