import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req, ev) {
  const token = req.cookies.token;
  const userId = await verifyToken(token);
  if (
    // if auth or static/login path
    userId ||
    req.nextUrl.pathname.includes("/login") ||
    req.nextUrl.pathname.includes("/static")
  ) {
    return NextResponse.next();
  } else {
    // if unauth, redirect to login
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
