import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: email, // 🔥 BURASI EMAIL BAĞLIYOR

      line_items: [
        {
          price: "price_1TG0inRwWZhiueDMlPYQJDNP",
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/dashboard?success=1",
      cancel_url: "http://localhost:3000/dashboard?canceled=1",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Stripe error" },
      { status: 500 }
    );
  }
}