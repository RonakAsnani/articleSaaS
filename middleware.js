// middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function middleware(request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]; // Assumes Bearer token
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Authorization token required" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Verify the token
    const isValid = await verifyToken(token, secret);

    if (!isValid) {
      throw new Error("Invalid or expired token");
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function verifyToken(token, secret) {
  const [headerEncoded, payloadEncoded, signatureEncoded] = token.split(".");
  const message = `${headerEncoded}.${payloadEncoded}`;
  const signatureUint8 = Uint8Array.from(
    atob(signatureEncoded.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  return crypto.subtle.verify(
    "HMAC",
    cryptoKey,
    signatureUint8,
    new TextEncoder().encode(message)
  );
}

export const config = {
  matcher: ["/api/article/add"],
};
