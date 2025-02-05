import { TrolleyIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
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
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'description',
            title: "Description",
            type: "array",
            of: [{ type: "block" }]
        }),
        defineField({
            name: "price",
            title: "Product Price",
            type: "number",
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: "categories",
            title: "Product Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }]
        }),
        defineField({
            name: "seller",
            title: "Seller",
            type: "reference",
            to: { type: "seller" },
            description: "Seller of this Product",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "featured",
            title: "Featured Products",
            type: "boolean",
            description: "Featured product that showed in first product",
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: "image",
            subtitle: "price"
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: select.subtitle,
                media: select.media
            }
        }
    }
})