'use client';

import AddToBasketCart from '@/components/AddToBasketCart';
import CheckoutButton from '@/components/CheckoutButton';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { urlFor } from '@/sanity/lib/image';
import { useBasketStore } from '@/store/cartStore';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { RotateCw, ShoppingCart, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Cart, Product } from '@/sanity.types';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import imgNotFound from '@/public/cart_count.png';

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

function CartView() {
    const [isClient, setIsClient] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const { isSignedIn } = useAuth();

    const removeFromCart = useBasketStore((state) => state.removeFromCart);
    const getCarts = useBasketStore((state) => state.getCarts);
    const items = useBasketStore((state) => state.items)

    const form = useForm<ItemsProps>({
        defaultValues: {
            items: [{ check: false, id: '', qty: 0, harga: 0 }],
            itemAll: 0,
            hargaAll: 0,
            checkAll: false,
        },
    });
    // const formArray = useFieldArray({
    //     control: form.control,
    //     name: 'items',
    // });
    const itemWatch = form.watch('items');
    const itemAllWatch = form.watch('itemAll');
    const hargaAllWatch = form.watch('hargaAll');

    useEffect(() => {
        const tempItems = items.map((item, index) => {
            const product = item.product as unknown as Product
            return {
                check: form.getValues(`items.${index}.check`),
                id: item._id,
                qty: item.quantity,
                harga: product?.price ?? 0,
            }
        })
        form.reset({ ...form.getValues(), items: tempItems });
        setIsClient(true)
    }, [JSON.stringify(items)]);

    useEffect(() => {
        let itemCheck = 0;
        let qtyCheck = 0;
        let harga = 0;
        itemWatch.map((item) => {
            if (item.check) {
                const selected = items.find((group) => group._id === item.id);
                const product = selected?.product as unknown as Product
                harga += (product?.price ?? 0) * (selected?.quantity ?? 0);
                qtyCheck += selected?.quantity ?? 0;
                itemCheck++;
            }
        });
        form.setValue('hargaAll', harga);
        form.setValue('itemAll', qtyCheck);
        form.setValue('checkAll', itemCheck === items.length);
    }, [JSON.stringify(itemWatch)]);

    if (!isClient) return <Loader />;

    if (items.length === 0) return <NoFound />

    const handleCheckAll = (event: boolean) => {
        form.setValue('checkAll', event);
        itemWatch.map((item, index) => form.setValue(`items.${index}.check`, event));
    };

    const removeSelectedItem = () => {
        const temp = itemWatch
            .filter((item) => item.check)
            .map((item) => ({ delete: { id: item.id } }))

        removeFromCart(temp)
            .then(() => {
                setOpenAlert(false)
                getCarts()
                items.map((val, index) => {
                    form.setValue(`items.${index}.check`, false)
                })
                toast.success(`${temp.length} Product deleted from cart`)
            })
    };

    return (
        <div className="w-full">
            <div className="flex bg-gradient-to-b from-white to-slate-100 h-[--tinggi6] rounded-b-[75px] border-b font-urbanist">
                <div className="flex items-center container flex-col justify-center xs:flex-row xs:justify-between mx-auto gap-4 px-4 text-gray-500">
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-[1.2rem] font-bold">Your Cart</h1>
                        <ShoppingCart size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-bold">
                        {items.length} Product{items.length > 1 && 's'}
                    </span>
                </div>
            </div>
            <div className="container mx-auto p-4 py-6 flex flex-col lg:flex-row gap-4 min-h-[50vh]">
                <div className="flex flex-col gap-4 w-full font-open-sans">

                    <div className="flex flex-col justify-center items-center xxs:flex-row xxs:justify-between rounded-t-2xl min-h-14 py-2 gap-2 bg-white overflow-hidden px-4 border">
                        <Controller name="checkAll" control={form.control} render={({ field: { value } }) => (
                            <div className="flex items-center ">
                                <div className="flex justify-center items-center gap-x-6">
                                    <Checkbox id="checkAll" checked={value} onCheckedChange={(value) => handleCheckAll(value as boolean)} />
                                    <label htmlFor="checkAll" className="font-bold">
                                        {value ? 'Unselect' : 'Select'} All
                                    </label>
                                </div>
                            </div>
                        )} />
                        <div className="flex items-center h-full">
                            <RotateCw onClick={getCarts} size={18} className='cursor-pointer ' />
                            {itemWatch.some((item) => item.check) && <Separator orientation='vertical' className='h-[80%] mx-5' />}
                            {itemWatch.some((item) => item.check) && (
                                <Dialog open={openAlert} onOpenChange={setOpenAlert}>
                                    <DialogTrigger asChild>
                                        <button className="font-bold">Remove</button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Delete item</DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription>Are you sure you want to delete this selected item from your basket?</DialogDescription>
                                        <DialogFooter>
                                            <div className="flex justify-end w-full gap-2">
                                                <Button type="button" variant={'destructive'} onClick={removeSelectedItem}>
                                                    Delete
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button type="button">Cancel</Button>
                                                </DialogClose>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>

                    {/* List item */}
                    {items.map((item, index) => {
                        const product = item.product as unknown as Product
                        return (
                            <div key={product?._id || product.name} className="border flex flex-col overflow-hidden bg-white rounded-md">
                                <div className="flex flex-col-reverse xxs:flex-row">
                                    <Controller name={`items.${index}.check`} control={form.control} render={({ field: { value, onChange } }) => (
                                        <div className="flex min-w-[3rem] min-h-[2rem] justify-center items-center bg-slate-50">
                                            <Checkbox checked={value} onCheckedChange={(e) => onChange(e)} />
                                        </div>
                                    )} />
                                    <div className="flex-grow flex flex-col xs:flex-row xs:items-center justify-between transition-colors duration-500 p-4 gap-x-4 gap-y-2">
                                        <Link className="flex flex-col xs:flex-row cursor-pointer flex-1 gap-2 font-urbanist" href={`/product/${product?.slug?.current}`}>
                                            <div className="flex justify-center w-auto h-auto sm:w-24 sm:h-24 flex-shrink-0">{product?.image && <Image src={urlFor(product.image).url()} alt={product.name ?? 'Product image'} className="object-cover rounded select-none" width={100} height={100} />}</div>
                                            <div className="flex flex-col items-center xs:items-start min-w-[4rem]">
                                                <h2 className="text-center xs:text-start text-lg sm:text-xl font-semibold line-clamp-2">{product?.name}</h2>
                                                <p className="text-sm sm:text-base">${(product?.price ?? 0).toLocaleString('id-ID')}</p>
                                                <div className="flex gap-2 px-2 py-1 border-b-[2px] border-blue-100">
                                                    <span className="text-[.7rem] font-extrabold">Sub Total</span>
                                                    <p className="text-sm sm:text-base font-bold">${((product?.price ?? 0) * (item.quantity ?? 1)).toLocaleString('id-ID')}</p>
                                                </div>
                                            </div>
                                        </Link>

                                        <AddToBasketCart item={item as unknown as Cart} />
                                    </div>
                                </div>
                                <div className="hidden xs:flex px-4 py-2 gap-4 bg-slate-50 border-t font-sans">
                                    <Truck size={20} color="#2d4e3d" strokeWidth={1.5} />
                                    <span className="text-[.9rem] italic">Get your best price by checkout now!</span>
                                </div>
                            </div>
                        )
                    })}
                    {/* </div> */}
                </div>

                <div className="w-full lg:w-[25rem] lg:sticky lg:top-[--tinggi11] h-fit bg-white p-6 border rounded-lg order-first lg:order-last fixed bottom-0 left-0">
                    <h3 className="text-xl font-semibold">Order Summary</h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex flex-wrap justify-between text-gray-500 font-urbanist">
                            <span>Items</span>
                            <span>{itemAllWatch}</span>
                        </p>
                        <hr />
                        <p className="flex flex-wrap justify-between text-2xl font-bold">
                            <span>Total:</span>
                            <span>${hargaAllWatch.toLocaleString('id-ID')}</span>
                        </p>
                    </div>

                    {isSignedIn ? (
                        <CheckoutButton disabled={itemWatch.some((item) => item.check)} />
                    ) : (
                        <SignInButton mode="modal">
                            <button className="mt-4 w-full bg-[--warna-green] text-white px-4 py-2 rounded hover:bg-[--warna-green]/[0.9]">Sign in to Checkout</button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </div>
    );
}

const NoFound = () => (
    <div className="flex flex-col gap-y-4 rounded-lg shadow-md w-full py-8 font-urbanist">
        <div className="flex flex-col justify-center container mx-auto border rounded-lg py-14 bg-[--warna-vanilla]">
            <Image alt="Product Not Found" sizes="(max-width: 768px) 50%, (max-width: 1200px) 100%, 100%" src={imgNotFound}
                className="w-full max-h-[60vh] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <h1 className="text-xl md:text-3xl font-bold mb-2 text-center">Your cart is empty</h1>
            <p className="text-md md:text-xl mb-2 text-center">Browse your need <Link className='underline' href={'/product'}>now</Link></p>
        </div>
    </div>
);

export default CartView