"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    redirect("/login?error=Missing+credentials");
  }

  if (!isSupabaseConfigured) {
    const cookieStore = await cookies();
    cookieStore.set("mock_auth", "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    cookieStore.set("admin_session_started_at", String(Date.now()), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    redirect("/admin");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/login?error=Supabase+client+unavailable");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session_started_at", String(Date.now()), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin");
}

export async function signOutAction() {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete("mock_auth");
  cookieStore.delete("admin_session_started_at");

  redirect("/login");
}
