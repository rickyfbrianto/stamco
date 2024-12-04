import React from 'react'
import { CouponCode } from './couponCode'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

async function getActiveSaleByCoupon(couponCode: CouponCode) {
    const ACTIVE_SALE_BY_COUPON_CODE = defineQuery(`*[_type == "sale" 
        && isActive == true 
        && couponCode == $couponCode
        ] | order(validFrom desc)[0]
    `)

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_CODE,
            params: { couponCode },
        })

        return activeSale ? activeSale.data : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export default getActiveSaleByCoupon