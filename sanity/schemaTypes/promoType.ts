import { defineField, defineType } from "sanity";
import { TagIcon } from '@sanity/icons'

export const promoType = defineType({
    name: "promo",
    title: "Promo",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sales Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Sales Description",
            type: "text",
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            type: "number",
            description: "Amount off in percentage or fixed value"
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
        }),
        defineField({
            name: "validFrom",
            title: "Valid From",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Valid Until",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Toggle to activate/deactivate the sales promo",
            initialValue: true
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "discountAmount",
            couponCode: "couponCode",
            isActive: "isActive",
        },
        prepare(select) {
            const { title, discountAmount, couponCode, isActive } = select
            const status = isActive ? "Active" : "Inactive"
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`
            }
        }
    }
})