import { createClient } from "@supabase/supabase-js";

// These keys must be in your .env.local file with NEXT_PUBLIC_ prefix
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  // Safe fallback to prevent crash during build
  console.warn("Supabase keys are missing!");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");