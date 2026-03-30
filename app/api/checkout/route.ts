import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    // 👇 STRIPE BURAYA TAŞINDI
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    const body = await req.json();
    const email = body.email;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: "price_1TG0inRwWZhiueDMlPYQJDNP",
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
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