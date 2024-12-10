// 'use client'

// import { useStore } from '@/store/store'
// import React from 'react'
// import { AiOutlineLeft } from 'react-icons/ai'

// type ProductType = { id: string, qty: number, time: number }

// export default function Cart() {
//     const zusCart = useStore(state => state.zusCart)
//     const setZusControl = useStore(state => state.setZusControl)

//     const handleClose = () => setZusControl({ showCart: false })
//     console.log(zusCart)

//     return (
//         <div className='cart-wrapper'>
//             <div className="cart-container">
//                 <button className='cart-heading' onClick={handleClose}>
//                     <AiOutlineLeft />
//                     <span className='heading'>Your Cart</span>
//                 </button>
//                 <div className="product-container">
//                     {zusCart.map((product: ProductType) => (
//                         <div key={product.id} className="flex flex-col">
//                             <span>ID {product.id}</span>
//                             <span>Qty {product.qty}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
