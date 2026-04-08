import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const merchant_id = "687861";
    const merchant_key = "o5oXMbcN9b9qjcNa";
    const merchant_salt = "kr8XT9fUY3LrFArh";

    const payment_amount = "1000"; // 10 TL
    const merchant_oid = "ORDER_" + Date.now();

    const user_ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const user_name = "Merlin User";
    const user_address = "Turkey";
    const user_phone = "5555555555";

    const user_basket = Buffer.from(
      JSON.stringify([["Merlin PRO", "10.00", 1]])
    ).toString("base64");

    // 🔥 ZORUNLU PARAMETRELER
    const no_installment = "0";
    const max_installment = "0";
    const currency = "TL";
    const test_mode = "1";

    // 🔥 DOĞRU HASH
    const hash_str =
      merchant_id +
      user_ip +
      merchant_oid +
      email +
      payment_amount +
      user_basket +
      no_installment +
      max_installment +
      currency +
      test_mode;

    const token = crypto
      .createHmac("sha256", merchant_key)
      .update(hash_str + merchant_salt)
      .digest("base64");

    // 🔥 PAYTR URL
    const paytr_url = `https://www.paytr.com/odeme/guvenli/${token}`;

    return NextResponse.json({
      url: paytr_url,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "PayTR hata" },
      { status: 500 }
    );
  }
}