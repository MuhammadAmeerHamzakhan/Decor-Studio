"use client"

import type React from "react"
import { UserSidebar } from "@/components/dashboard/user-sidebar"
import { RequireAuth } from "@/components/auth/require-auth"

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col">
          <UserSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">{children}</main>
      </div>
    </RequireAuth>
  )
}
