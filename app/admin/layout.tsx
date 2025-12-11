"use client"

import type React from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"
import { AdminTopBar } from "@/components/dashboard/admin-top-bar"
import { ThemeProvider } from "@/contexts/theme-context"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <aside className="hidden md:flex md:w-64 md:flex-col">
          <AdminSidebar />
        </aside>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <AdminSidebar onClose={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminTopBar onMenuClick={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
