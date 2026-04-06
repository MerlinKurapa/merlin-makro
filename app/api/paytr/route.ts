import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email } = await req.json();

  const merchant_id = "687861";
  const merchant_key = "o5oXMbcN9b9qjcNa";
  const merchant_salt = "kr8XT9fUY3LrFArh";

  const payment_amount = "1000"; // 10 TL
  const merchant_oid = "ORDER_" + Date.now();

  const user_ip = "127.0.0.1";
  const user_name = "Merlin User";
  const user_address = "Turkey";
  const user_phone = "5555555555";

  const currency = "TL";

  const user_basket = Buffer.from(
    JSON.stringify([["Merlin PRO", "10.00", 1]])
  ).toString("base64");

  const hash_str =
    merchant_id +
    user_ip +
    merchant_oid +
    email +
    payment_amount +
    user_basket +
    user_name +
    user_address +
    user_phone;

  const token = crypto
    .createHmac("sha256", merchant_key)
    .update(hash_str + merchant_salt)
    .digest("base64");

  return NextResponse.json({
    token,
  });
}
