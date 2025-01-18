'use client'

import { Product } from '@/sanity.types'
import React, { Suspense, useEffect, useState } from 'react'
import ProductThumbnail from './ProductThumbnail'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Skeleton } from './ui/skeleton'

interface ProductGridProps {
    className?: string;
    products: Product[];
}

function ProductGrid({ className, products }: ProductGridProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => setIsClient(true), []);

    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4', className)}>
            {products.map(product => (
                <AnimatePresence key={product._id}>
                    <motion.div layout initial={{ opacity: 0.2, translateY: "100px" }} animate={{ opacity: 1, translateY: "0px" }} exit={{ opacity: 0, translateY: "100px" }} className="flex justify-center">
                        <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                            <ProductThumbnail product={product} key={product._id} />
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            ))}
        </div>
    )
}

export default ProductGrid