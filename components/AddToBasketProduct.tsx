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
    const form = useForm({
        defaultValues: { quantity: minQty }
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const handleAddToCart = (product: Product) => {
        addItem(product)
        toast.success("Product added to cart")
    }

    return (
        <Controller name='quantity' control={form.control} render={({ field: { value, onChange } }) => (
            <div className="flex flex-col w-[200px] gap-2 ">
                <div className="flex self-start items-center space-x-2 h-12 font-urbanist">
                    <button disabled={value === minQty || disabled} onClick={() => onChange(Number(value) - 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                    ${value == minQty ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}>
                        <span className={`text-xl font-bold `}>-</span>
                    </button>
                    <Input type='number' min={minQty} value={value} className='text-center w-20' onChange={e => onChange(e.target.value)} />
                    <button disabled={disabled} onClick={() => onChange(Number(value) + 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
                    ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[--warna-green] hover:bg-[--warna-green]"}`}>
                        <span className={`text-xl font-bold text-white`}>+</span>
                    </button>
                </div>
                <Button variant={'green'} onClick={() => handleAddToCart(product)} className='self-start p-4'>Add to Cart</Button>
            </div>
        )} />
    )
}

export default AddToBasketProduct