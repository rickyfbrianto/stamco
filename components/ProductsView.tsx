import { Category, Product } from '@/sanity.types'
import React from 'react'
import ProductGrid from './ProductGrid'
import { CategorySelector } from './ui/CategorySelector'

interface ProductsViewProps {
    className?: string;
    products: Product[];
    categories?: Category[] | undefined
}

function ProductsView({ className, products, categories }: ProductsViewProps) {
    return (
        <div className='flex flex-col'>
            {/* categories */}
            {categories && categories.length > 0 && (
                <div className='w-full sm:w-[200px]'>
                    <CategorySelector categories={categories} />
                </div>
            )}

            {/* Products */}
            <div className='flex-1'>
                <ProductGrid products={products} className={className} />
            </div>
        </div>
    )
}

export default ProductsView