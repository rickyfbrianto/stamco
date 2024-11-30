import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import React from 'react'
import Card from './Card';

export default async function Products() {
    const products = await client.fetch(groq`*[_type == "product"]`);

    return (
        <div className='bg-[#F8F8F8] w-full py-12 mt-[125px]'>
            <div className="container">
                <div className='py-4'>
                    <h1 className='text-3xl font-bold'>Best Selling Products</h1>
                    <h1>Enjoy Up To 50% </h1>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product: any, index: number) => (
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
