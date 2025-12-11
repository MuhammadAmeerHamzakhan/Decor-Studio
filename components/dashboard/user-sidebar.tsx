"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Package, User, LogOut, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

const navigation = [
  { name: "Home", href: "/dashboard/user", icon: Home },
  { name: "Marketplace", href: "/dashboard/user/marketplace", icon: ShoppingBag },
  { name: "Orders", href: "/dashboard/user/orders", icon: Package },
  { name: "Enrollments", href: "/dashboard/user/enrollments", icon: GraduationCap },
  { name: "Profile", href: "/dashboard/user/profile", icon: User },
];

export function UserSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Handle display name safely (Supabase uses full_name, fallback to email)
  const displayName = user?.full_name || user?.email?.split("@")[0] || "User";
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex h-full flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="font-serif text-xl font-semibold text-foreground">
          Decor Studio
        </Link>
      </div>

      {/* User info */}
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200">
            <span className="text-sm font-bold text-rose-700">
              {displayInitial}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-rose-50 text-rose-700"
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4 mt-auto">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}