'use client'

import { Product } from '@/sanity.types';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useBasketStore } from '@/store/store';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { Clerk } from "@clerk/clerk-js";

interface AddToBasketProps {
    product: Product;
    disabled?: boolean;
}

const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string)

function AddToBasketProduct({ product, disabled }: AddToBasketProps) {
    const { addItem } = useBasketStore()
    const [isClient, setIsClient] = useState(false)
    const { userId } = useAuth()
    const minQty = 1
    const maxQty = product.stock
    const form = useForm({
        defaultValues: { quantity: minQty }
    })
    const watchQty = form.watch("quantity")

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const handleAddToCart = async (product: Product) => {
        if (userId) {
            addItem(product, userId as string, watchQty)
            toast.success("Product added to cart")
        } else {
            await clerk.load()
            clerk.openSignIn()
        }
    }

    return (
        <Controller name='quantity' control={form.control} render={({ field: { value, onChange } }) => (
            // <div className="flex flex-col w-[200px] gap-2 mt-2 ">
            // fixed flex flex-row justify-center items-center bottom-0 left-0 p-4 border-t-[2px]
            <div className="gap-2 mt-2 w-full bg-white
            fixed flex flex-col justify-center items-center bottom-0 left-0 p-2 border-t-[2px]
            lg:flex-col lg:items-start lg:self-start lg:sticky lg:top-[--tinggi11] lg:right-0 lg:p-3 lg:border lg:min-w-[15rem] lg:w-[15rem] lg:rounded-lg lg:mt-0">
                <span className='hidden lg:block self-start font-bold'>Checkout</span>
                <div className="flex self-center items-center gap-x-2 font-urbanist">
                    <button disabled={value === minQty || disabled} onClick={() => onChange(Number(value) - 1)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 text-white
                    ${value == minQty ? "bg-red-200 cursor-not-allowed" : "bg-red-500 hover:bg-red-400"}`}>
                        <span className={`text-md font-bold `}>-</span>
                    </button>
                    <Input type='number' min={minQty} max={maxQty} value={value} className='text-center w-auto' onChange={e => onChange(e.target.value)} />
                    <button disabled={value === maxQty || disabled} onClick={() => onChange(Number(value) + 1)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 text-white
                    ${(value == maxQty) || disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[--warna-green] hover:bg-[--warna-green]"}`}>
                        <span className={`text-md font-bold`}>+</span>
                    </button>
                </div>
                <div className="flex items-center lg:w-full lg:justify-between text-gray-500 gap-x-1">
                    <span className='text-[.9rem] font-urbanist'>Sub total</span>
                    <span className='text-[1rem] font-urbanist'>${((product.price ?? 0) * value)}</span>
                </div>
                <div className="flex flex-row w-auto lg:flex-col lg:w-full gap-2">
                    <Button variant={'green'} onClick={() => handleAddToCart(product)} className='w-full'>Add to Cart</Button>
                    <Button variant={'outline'} onClick={() => handleAddToCart(product)} className='w-full'>Buy Now !</Button>
                </div>
            </div>
        )} />
    )
}

export default AddToBasketProduct