import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import type React from "react"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { RecentlyViewedProvider } from "@/contexts/recently-viewed-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { ComparisonDrawer } from "@/components/comparison-drawer"
import { CurrencyProvider } from "@/contexts/currency-context"
import { CountrySelectorModal } from "@/components/country-selector-modal"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Decor Studio by LA - Artisan Candles & Creative Soul",
  description: "Luxury handcrafted candles, candle-making courses, and premium supplies for creative souls",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  {children}
                  <CountrySelectorModal />
                  <ComparisonDrawer />
                  <Toaster />
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
