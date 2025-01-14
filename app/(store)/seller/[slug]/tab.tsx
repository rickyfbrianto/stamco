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
import ProductFilter from '../../product/filter';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box>{children}</Box>}
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white', padding: 0 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Product" />
                        <Tab label="About Seller" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    {/* <div className="container mx-auto flex gap-x-4"> */}
                    <div className="p-4">
                        <div className="relative container mx-auto sm:flex min-h-[50vh] gap-4">
                            <div className="sticky top-[--tinggi10] self-start sm:top-[--tinggi12] flex flex-col bg-white border rounded-lg min-w-[15rem] px-4 pb-4">
                                <ProductFilter />
                            </div>

                            <Separator orientation='vertical' className='h-[75%]' />

                            <div className="flex flex-1 flex-col font-urbanist gap-2 ">
                                <span className='font-bold text-xl'>{seller.name}'s Product</span>
                                <Separator />
                                <ProductsView products={products as unknown as Product[]} className='font-urbanist' />
                            </div>
                        </div>
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