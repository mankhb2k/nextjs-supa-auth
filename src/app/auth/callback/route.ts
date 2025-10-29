import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Exchange code error:", error.message);
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocal = process.env.NODE_ENV === "development";

  const redirectUrl = isLocal
    ? `${origin}${next}`
    : forwardedHost
    ? `https://${forwardedHost}${next}`
    : `${origin}${next}`;

  return NextResponse.redirect(new URL('/dashboard', request.url));
}

