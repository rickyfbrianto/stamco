import { Product } from "@/sanity.types";
import React from "react";
import ProductThumbnail from "./ProductThumbnail";
import { cn } from "@/lib/utils";

interface ProductGridProps {
	className?: string;
	products: Product[];
}

function ProductGrid({ className, products }: ProductGridProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4",
				className,
			)}
		>
			{products.map((product) => (
				<ProductThumbnail product={product} key={product._id} />
				// <AnimatePresence key={product._id}>
				//     <motion.div layout initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
				//     </motion.div>
				// </AnimatePresence>
			))}
		</div>
	);
}

export default ProductGrid;
