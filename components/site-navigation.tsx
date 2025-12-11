"use client"

import Link from "next/link"
import { ShoppingCart, Menu, User, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useCurrency } from "@/contexts/currency-context"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteNavigation() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const { selectedCountry, showCountrySelector } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/candles", label: "Candles" },
    { href: "/courses", label: "Courses" },
    { href: "/supplies", label: "Supplies" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-center leading-tight select-none">
            <span className="font-serif font-bold tracking-tight text-[1.1rem] md:text-[1.4rem] text-black block">
              Decor Studio
            </span>
            <span className="font-serif text-sm md:text-base text-[#FFC0CB] font-semibold">by LA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* Country Selector */}
            <Button
              variant="ghost"
              size="sm"
              onClick={showCountrySelector}
              className="hidden md:inline-flex gap-2 rounded-md"
            >
              <Globe className="h-4 w-4" />
              <span>{selectedCountry.flag}</span>
              <span className="text-xs font-medium">{selectedCountry.currency}</span>
            </Button>

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex rounded-md">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="pb-2">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "admin" ? "/admin" : "/dashboard/user"}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex rounded-md">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="hidden md:inline-flex rounded-md">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-md">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-md">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-4">
                <nav className="flex flex-col space-y-1 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>

                  <button
                    onClick={() => {
                      showCountrySelector()
                      setIsOpen(false)
                    }}
                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors flex items-center gap-2 w-full"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{selectedCountry.flag}</span>
                    <span className="truncate">
                      {selectedCountry.name} ({selectedCountry.currency})
                    </span>
                  </button>

                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="px-3 py-2 mb-2 rounded-md bg-muted/50">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <Link
                          href={user.role === "admin" ? "/admin" : "/dashboard/user"}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors block"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setIsOpen(false)
                          }}
                          className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors w-full text-left"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors block"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors block"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
