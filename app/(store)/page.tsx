import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import React from 'react'


export default function page() {
    const products = getAllProducts()

    return (
        <div>Hello world</div>
    )
}
