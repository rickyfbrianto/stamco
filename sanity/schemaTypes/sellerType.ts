import { defineField, defineType } from "sanity"
import { LuStore } from "react-icons/lu";

export const sellerType = defineType({
    name: 'seller',
    title: 'Seller',
    type: 'document',
    icon: LuStore,
    fields: [
        defineField({
            name: 'name',
            title: 'Seller Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: "Slug",
            type: 'slug',
            options: {
                source: "name",
                maxLength: 100
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'province',
            title: 'Province',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Seller Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: "Description",
            type: "text",
        }),
        // defineField({
        //     name: 'products',
        //     title: 'Products',
        //     type: 'array',
        //     of: [{ type: 'reference', to: { type: 'product' } }],
        //     description: 'List of products sold by this seller',
        // }),
    ],
    preview: {
        select: {
            title: 'name',
            media: "image",
        },
        prepare(select) {
            return {
                title: select.title,
                media: select.media
            }
        }
    }
})