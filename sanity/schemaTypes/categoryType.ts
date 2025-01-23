import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const categoryType = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: "title" }
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name:"image",
            title:"Image Category",
            type:"image",
            options:{
                hotspot:true
            }
        })
    ],
    preview: {
        select: {
            title: 'title',
            media:"image",
            subtitle: "description"
        },
        prepare(select) {
            const {media, title, subtitle} = select
            return {media, title, subtitle}
        }
    }
})