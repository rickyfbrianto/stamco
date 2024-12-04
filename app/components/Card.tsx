import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Card({ product }: { product: any }) {
    return (
        <Link href={`/product/${product.slug.current}`}>
            <div key={product._id} className="flex flex-col bg-white drop-shadow-md rounded-lg overflow-hidden">
                {/* <Image
                    src={urlFor(product.images && product.images[0]).url()}
                    alt={product.slug}
                    width={220} height={220} className='object-cover mx-auto'
                /> */}
                <div className="flex flex-1 flex-col px-4 py-5 bg-slate-50 font-urbanist text-center">
                    <h1 className='text-2xl font-bold'>{product.name}</h1>
                    <span className='text-[1rem] text-gray-600'>${product.price}</span>
                </div>
            </div>
        </Link>
    )
}
