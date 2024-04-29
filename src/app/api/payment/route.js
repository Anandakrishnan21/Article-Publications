import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await req.json();
  let priceId = data.priceId;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://particles-omega-two.vercel.app/home/upload",
    cancel_url: "https://particles-omega-two.vercel.app/home/upload",
  });
  return NextResponse.json(session.url);
}
