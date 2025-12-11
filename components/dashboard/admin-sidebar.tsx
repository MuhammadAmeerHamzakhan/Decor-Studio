"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  Settings,
  X,
  Flame,
  Package,
  ShoppingBag,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/courses", icon: GraduationCap },
  { name: "Modules", href: "/admin/modules", icon: BookOpen },
  { name: "Candles", href: "/admin/candles", icon: Flame },
  { name: "Supplies", href: "/admin/supplies", icon: Package },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Enrollments", href: "/admin/enrollments", icon: UserCheck },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-background border-r">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="font-serif text-xl font-semibold text-foreground">
          Decor Studio
        </Link>
        {onClose && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer info */}
      <div className="border-t p-4 text-xs text-muted-foreground">
        <p>Admin Panel v1.0</p>
        <p className="mt-1">DecoreStudioByLA</p>
      </div>
    </div>
  )
}
