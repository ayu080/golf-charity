import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/utils/stripe/server'
import { createAdminClient } from '@/utils/supabase/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('Stripe-Signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  const supabase = await createAdminClient()

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription
        const status = subscription.status

        // Map stripe status to our db status
        let localStatus = 'inactive'
        if (status === 'active' || status === 'trialing') localStatus = 'active'
        if (status === 'canceled' || status === 'unpaid') localStatus = 'canceled'
        if (status === 'past_due') localStatus = 'trailing' // Grace period logic

        await supabase
          .from('profiles')
          .update({ 
            subscription_status: localStatus,
            stripe_subscription_id: subscription.id 
          })
          .eq('stripe_customer_id', subscription.customer as string)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    console.error('Database update failed:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
