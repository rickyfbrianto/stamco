import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import Image from "next/image";
import imgNotFound from "@/public/notfound.png";

interface FormProps {
	minPrice: number;
	maxPrice: number;
}

interface ParamsProps {
	query: string;
}

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<ParamsProps>;
}) {
	const { query } = await searchParams;

	return {
		title: query ? `Search ${query}` : "Product List",
		description: `Ini adalah deskripsi untuk halaman ${query}`,
	};
}

async function page({ searchParams }: { searchParams: Promise<ParamsProps> }) {
	const { query } = await searchParams;
	const products = await (query?.trim()
		? searchProductsByName(query)
		: getAllProducts());
	const categories = await getAllCategories();

	// const form = useForm({
	// 	defaultValues: {
	// 		minPrice: 0,
	// 		maxPrice: 0,
	// 	},
	// });

	return (
		<div className="flex py-5">
			<div className="relative container mx-auto sm:flex min-h-[50vh] gap-4">
				{/* <div className="flex flex-col sm:h-full bg-white rounded-lg min-w-[15rem] px-3"> */}
				<div className="sticky top-[9.8rem] sm:top-[--tinggi12] left-0 bg-white rounded-lg min-w-[15rem] px-3 pb-4 z-10 self-start">
					<Accordion type="multiple">
						<AccordionItem value="price">
							<AccordionTrigger className="hover:no-underline">
								Price
							</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col">
									<input
										type="number"
										min={1}
										placeholder="Min Price"
										className="border border-gray-300 rounded-md p-2 w-full"
									/>
									{/* <Controller name='minPrice' control={form.control} render={({ field, fieldState }) => (
                                    )} />
                                    <Controller name='maxPrice' control={form.control} render={({ field, fieldState }) => (
                                        <input type="number" {...field} placeholder="Max Price" className="border border-gray-300 rounded-md p-2 w-full" />
                                    )} /> */}
								</div>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="condition">
							<AccordionTrigger className="hover:no-underline">
								Condition
							</AccordionTrigger>
							<AccordionContent>
								<div className="flex flex-col">
									<input
										type="number"
										min={1}
										placeholder="Min Price"
										className="border border-gray-300 rounded-md p-2 w-full"
									/>
									{/* <Controller name='minPrice' control={form.control} render={({ field, fieldState }) => (
                                    )} />
                                    <Controller name='maxPrice' control={form.control} render={({ field, fieldState }) => (
                                        <input type="number" {...field} placeholder="Max Price" className="border border-gray-300 rounded-md p-2 w-full" />
                                    )} /> */}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
				<div className="flex flex-1 mt-4 sm:mt-0 flex-col font-urbanist items-center ">
					{query && (
						<div className="flex w-full py-2 px-4 bg-white rounded-lg mb-4">
							<span className="text-gray-500 text-[1rem]">
								Search result for &quot;{query}&quot;
							</span>
						</div>
					)}
					{products.length == 0 ? (
						<NoFound query={query} />
					) : (
						<div className="flex flex-col bg-white rounded-lg p-5">
							<span className="font-bold text-xl mb-4">Product</span>
							<ProductsView
								products={products}
								categories={categories}
								className="xl:grid-cols-4 2xl:grid-cols-5"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const NoFound = ({ query }: { query: string }) => (
	<div className="flex flex-col gap-y-4 bg-white rounded-lg shadow-md w-full pb-8">
		<div className="flex container mx-auto bg-[--warna-orange] rounded-lg">
			<Image
				className="w-full max-h-[60vh] object-contain transition-transform duration-300 group-hover:scale-105"
				src={imgNotFound}
				alt="Product Not Found"
				sizes="(max-width: 768px) 50%, (max-width: 1200px) 100%, 100%"
				//  width={100} height={100}
			/>
		</div>
		<h1 className="text-xl md:text-3xl font-bold mb-2 text-center">
			No product found for &quot;{query}&quot;
		</h1>
		<p className="text-gray-500 text-center">
			Try searching with different keywords
		</p>
	</div>
);

export default page;
