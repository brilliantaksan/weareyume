"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ADMIN_EMAIL } from "@/lib/content";
import "../admin.css";

const ERRORS: Record<string, string> = {
  not_allowed: `That Google account isn't allowed. Sign in with ${ADMIN_EMAIL}.`,
  signin_required: "Please sign in to access the admin.",
  auth_failed: "Sign-in failed. Please try again.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const [loading, setLoading] = useState(false);
  const errMsg = searchParams.error ? ERRORS[searchParams.error] : null;

  const signIn = async () => {
    setLoading(true);
    const supabase = createClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
        queryParams: { prompt: "select_account" },
      },
    });
  };

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <div className="mark serif">Yu+Me</div>
        <p>
          Admin access. Sign in with the <strong>{ADMIN_EMAIL}</strong> Google
          account to edit the site.
        </p>
        {errMsg && <div className="adm-login-err">{errMsg}</div>}
        <button className="adm-btn" onClick={signIn} disabled={loading}>
          {loading ? "Redirecting…" : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
