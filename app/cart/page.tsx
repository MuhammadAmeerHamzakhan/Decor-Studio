"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const { convertAndFormat, selectedCountry } = useCurrency()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavigation />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Link href="/candles">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const convertedTotal = totalPrice * selectedCountry.rate
  const shippingCost = totalPrice > 50 ? 0 : 8.99
  const convertedShipping = shippingCost * selectedCountry.rate
  const tax = convertedTotal * 0.08
  const finalTotal = convertedTotal + convertedShipping + tax

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">Shopping Cart</h1>
              <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
                Clear Cart
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Link href={`/product/${item.id}`}>
                                <h3 className="font-serif text-lg font-semibold hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              {item.category && <p className="text-sm text-muted-foreground">{item.category}</p>}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold text-lg">{convertAndFormat(item.price * item.quantity)}</p>
                              <p className="text-sm text-muted-foreground">{convertAndFormat(item.price)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">{convertAndFormat(totalPrice)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-semibold">
                          {shippingCost === 0 ? "FREE" : convertAndFormat(shippingCost)}
                        </span>
                      </div>

                      {totalPrice < 50 && (
                        <p className="text-xs text-muted-foreground">
                          Add {convertAndFormat(50 - totalPrice)} more for free shipping
                        </p>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span className="font-semibold">
                          {selectedCountry.symbol}
                          {tax.toFixed(2)}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="font-bold text-2xl">
                          {selectedCountry.symbol}
                          {finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90"
                    >
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="w-full mt-3 bg-transparent">
                      <Link href="/candles">Continue Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
