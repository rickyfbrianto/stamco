'use client'

import React from 'react'
import { Button } from './ui/button';
import { client } from '@/sanity/lib/client';

function SaveTes() {
    const save = async () => {
        try {
            const newCategory = await client.create({
                _type: 'categories',
                title: 'Electronics',
                description: "Tes elektrionik",
                slug: {
                    _type: 'slug',
                    current: 'tes-electronics'
                }
            });

            console.log('Category created:', newCategory);
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    }

    return (
        <Button onClick={save}>Add</Button>
    )
}

export default SaveTes