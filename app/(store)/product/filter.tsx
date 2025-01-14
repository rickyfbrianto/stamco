'use client'

import { useProductFilterStore } from '@/store/productStore'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CategorySelector } from '@/components/ui/CategorySelector'
import { Category } from '@/sanity.types'

interface ProductFilterComponentProps {
    categories?: Category[];
}

function ProductFilter({ categories }: ProductFilterComponentProps) {
    const router = useRouter()
    const path = usePathname()
    const filter = useProductFilterStore(state => state.filter)
    const setFilter = useProductFilterStore(state => state.setFilter)
    const generateSearchParams = useProductFilterStore(state => state.generateSearchParams)

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const temp = generateSearchParams()
        router.push(path + "?" + temp)
    }

    return (
        <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-2">
                <Accordion type="multiple" >
                    <AccordionItem value="price">
                        <AccordionTrigger className='hover:no-underline font-bold'>Price</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="minPrice">Min Price</label>
                                <input type="number" min={0} placeholder="Min Price" className="border border-gray-300 rounded-md p-2 w-full" value={filter.minPrice} onChange={e => setFilter({ minPrice: Number(e.target.value) })} />
                                <label htmlFor="maxPrice">Max Price</label>
                                <input type="number" min={0} placeholder="Max Price" className="border border-gray-300 rounded-md p-2 w-full" value={filter.maxPrice} onChange={e => setFilter({ maxPrice: Number(e.target.value) })} />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    {categories && categories.length > 0 && (
                        <AccordionItem value="category">
                            <AccordionTrigger className='hover:no-underline font-bold'>Category</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="category">Category</label>
                                    <CategorySelector categories={categories} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )}
                </Accordion>
                {/* <Button variant={'warning'} onClick={formSubmit}>Filter</Button> */}
                <Button variant={'warning'} type='submit'>Filter</Button>
            </div>
        </form>
    )
}

export default ProductFilter