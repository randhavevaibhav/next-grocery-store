import { createClient } from "./supabase-server";
import { NextResponse, type NextRequest } from "next/server";

const unProtectedURLS = ["/"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const homePageURL = request.nextUrl.clone();
  homePageURL.pathname = "/";

  //replace with actual page URL later
  const testPageURL = request.nextUrl.clone();
  testPageURL.pathname = "/";

  const loginPageURL = request.nextUrl.clone();
  loginPageURL.pathname = "/login";

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // User not authenticated and tries to visit URL's other than un-protected URL's then redirect to / --home page
  if (!user && !unProtectedURLS.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(homePageURL);
  }

  return supabaseResponse;
}
