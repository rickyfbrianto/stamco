'use client'

import AddToBasketButton from '@/components/AddToBasketButton'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { urlFor } from '@/sanity/lib/image'
import { useBasketStore } from '@/store/store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { MoveLeft, ShoppingCart, Truck } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function CartPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems())
    const totalPrice = useBasketStore((state) => state.getTotalPrice())
    const { isSignedIn } = useAuth()

    const [isClient, setIsClient] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return <Loader />

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
                <p className="text-gray-600 text-lg">Your basket is empty</p>
            </div>
        )
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return
        setIsLoading(true)

        try {
            // const metadata: Metadata = {
            //     orderNumber: crypto.randomUUID(),
            //     customerName: user?.fullName ?? "Unknown",
            //     customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
            //     clerkUserId: user!.id
            // }

            // const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
            // if (checkoutUrl) {
            //     window.location.href = checkoutUrl
            // }
        } catch (error) {
            console.log("Error checkout : ", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center">
                <div className="container h-[--tinggi6] flex flex-col justify-center xs:flex-row xs:justify-between items-center mx-auto gap-4 border-b-[1px] px-4 ">
                    <div className="flex items-center gap-x-2">
                        <ShoppingCart size={20} color="#2d4e3d" strokeWidth={1.5} />
                        <h1 className="text-[1.2rem] font-bold">Your Cart</h1>
                    </div>
                    <span className='font-bold'>{groupedItems.length} Product{groupedItems.length > 1 && "s"}</span>
                </div>
            </div>
            <div className="container mx-auto py-4 flex flex-col lg:flex-row gap-4 min-h-[50vh] px-4">
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    <div className="flex-grow">
                        {groupedItems.map((item) => (
                            <div key={item.product._id} className='mb-4 border rounded-md flex flex-col font-urbanist overflow-hidden'>
                                <div className="flex flex-col xs:flex-row xs:items-center justify-between transition-colors duration-500 p-4 gap-y-4">
                                    <Link className="flex cursor-pointer flex-1 min-w-0" href={`/product/${item.product.slug?.current}`}>
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                                            {item.product.image && (
                                                <Image src={urlFor(item.product.image).url()}
                                                    alt={item.product.name ?? "Product image"}
                                                    className='w-full h-full object-cover rounded'
                                                    width={96} height={96} />
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h2 className="text-lg sm:text-xl font-semibold truncate">{item.product.name}</h2>
                                            <p className="text-sm sm:text-base">${(item.product.price ?? 0)}</p>
                                            <div className="flex gap-2 px-2 py-1 border-b-[2px] border-blue-100 self-start">
                                                <span className='text-[.8rem] font-extrabold'>Total</span>
                                                <p className="text-sm sm:text-base">${((item.product.price ?? 0) * item.quantity)}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <AddToBasketButton product={item.product} />
                                </div>
                                {/* <div className="hidden xs:flex px-4 py-2 gap-4 border-t">
                                    <Truck size={20} color="#2d4e3d" strokeWidth={1.5} />
                                    <span className='text-[1rem]'>Gratis Ongkir sepuasnya, silahkan nego dengan marketing kami</span>
                                </div> */}
                            </div>
                        ))}
                        <Button className='self-start' variant={'outline'} asChild>
                            <Link href={`/product`}><MoveLeft /> Continue Shopping</Link>
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-[25rem] lg:sticky lg:top-[--tinggi11] h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items</span>
                            <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
                        </p>
                        <hr />
                        <p className="flex justify-between text-2xl font-bold">
                            <span>Total:</span>
                            <span>${totalPrice}</span>
                        </p>
                    </div>

                    {isSignedIn ? (
                        <button onClick={handleCheckout} disabled={isLoading} className='mt-4 w-full bg-[--warna-green] text-white px-4 py-2 rounded hover:bg-[--warna-green] disabled:bg-gray-400'>
                            {isLoading ? "Processing" : "Checkout"}
                        </button>
                    ) : (
                        <SignInButton mode='modal'>
                            <button className='mt-4 w-full bg-[--warna-green] text-white px-4 py-2 rounded hover:bg-[--warna-green]/[0.9]'>
                                Sign in to Checkout
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartPage