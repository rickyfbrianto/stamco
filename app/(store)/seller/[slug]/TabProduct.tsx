'use client'

import { Product } from '@/sanity.types'
import Link from 'next/link'
import React from 'react'

export default function TabProduct({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.slug?.current}`}
            className='flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden p-2'>
            {/* {product.image && (
                            <Image className='w-[100px]  transition-transform duration-300 '
                                src={urlFor(product.image).url()}
                                alt={product.name || "Product Image"}
                                fill />
                            )} */}
            {product.name}
        </Link>
    )
}
