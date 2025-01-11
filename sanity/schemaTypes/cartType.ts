import { defineField, defineType } from "sanity";
import { OlistIcon } from '@sanity/icons'

export const cartType = defineType({
    name: 'cart',
    title: "Cart",
    type: "document",
    icon: OlistIcon,
    fields: [
        defineField({
            title: "qty",
            name: "Qty",
            type: "number",
        }),
    ]
})