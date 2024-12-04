import { Product } from '@/sanity.types'
import React from 'react'
import ProductThumbnail from './ProductThumbnail'
import { AnimatePresence, motion } from "framer-motion";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {products.map(product => (
                <ProductThumbnail product={product} key={product._id} />
                // <AnimatePresence key={product._id}>
                //     <motion.div layout key={product._id} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                //     </motion.div>
                // </AnimatePresence>
            ))}
        </div>
    )
}

export default ProductGrid