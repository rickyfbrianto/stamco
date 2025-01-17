import { defineField, defineType } from "sanity";
import { OlistIcon } from '@sanity/icons'

export const cartType = defineType({
    name: 'cart',
    title: "Cart",
    type: "document",
    icon: OlistIcon,
    fields: [
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            description: "Reference of this Product",
            validation: Rule => Rule.required(),
            to: [{type :"product"}],
        }),
        defineField({
            name: "quantity",
            title: "Quantity",
            type: "number",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "user",
            title: "User",
            type: "string",
            validation: Rule => Rule.required(),
        }),
    ],
    preview:{
        select:{
            title:"product.name",
            media:"product.image",
            subtitle: "quantity",
            user:"user"
        }, prepare({title, media, subtitle, user }){
            return { 
                title, media, 
                subtitle : `${user} : ${subtitle}`
            }
        }
    }
})