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

    return (<div className="flex flex-col gap-y-4">
        <div className='flex items-center justify-center space-x-2'>
            <button onClick={() => removeItem(product._id)} disabled={itemCount === 1 || disabled}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
                ${itemCount == 1 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
            >
                <span className={`text-xl font-bold ${itemCount == 1 ? "text-gray-400" : "text-gray-600"}`}>-</span>
            </button>
            <span className="min-w-[2rem] text-center font-semibold">{itemCount}</span>
            <button onClick={() => addItem(product, 1)} disabled={disabled || (maxStock == itemCount)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 
            ${disabled || (maxStock == itemCount) ? "bg-gray-400 cursor-not-allowed" : "bg-[--warna-green] hover:bg-[--warna-green]"}`}
            >
                <span className={`text-xl font-bold text-white`}>+</span>
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
                        <Button type='button' variant={'destructive'} onClick={() => removeFromCart(product)}>Delete</Button>
                        <DialogClose asChild>
                            <Button type='button'>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>)
}

export default AddToBasketButton