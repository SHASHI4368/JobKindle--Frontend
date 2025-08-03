import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
}
