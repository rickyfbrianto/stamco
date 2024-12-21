'use client'

import React, { useEffect, useState } from 'react'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Seller } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

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

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

function TabSeller({ seller }: { seller: Seller }) {
    const [value, setValue] = useState(0);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Product" />
                    <Tab label="About Seller" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {seller.products?.map((product) => (
                        <Link key={product._id} href={`/product/${product.slug.current}`}
                            className='flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden '>
                            {/* {product.image && (
                                <Image className='w-[100%] h-[100%] object-contain transition-transform duration-300 '
                                    src={urlFor(product.image).url()}
                                    alt={product.name || "Product Image"}
                                    fill />
                            )} */}
                            {product.name}
                        </Link>
                    ))}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    )
}

export default TabSeller