'use client'

import { useProductFilterStore } from '@/store/productStore'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ProductFilterProps {
    minPrice: number;
    maxPrice: number;
    condition: string;
}

function ProductFilter() {
    const query = useSearchParams().get("query")
    const form = useForm<ProductFilterProps>({
        defaultValues: {
            minPrice: 0, maxPrice: 0, condition: ""
        },
    })
    const router = useRouter()

    const filter = useProductFilterStore(state => state.filter)

    const formSubmit: SubmitHandler<ProductFilterProps> = async data => {
        const newData = Object.entries(data)
            .filter(v => v[1])
            .map(v => `${v[0]}=${v[1]}`)
            .join("&") + (query ? `&query=${query}` : "")

        router.push(`/product?${newData}`)
    }

    return (
        // <form onSubmit={form.handleSubmit(formSubmit)}>

        <div className="flex flex-col gap-2">
            <Accordion type="multiple" >
                <AccordionItem value="price">
                    <AccordionTrigger className='hover:no-underline'>Price</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            <Controller control={form.control} name={"minPrice"} render={({ field }) => (
                                <input type="number" {...field} min={1} placeholder="Min Price" className="border border-gray-300 rounded-md p-2 w-full" />
                            )} />
                            <Controller control={form.control} name={"maxPrice"} render={({ field }) => (
                                <input type="number" {...field} min={1} placeholder="Min Price" className="border border-gray-300 rounded-md p-2 w-full" />
                            )} />
                            <input value={filter.query} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="condition">
                    <AccordionTrigger className='hover:no-underline'>Condition</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col">

                            <input type="number" min={1} placeholder="Min Price" className="border border-gray-300 rounded-md p-2 w-full" />
                            {/* <Controller name='minPrice' control={form.control} render={({ field, fieldState }) => (
                                    )} />
                                    <Controller name='maxPrice' control={form.control} render={({ field, fieldState }) => (
                                        <input type="number" {...field} placeholder="Max Price" className="border border-gray-300 rounded-md p-2 w-full" />
                                    )} /> */}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button variant={'warning'} onClick={form.handleSubmit(formSubmit)}>Filter</Button>
        </div>
        // </form>
    )
}

export default ProductFilter