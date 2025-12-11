"use client";

import type React from "react";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ✅ If user already logged in, redirect them away from auth pages
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [user, loading, router]);

  // ✅ Show loader while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ✅ If user is logged in, block auth pages from showing
  if (user) {
    return null;
  }

  return <>{children}</>;
}
