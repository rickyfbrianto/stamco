'use client';

import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Category, Product, Seller } from '@/sanity.types';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import ProductsView from '@/components/ProductsView';
import { Separator } from '@/components/ui/separator';
import ProductFilter from '../../../../components/ProductFilter';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

interface TabSellerProps { seller: Seller, products: Product, categories: Category[] }

function TabSeller({ seller, products, categories }: TabSellerProps) {
    const [value, setValue] = useState(0);
    const [isClient, setIsClient] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

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
                    <div className="relative container mx-auto sm:flex min-h-[50vh] gap-5 p-4">
                        <div className="sticky top-[--tinggi10] self-start sm:top-[--tinggi12] flex flex-col bg-white border rounded-lg min-w-[15rem] px-4 pb-4 z-[1]">
                            <ProductFilter categories={categories} />
                        </div>

                        <div className="flex flex-1 flex-col font-urbanist gap-2 pb-4">
                            <span className="font-bold text-xl">{seller.name}'s Product</span>
                            <Separator />
                            <ProductsView products={products as unknown as Product[]} className="font-urbanist" />
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="relative container mx-auto sm:flex flex-col min-h-[50vh] gap-4 p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Seller</TableHead>
                                    <TableHead>{seller.name}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Nations</TableCell>
                                    <TableCell className="font-medium">{seller.country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Province</TableCell>
                                    <TableCell className="font-medium">{seller.province}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>City</TableCell>
                                    <TableCell className="font-medium">{seller.city}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell className="font-medium">{seller.description}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CustomTabPanel>
            </Box>
        </div>
    );
}

export default TabSeller;
