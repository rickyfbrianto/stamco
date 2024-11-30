'use client'

import React, { useEffect, useState } from 'react'
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator';
import { Controller, useForm } from 'react-hook-form'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStore } from '@/store/store';
import { toast } from 'sonner';
import { client } from '@/sanity/lib/client';

export default function ProductDetail({ product }: { product: any }) {
    const [image, setImage] = useState(product.images[0])
    const setZusCart = useStore(state => state.setZusCart)
    const setZusControl = useStore(state => state.setZusControl)

    const form = useForm({
        defaultValues: { qty: 1, price: product.price, subtotal: 0 },
        mode: "onBlur"
    })

    const handleOperator = (operator: string) => {
        let currentQty = Number(watchControl.qty)
        if (operator === '+') {
            currentQty += 1
        } else if (operator === '-') {
            if (currentQty === 1) return
            currentQty -= 1
        }
        form.setValue("qty", currentQty)
    }

    const handleCheckout = async (data: any) => {
        const itemCheckout = {
            id: product._id, qty: watchControl.qty, time: + new Date()
        }
        setZusCart(itemCheckout)
        toast.success("Product added to cart")

        // 
        const newData = {
            price: 1000
        }
        // const update = await client.patch("88cf70e9-cb9a-4103-af7e-4dacab0a4e58").set(newData).commit()
        // console.log(update)
    }

    const watchControl = {
        qty: Number(form.watch("qty")),
        price: Number(form.watch("price")),
        subtotal: Number(form.watch("subtotal")),
    }

    useEffect(() => {
        form.setValue("subtotal", Number(watchControl.qty) * Number(watchControl.price))
    }, [JSON.stringify(watchControl)])

    return (
        <div className='product-detail-section font-urbanist'>
            <div className="product-detail-container">
                {/* Gambar Kiri */}
                <div className='border min-w-[400px] pt-2 rounded-xl self-start sticky top-[--tinggi6]'>
                    {/* Gambar atas */}
                    <div className='h-[400px] flex items-center'>
                        <Image className='object-cover mx-auto' priority={true} quality={100} src={urlFor(image).url()}
                            width={450} height={450} alt='Images Product'
                        />
                    </div>

                    {/* gambar bawah */}
                    <div className='small-images-container'>
                        <Carousel opts={{ align: "start" }} className="max-w-xs select-none">
                            <CarouselContent>
                                {product.images.map((val: any, index: number) => {
                                    return (
                                        <CarouselItem className="sm:basis-1/2 md:basis-1/4" key={val._key}>
                                            <Image className={`object-cover rounded-xl cursor-pointer border ${val._key == image._key ? "border-green-500 border-[3px] shadow-xl" : ""}`}
                                                width={100} height={100} alt={`Images Product ${index}`}
                                                src={urlFor(product.images[index]).url()}
                                                onClick={() => setImage(product.images[index])}
                                            />
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex flex-col gap-8 p-4 select-none border self-start'>
                    <div className='flex flex-col gap-4'>
                        <span className='text-3xl font-bold'>{product.name}</span>
                        <span className='text-2xl font-medium'>${product.price}</span>
                        <Separator className='my-3' />
                        <div className="flex gap-2 items-center">
                            <h3>Quantity</h3>
                            <Controller name='qty' control={form.control} render={({ field: { value, onChange }, fieldState }) => (
                                <div className="quantity-desc flex items-center border-black self-start">
                                    <span className="minus" onClick={() => handleOperator("-")}><AiOutlineMinus /> </span>
                                    <Input className='num w-20 text-center' type='number' value={value} min={1} onChange={e => onChange(e)} />
                                    <span className="plus" onClick={() => handleOperator("+")}><AiOutlinePlus /> </span>
                                </div>
                            )} />
                            <button className="add-to-cart" onClick={handleCheckout}>Add to Cart</button>
                        </div>
                        <span className='text-justify indent-10 first-letter:text-[1.6rem] first-letter:font-bold'>{product.description}</span>
                    </div>
                </div>

                {/* Box Kanan */}
                {/* <div className='min-w-[250px] border rounded-xl p-4 self-start sticky top-[--tinggi6]'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-xl'>Checkout sekarang</span>
                        <Controller name='qty' control={form.control} render={({ field: { value, onChange }, fieldState }) => (
                            <div className="flex items-center gap-2">
                                <Button variant={"outline"} onClick={() => handleOperator("-")}><FaMinus size={12} /></Button>
                                <Input type='number' value={value} min={1} onChange={e => onChange(e)} />
                                <Button variant={"outline"} onClick={() => onChange(value + 1)}><FaPlus size={12} /></Button>
                            </div>
                        )} />
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className='text-[.85rem]'>Qty</span>
                                <span className='text-[.85rem] font-bold'>{watchControl.qty} * {watchControl.price}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className='text-[1rem] font-bold'>Subtotal</span>
                                <span className='font-bold'>${watchControl.subtotal}</span>
                            </div>
                        </div>
                        <Separator />
                        <Button variant={"success"} type='button' onClick={form.handleSubmit(handleCheckout)}><FaPlus size={14} /><span className='text-lg'>Cart</span></Button>
                        <Button variant={"outline"}><span className='text-lg'>Beli langsung</span></Button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
