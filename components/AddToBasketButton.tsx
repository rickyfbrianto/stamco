'use client'

import { Product } from '@/sanity.types'
import { useBasketStore } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';

interface AddToBasketButtonProps {
    product: Product;
    disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount, removeFromCart } = useBasketStore()
    const [openAlert, setOpenAlert] = useState(false)
    const itemCount = getItemCount(product._id)
    const maxStock = product.stock

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const handleDeleteItem = () => {
        if (itemCount > 0) {
            setOpenAlert(true)
            return
        }
    }

    return (
        <div className="flex flex-col gap-y-4 font-sans">
            <div className='flex items-center justify-center gap-x-1'>
                <button onClick={() => removeItem(product._id)} disabled={itemCount === 1 || disabled}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 
                    ${itemCount == 1 ? "bg-gray-400 cursor-not-allowed" : "bg-red-400 hover:bg-red-300"}`}
                >
                    <span className={`font-bold text-white `}>-</span>
                </button>
                <span className="min-w-[2rem]  text-center font-semibold">{itemCount}</span>
                <button onClick={() => addItem(product, 1)} disabled={disabled || (maxStock == itemCount)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 
                ${disabled || (maxStock == itemCount) ? "bg-gray-400 cursor-not-allowed" : "bg-[--warna-green] hover:bg-[--warna-green]"}`}
                >
                    <span className={`font-bold text-white`}>+</span>
                </button>
            </div>
            <div className="flex justify-center gap-x-2">
                <Trash size={16} color="#b31919" strokeWidth={1.5} onClick={handleDeleteItem} className='cursor-pointer' />
                <Dialog open={openAlert} onOpenChange={setOpenAlert}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete item</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            Are you sure you want to delete this item from your basket?
                        </DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-end w-full gap-2">
                                <Button type='button' variant={'destructive'} onClick={() => removeFromCart(product)}>Delete</Button>
                                <DialogClose asChild>
                                    <Button type='button'>Cancel</Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default AddToBasketButton