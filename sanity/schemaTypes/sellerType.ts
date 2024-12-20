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
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'image',
            title: 'Seller Image',
            type: 'image',
            validation: Rule => Rule.required(),
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'description',
            title: "Description",
            type: "text",
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            description: 'List of products sold by this seller',
        }),
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