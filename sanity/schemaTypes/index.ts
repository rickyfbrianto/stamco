import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { promoType } from './promoType'
import { sellerType } from './sellerType'
import { cartType } from './cartType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [cartType, categoryType, orderType, productType, promoType, sellerType],
}
