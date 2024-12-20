import { getSellerByName } from '@/sanity/lib/products/getSellerByName'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: ""
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const seller = await getSellerByName(slug)

    if (!seller) return notFound()

    return (
        <div className="container mx-auto py-8 px-8 md:px-0">
            <div className="flex flex-col md:flex-row gap-x-8 gap-y-10">
                <div>page</div>

            </div>
        </div>
    )
}

export default page