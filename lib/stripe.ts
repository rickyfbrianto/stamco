import Stripe from 'stripe'

if (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined")
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia"
})

export default stripe