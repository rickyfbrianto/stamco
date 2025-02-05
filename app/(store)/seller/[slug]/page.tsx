import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { urlFor } from '@/sanity/lib/image'
import { GetSellerByName } from '@/sanity/lib/products/getSellerByName'
import { Diff, Star } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import 'react-tabs/style/react-tabs.css';
import TabSeller from './tab'
import { Seller } from '@/sanity.types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const seller = await GetSellerByName(slug)

    return {
        title: `Seller | ${seller?.name}`,
        description: `Seller ${seller?.name}`,
    };
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const seller = await GetSellerByName(slug)

    if (!seller) return notFound()

    return (
        <div className="container mx-auto p-4 min-h-[60vh]">
            <div className="flex flex-col gap-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center border rounded-xl overflow-hidden bg-white gap-4 p-4">
                    <div className="flex flex-col sm:flex-row w-full gap-x-5">
                        {seller.image && <Image className='w-[150px] h-[150px] rounded-2xl' height={150} width={150} src={urlFor(seller.image).url()} alt='Seller Image' />}
                        <div className="flex min-h-max w-full flex-wrap justify-between items-center md:flex-col md:justify-start md:items-start gap-2">
                            <div className="flex flex-col">
                                <h2 className="text-[1.5rem] font-bold">{seller.name}</h2>
                                <p className="font-bold">{seller.country}</p>
                                <Badge variant={'info'} className='self-start'>Verified Seller</Badge>
                            </div>
                            <Separator orientation='vertical' className='hidden sm:flex h-[75%] md:hidden' />
                            <Separator orientation='horizontal' className='hidden md:flex' />
                            <div className="flex flex-col md:flex-row gap-2">
                                <Button variant={'success'}>Follow</Button>
                                <Button variant={'outline'}>Chat Seller</Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap sm:flex-nowrap sm:flex-row justify-center items-center lg:justify-start border rounded-lg p-2 py-4 px-6 gap-x-6 gap-y-2 h-auto sm:h-[75px] font-urbanist min-w-max">
                        {/* max-w-[100px] text-nowrap text-ellipsis overflow-hidden */}
                        <div className="flex flex-col text-nowrap">
                            <div className="flex items-center gap-x-1">
                                <Star size={16} color="#eed52f" />
                                <span className='font-bold'> 4.8</span>
                            </div>
                            <span className='text-gray-500 text-[.9rem]'>Review</span>
                        </div>
                        <Separator orientation='vertical' className='hidden sm:block h-full' />
                        <div className="flex flex-col text-nowrap">
                            <div className="flex items-center gap-x-1">
                                <Diff size={16} />
                                <span className='font-bold'>4 Menit</span>
                            </div>
                            <span className='text-gray-500 text-[.9rem]'>Order Process</span>
                        </div>
                        <Separator orientation='vertical' className='hidden sm:block h-full' />
                        <div className="flex flex-col text-nowrap">
                            <span className='font-bold text-center'>08.00 - 12.00</span>
                            <span className='text-gray-500 text-[.9rem]'>Operational Hours</span>
                        </div>
                    </div>
                </div>

                <TabSeller seller={seller as unknown as Seller} />
            </div>
        </div>
    )
}

export default page