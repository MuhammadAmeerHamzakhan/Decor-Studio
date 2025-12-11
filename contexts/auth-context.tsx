"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from ".././utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// ✅ USER TYPE
// We extend the default Supabase user to include our custom fields
type ExtendedUser = User & {
  role?: string;
  full_name?: string;
};

interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ 1. CHECK SESSION & LOAD USER PROFILE
  useEffect(() => {
    const fetchProfile = async (sessionUser: User | null) => {
      if (!sessionUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Fetch role and name from 'profiles' table
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", sessionUser.id)
        .single();

      setUser({
        ...sessionUser,
        role: profile?.role || "user",
        full_name: profile?.full_name || sessionUser.user_metadata.full_name,
      });
      setLoading(false);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfile(session?.user ?? null);
    });

    // Listen for changes (Login, Logout, Auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ 2. LOGIN FUNCTION
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { success: false, error: error.message };

      // Redirect is handled by the Layout or Component, but we return success
      router.push("/dashboard/user"); // Default redirect
      return { success: true };
    } catch (err) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  // ✅ 3. SIGNUP FUNCTION
  const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      if (password !== confirmPassword) {
        return { success: false, error: "Passwords do not match" };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This metadata is sent to Supabase and copied to 'profiles' via Trigger
          data: {
            full_name: name,
          },
        },
      });

      if (error) return { success: false, error: error.message };

      router.push("/dashboard/user");
      return { success: true };
    } catch (err) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  // ✅ 4. LOGOUT FUNCTION
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ SAFE HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};