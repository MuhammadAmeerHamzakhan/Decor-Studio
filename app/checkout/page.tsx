"use client"

import type React from "react"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { convertAndFormat, selectedCountry } = useCurrency()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")

  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  const convertedTotal = totalPrice * selectedCountry.rate
  const shippingCost = shippingMethod === "express" ? 15.99 : totalPrice > 50 ? 0 : 8.99
  const convertedShipping = shippingCost * selectedCountry.rate
  const tax = convertedTotal * 0.08
  const finalTotal = convertedTotal + convertedShipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process order
      clearCart()
      router.push("/order-confirmation")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1 py-12 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        step >= s
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-muted-foreground border-border"
                      }`}
                    >
                      {step > s ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 3 && <div className={`w-16 h-0.5 mx-2 ${step > s ? "bg-foreground" : "bg-border"}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Shipping Information */}
                  {step === 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-serif text-2xl">Shipping Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="123 Main Street"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              placeholder="Los Angeles"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              placeholder="CA"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code *</Label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              placeholder="90001"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-foreground text-background hover:bg-foreground/90"
                        >
                          Continue to Shipping Method
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Shipping Method */}
                  {step === 2 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-serif text-2xl">Shipping Method</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">Standard Shipping</p>
                                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                                </div>
                                <p className="font-semibold">{totalPrice > 50 ? "FREE" : convertAndFormat(8.99)}</p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">Express Shipping</p>
                                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                                </div>
                                <p className="font-semibold">{convertAndFormat(15.99)}</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="flex-1 bg-transparent"
                            onClick={() => setStep(1)}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                          >
                            Continue to Payment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 3: Payment Information */}
                  {step === 3 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-serif text-2xl">Payment Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            Your payment information is secure and encrypted. We never store your card details.
                          </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="flex-1 bg-transparent"
                            onClick={() => setStep(2)}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            size="lg"
                            className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                          >
                            Place Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">{convertAndFormat(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
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
