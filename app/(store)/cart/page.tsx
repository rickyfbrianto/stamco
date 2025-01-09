'use client'

import AddToBasketCart from '@/components/AddToBasketCart'
import CheckoutButton from '@/components/CheckoutButton'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { urlFor } from '@/sanity/lib/image'
import { useBasketStore } from '@/store/store'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { MoveLeft, ShoppingCart, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'

interface ItemsProps {
    items: {
        check: boolean;
        id: string;
        qty: number;
        harga: number;
    }[];
    itemAll: number;
    hargaAll: number;
    checkAll: boolean;
}

function CartPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems())
    const totalPrice = useBasketStore((state) => state.getTotalPrice())
    const { isSignedIn, userId } = useAuth()

    const [isClient, setIsClient] = useState(false)

    const form = useForm<ItemsProps>({
        defaultValues: {
            items: [{ check: false, id: "", qty: 0, harga: 0 }],
            itemAll: 0, hargaAll: 0, checkAll: false,
        },
    })
    const formArray = useFieldArray({
        control: form.control, name: "items",
    })
    const itemWatch = form.watch("items")
    const itemAllWatch = form.watch("itemAll")
    const hargaAllWatch = form.watch("hargaAll")

    useEffect(() => {
        document.title = "Cart"
        setIsClient(true)
    }, [])

    useEffect(() => {
        const tempItems = groupedItems.map((item, index) => ({
            check: form.getValues(`items.${index}.check`),
            id: item.product._id,
            qty: item.quantity,
            harga: item.product?.price ?? 0,
        }))
        form.reset({ ...form.getValues(), items: tempItems })
    }, [JSON.stringify(groupedItems)])

    useEffect(() => {
        let itemCheck = 0
        let qtyCheck = 0
        let harga = 0
        itemWatch.map((item, index) => {
            if (item.check) {
                const selected = groupedItems.find((group) => group.product._id === item.id)
                harga += (selected?.product?.price ?? 0) * (selected?.quantity ?? 0)
                qtyCheck += selected?.quantity ?? 0
                itemCheck++
            }
        })
        form.setValue("hargaAll", harga)
        form.setValue("itemAll", qtyCheck)
        form.setValue("checkAll", itemCheck === groupedItems.length)
    }, [JSON.stringify(itemWatch)])

    if (!isClient) return <Loader />

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your cart</h1>
                <p className="text-gray-600 text-lg">Your basket is empty</p>
            </div>
        )
    }

    const handleCheckAll = (event: boolean) => {
        form.setValue("checkAll", event)
        itemWatch.map((item, index) => form.setValue(`items.${index}.check`, event))
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
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 min-h-[50vh]">
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    <div className="flex flex-col gap-y-4 flex-grow font-urbanist">
                        <Controller name='checkAll' control={form.control} render={({ field: { value } }) => (
                            <div className="flex items-center rounded-t-3xl h-14 bg-[--warna-primary] overflow-hidden">
                                <div className="flex min-w-[5rem] justify-center items-center">
                                    <Checkbox id='checkAll' checked={value} onCheckedChange={(value) => handleCheckAll(value as boolean)} />
                                </div>
                                <label htmlFor="checkAll" className="py-4 font-bold">Select All</label>
                            </div>
                        )} />
                        {/* List item */}
                        {groupedItems.map((item, index) => (
                            <div key={item.product._id} className='border flex flex-col overflow-hidden'>
                                <div key={item.product._id} className='flex flex-col-reverse xxs:flex-row'>
                                    <Controller name={`items.${index}.check`} control={form.control} render={({ field: { value, onChange } }) => (
                                        <div className="flex min-w-[3rem] min-h-[2rem] justify-center items-center bg-slate-50">
                                            <Checkbox checked={value} onCheckedChange={(e) => onChange(e)} />
                                        </div>
                                    )} />
                                    <div className="flex-grow flex flex-col xs:flex-row xs:items-center justify-between transition-colors duration-500 p-2 pe-4 gap-x-4 gap-y-2">
                                        <Link className="flex flex-col xs:flex-row cursor-pointer flex-1 gap-2" href={`/product/${item.product.slug?.current}`}>
                                            <div className="flex justify-center w-auto h-auto sm:w-24 sm:h-24 flex-shrink-0">
                                                {item.product.image && (
                                                    <Image src={urlFor(item.product.image).url()}
                                                        alt={item.product.name ?? "Product image"}
                                                        className='object-cover rounded select-none'
                                                        width={100} height={100} />
                                                )}
                                            </div>
                                            <div className="flex flex-col items-center xs:items-start min-w-[4rem]">
                                                <h2 className="text-center xs:text-start text-lg sm:text-xl font-semibold line-clamp-2">{item.product.name}</h2>
                                                <p className="text-sm sm:text-base">${(item.product.price ?? 0)}</p>
                                                <div className="flex gap-2 px-2 py-1 border-b-[2px] border-blue-100">
                                                    <span className='text-[.8rem] font-extrabold'>Sub Total</span>
                                                    <p className="text-sm sm:text-base">${((item.product.price ?? 0) * item.quantity)}</p>
                                                </div>
                                            </div>
                                        </Link>

                                        <AddToBasketCart product={item.product} />
                                    </div>
                                </div>
                                <div className="hidden xs:flex px-4 py-2 gap-4 bg-gradient-to-r from-slate-100 to-white">
                                    <Truck size={20} color="#2d4e3d" strokeWidth={1.5} />
                                    <span className='text-[.9rem] italic'>Get your best price by checkout now!</span>
                                </div>
                            </div>
                        ))}
                        <Button className='self-start mt-2' variant={'outline'} asChild>
                            <Link href={`/product`}><MoveLeft /> Continue Shopping</Link>
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:w-[25rem] lg:sticky lg:top-[--tinggi11] h-fit bg-white p-6 border rounded-lg order-first lg:order-last fixed bottom-0 left-0">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex flex-wrap justify-between">
                            <span>Items</span>
                            <span>{itemAllWatch}</span>
                        </p>
                        <hr />
                        <p className="flex flex-wrap justify-between text-2xl font-bold">
                            <span>Total:</span>
                            <span>${hargaAllWatch}</span>
                        </p>
                    </div>

                    {isSignedIn ? (
                        <CheckoutButton disabled={itemWatch.some(item => item.check)} />
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