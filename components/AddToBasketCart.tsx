'use client';

import { Cart, Product } from '@/sanity.types';
import { useBasketStore } from '@/store/store';
import React, { memo, useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
import { debounce } from 'lodash';

// export type CustomCart = {
//     _id: string;
//     _type: 'cart';
//     product: Product; // Ensure this is a Product object
//     quantity: number;
//     user: string;

// };

interface AddToBasketCartProps {
    item: Cart;
    disabled?: boolean;
}

function AddToBasketCart({ item, disabled }: AddToBasketCartProps) {
    const [openAlert, setOpenAlert] = useState(false);
    const product = item.product as unknown as Product
    const maxStock = product.stock;
    const { userId } = useAuth();

    const addCart = useBasketStore((state) => state.addCart);
    const minusCart = useBasketStore((state) => state.minusCart);
    const updateQtyCart = useBasketStore((state) => state.updateQtyCart);
    const removeFromCart = useBasketStore((state) => state.removeFromCart);
    const getCarts = useBasketStore((state) => state.getCarts);
    
    const handleDebounceCart = React.useMemo(()=> {
        return debounce((qty) => updateQtyCart(item._id, qty), 1000)
    }, [])

    useEffect(()=> 
        handleDebounceCart(item.quantity)
    , [item.quantity])
    
    const handleAddToCart = async (product: Product) => {
        if (userId) {
            addCart(product, userId as string, 1);
        }
    }

    const handleDelete = () =>{
        removeFromCart(item._id)
        .then(() => {
            getCarts()
            setOpenAlert(false)
        })
    }

    return (
        <div className="flex flex-col self-center gap-y-4">
            <div className="flex items-center gap-x-2 font-urbanist">
                <button
                    onClick={() => minusCart(item._id)}
                    disabled={item.quantity === 1 || disabled}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 text-white
                    ${item.quantity == 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-300'}`}>
                    <span className={`text-md font-bold`}>-</span>
                </button>
                <span className="min-w-[2rem]  text-center font-semibold">{item.quantity}</span>
                <button
                    onClick={() => handleAddToCart(product)}
                    disabled={disabled || maxStock == item.quantity}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 text-white
                    ${disabled || maxStock == item.quantity ? 'bg-gray-400 cursor-not-allowed' : 'bg-[--warna-green] hover:bg-[--warna-green]'}`}>
                    <span className={`text-md font-bold`}>+</span>
                </button>
            </div>
            <div className="flex justify-center gap-x-2">
                <Trash size={16} color="#b31919" strokeWidth={1.5} onClick={() => setOpenAlert(true)} className="cursor-pointer" />
                <Dialog open={openAlert} onOpenChange={setOpenAlert}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete item</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>Are you sure you want to delete this item from your basket?</DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-end w-full gap-2">
                                <Button type="button" variant={'destructive'} onClick={handleDelete}>
                                    Delete
                                </Button>
                                <DialogClose asChild>
                                    <Button type="button">Cancel</Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default memo(AddToBasketCart);
