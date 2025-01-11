import ProductGrid from '@/components/ProductGrid'
import ProductsView from '@/components/ProductsView'
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName'
import React from 'react'

async function page({ searchParams }: { searchParams: Promise<{ query: string }> }) {
    const { query } = await searchParams
    const products = await searchProductsByName(query)

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            {!products.length ? <NoFound query={query} />
                : (
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            {query}
                        </h1>
                        {/* <ProductGrid products={products} /> */}
                        <ProductsView products={products} />
                    </div>
                )}
        </div>
    )
}

const NoFound = ({ query }: { query: string }) => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
            No Product found for {query}
        </h1>
        <p className="text-gray-500 text-center">
            Try searching with different keywords
        </p>
    </div>
)

export default page