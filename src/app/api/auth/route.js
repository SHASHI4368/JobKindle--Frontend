import crypto from "crypto";
import { NextResponse } from "next/server";

const generateAuthParams = (privateKey, token, expire) => {
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return {
    signature,
    expire,
    token,
  };
};

export async function GET() {
  try {
    const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
    const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;

    if (!IMAGEKIT_PRIVATE_KEY) {
      return NextResponse.json(
        { error: "IMAGEKIT_PRIVATE_KEY is not configured" },
        { status: 500 }
      );
    }

    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 60 * 10;
    const authParams = generateAuthParams(IMAGEKIT_PRIVATE_KEY, token, expire);

    return NextResponse.json({
      signature: authParams.signature,
      expire: authParams.expire,
      token: authParams.token,
      publicKey: IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Error generating auth params:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication parameters" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET(); // Same logic for POST requests
}
