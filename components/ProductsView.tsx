'use client'

import { Product } from '@/sanity.types'
import React, { Suspense, useEffect, useState } from 'react'
import ProductThumbnail from './ProductThumbnail'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Skeleton } from './ui/skeleton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Loader from './Loader'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Category } from "@/sanity.types"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useProductFilterStore } from "@/store/productStore"


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { usePathname, useRouter } from 'next/navigation'

interface ProductsViewProps {
    title?: string;
    className?: string;
    products: Product[];
    display?: "grid" | "line";
    start?: number;
    length?: number;
    showSortPrice?: boolean;
}

function ProductsView({ title = "", className, products, display = 'grid', start = 0, length = 5, showSortPrice = false }: ProductsViewProps) {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true), []);

    return (
        <div className='flex flex-col'>
            <div className="flex justify-between items-center">
                <span className='text-xl '>{title}</span>
                {showSortPrice &&
                    <ProductSortPrice />
                }
            </div>
            {(display == "grid") ?
                <div className={cn(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4`, className)}>
                    {products.map(product => (
                        <AnimatePresence key={product._id}>
                            <motion.div layout initial={{ opacity: 0.2, translateY: "100px" }} animate={{ opacity: 1, translateY: "0px" }} exit={{ opacity: 0, translateY: "100px" }} className="">
                                <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                                    <ProductThumbnail product={product} key={product._id} />
                                </Suspense>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </div>
                : <div className={cn(`flex flex-1 gap-4 mt-4`, className)}>
                    {!isClient
                        ? <Loader />
                        :
                        // <div className="flex-1">
                        //     <ProductThumbnail product={product} key={product._id} />
                        // </div>
                        <Swiper slidesPerView={1} spaceBetween={30} className="mySwiper"
                            navigation={true} pagination={{ clickable: true }} modules={[Pagination, Navigation]}
                            breakpoints={{
                                768: { slidesPerView: length ?? 2 },
                                1024: { slidesPerView: length ?? 3 },
                                1280: { slidesPerView: length ?? 4 },
                                1536: { slidesPerView: length ?? 5 },
                            }}>
                            {products.slice(start, length).map((product, index) => (
                                <SwiperSlide key={product._id} virtualIndex={index}>
                                    <div className="">
                                        <ProductThumbnail product={product} key={product._id} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
            }
        </div>
    )
}

const ProductSortPrice = () => {
    const [open, setOpen] = useState(false)
    const filter = useProductFilterStore(state => state.filter)
    const setFilter = useProductFilterStore(state => state.setFilter)
    const generateSearchParams = useProductFilterStore(state => state.generateSearchParams)
    const router = useRouter();
    const path = usePathname();

    const sort = [
        { id: "asc", title: "Price Low to High" },
        { id: "desc", title: "Price High to Low" },
    ]

    const handleSelect = () => {
        const temp = generateSearchParams()
        router.push(path + '?' + temp);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="self-start">
                    {filter.sort
                        ? sort.find((val) => val.id === filter.sort)?.title
                        : "Filter Price"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandEmpty>No Category Found.</CommandEmpty>
                    <CommandInput placeholder="Search Sort..." className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const selected = sort.find(val => val.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                                if (selected?.title) {
                                    setFilter({ sort: selected.id })
                                    setOpen(false)
                                    handleSelect()
                                }
                            }
                        }} />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {sort.map((val) => (
                                <CommandItem key={val.id} value={val.title} onSelect={() => {
                                    setFilter({ sort: filter.sort === val.id ? "" : val.id })
                                    setOpen(false)
                                    handleSelect()
                                }}>
                                    {val.title}
                                    <Check className={cn("ml-auto h-4 w-4", filter.sort === val.id ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ProductsView