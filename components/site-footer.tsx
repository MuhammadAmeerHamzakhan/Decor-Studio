"use client"

import Link from "next/link"
import { Instagram, Facebook, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCurrency } from "@/contexts/currency-context"

export function SiteFooter() {
  const { selectedCountry, showCountrySelector } = useCurrency()

  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Decor Studio by LA</h3>
            <p className="text-sm text-muted-foreground">Artisan candles and creative soul for your home</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={showCountrySelector}
              className="mt-4 flex items-center gap-2 bg-transparent"
            >
              <Globe className="h-4 w-4" />
              <span className="text-lg">{selectedCountry.flag}</span>
              Change Country
            </Button>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/candles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Candles
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/supplies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/currency-converter"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Currency Converter
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe for exclusive offers and updates</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button className="bg-foreground text-background hover:bg-foreground/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Decor Studio by LA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
