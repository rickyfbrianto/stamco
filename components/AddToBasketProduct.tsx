'use client'

import { Product } from '@/sanity.types';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useBasketStore } from '@/store/store';
import { toast } from 'sonner';

interface AddToBasketProps {
    product: Product;
    disabled?: boolean;
}

function AddToBasketProduct({ product, disabled }: AddToBasketProps) {
    const { addItem } = useBasketStore()
    const [isClient, setIsClient] = useState(false)
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

    const handleAddToCart = (product: Product) => {
        addItem(product, watchQty)
        toast.success("Product added to cart")
    }

    return (
        <Controller name='quantity' control={form.control} render={({ field: { value, onChange } }) => (
            // <div className="flex flex-col w-[200px] gap-2 mt-2 ">
            <div className="flex gap-2 mt-2 w-full gap-x-5 bg-white
            fixed flex-row justify-center items-center bottom-0 left-0 p-4 border-t-[2px] 
            md:flex-col md:items-start md:static md:p-0 md:border-t-0">
                <div className="flex self-start items-center space-x-2 h-12 font-urbanist">
                    <button disabled={value === minQty || disabled} onClick={() => onChange(Number(value) - 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 text-white
                    ${value == minQty ? "bg-red-200 cursor-not-allowed" : "bg-red-500 hover:bg-red-400"}`}>
                        <span className={`text-xl font-bold `}>-</span>
                    </button>
                    <Input type='number' min={minQty} max={maxQty} value={value} className='text-center w-20' onChange={e => onChange(e.target.value)} />
                    <button disabled={value === maxQty || disabled} onClick={() => onChange(Number(value) + 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
                    ${(value == maxQty) || disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[--warna-green] hover:bg-[--warna-green]"}`}>
                        <span className={`text-xl font-bold text-white`}>+</span>
                    </button>
                </div>
                <Button variant={'green'} onClick={() => handleAddToCart(product)} className=''>Add to Cart</Button>
            </div>
        )} />
    )
}

export default AddToBasketProduct