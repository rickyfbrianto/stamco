import { Category, Product } from '@/sanity.types'
import React from 'react'
import ProductGrid from './ProductGrid'
import { CategorySelector } from './ui/CategorySelector'

interface ProductsViewProps {
    products: Product[],
    categories: Category[]
}

function ProductsView({ products, categories }: ProductsViewProps) {
    return (
        <div className='flex flex-col'>
            {/* categories */}
            <div className='w-full sm:w-[200px]'>
                <CategorySelector categories={categories} />
            </div>

            {/* Products */}
            <div className='flex-1'>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default ProductsView