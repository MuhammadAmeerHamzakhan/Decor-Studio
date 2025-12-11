"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Package, Mail } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = `LA${Math.random().toString(36).substring(2, 9).toUpperCase()}`

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <CheckCircle2 className="h-24 w-24 mx-auto text-green-600" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            {/* Order Number */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="font-mono text-2xl font-bold">{orderNumber}</p>
              </CardContent>
            </Card>

            {/* What's Next */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your order details
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Shipping Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive tracking information once your order ships
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link href="/candles">Continue Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            {/* Support */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Questions about your order?{" "}
                <Link href="/contact" className="text-foreground font-semibold hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
