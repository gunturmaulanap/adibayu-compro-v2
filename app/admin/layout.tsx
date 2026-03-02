import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import AdminShell from "@/app/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuthenticated = false;

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const userResult = await supabase.auth.getUser();
      isAuthenticated = Boolean(userResult.data.user);

      const cookieStore = await cookies();
      const sessionStartedAt = Number(
        cookieStore.get("admin_session_started_at")?.value || "0",
      );
      const isSessionExpired = !sessionStartedAt;

      if (isAuthenticated && isSessionExpired) {
        await supabase.auth.signOut();
        cookieStore.delete("admin_session_started_at");
        isAuthenticated = false;
      }
    }
  } else {
    const cookieStore = await cookies();
    const isMockAuth = cookieStore.get("mock_auth")?.value === "1";
    const sessionStartedAt = Number(
      cookieStore.get("admin_session_started_at")?.value || "0",
    );
    const isSessionExpired = !sessionStartedAt;

    if (isMockAuth && isSessionExpired) {
      cookieStore.delete("mock_auth");
      cookieStore.delete("admin_session_started_at");
      isAuthenticated = false;
    } else {
      isAuthenticated = isMockAuth;
    }
  }

  if (!isAuthenticated) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
