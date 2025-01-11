'use client'

import React from 'react'
import { Button } from './ui/button';
import { client } from '@/sanity/lib/client';

function SaveTes() {
    const save = async () => {
        try {
            // post
            client.patch('7efe32a0-34e2-4852-8327-e63f7577d807')
                .set({
                    name: "Short Black!"
                })
                .commit()
                .then(val => {
                    console.log("status", val)
                })
                .catch(err => console.error("suksess", err))

            // post
            // const mutations = [{
            //     createOrReplace: {
            //         _id: '0cef98e1-e0e0-4e50-b36c-e67bcfeef574',
            //         _type: 'category',
            //         title: 'Aksesoris tes',
            //         description: "Aksesoris Baju Olahraga",
            //         slug: {
            //             _type: 'slug',
            //             current: 'tes-electronics'
            //         }
            //     }
            // }]
            // update
            // const mutations = [{
            //     patch: {
            //         id: '0cef98e1-e0e0-4e50-b36c-e67bcfeef574',
            //         "set": {
            //             title: 'Aksesoris mantap',
            //         }
            //     }
            // }]
            // delete
            // const mutations = [{
            //     delete: {
            //         id: "0cef98e1-e0e0-4e50-b36c-e67bcfeef573"
            //     }
            // }]

            // fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, {
            //     method: 'post',
            //     headers: {
            //         'Content-type': 'application/json',
            //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`
            //     },
            //     body: JSON.stringify({ mutations })
            // })
            //     .then(response => response.json())
            //     .then(result => console.log(result))
            //     .catch(error => console.log(error))
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    }

    return (
        <Button onClick={save}>Add</Button>
    )
}

export default SaveTes