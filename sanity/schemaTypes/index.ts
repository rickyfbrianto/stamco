import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { sellerType } from './sellerType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [productType, categoryType, orderType, salesType, sellerType],
}
