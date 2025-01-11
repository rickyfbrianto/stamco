'use client'

import React, { useEffect, useState } from 'react'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Product, Seller } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import ProductsView from '@/components/ProductsView';
import { Separator } from '@/components/ui/separator';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function TabSeller({ seller }: { seller: Seller }) {
    const [value, setValue] = useState(0);
    const [isClient, setIsClient] = useState(false)
    const { products } = seller

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="flex bg-white p-4 rounded-xl">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Product" />
                        <Tab label="About Seller" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div className="container mx-auto flex gap-x-4">
                        <div className="flex flex-col h-full rounded-lg min-w-[15rem]">
                            <Accordion type="multiple" >
                                <AccordionItem value="price">
                                    <AccordionTrigger className='hover:no-underline'>Price</AccordionTrigger>
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

                        </div>

                        <Separator orientation='vertical' className='border-black' />

                        <ProductsView products={products as unknown as Product[]} className='font-urbanist' />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default TabSeller