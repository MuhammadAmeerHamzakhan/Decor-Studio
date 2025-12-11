"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { countries, convertPrice, formatPrice } from "@/lib/currency"
import { Check, DollarSign } from "lucide-react"

export function InlineCurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [convertedAmount, setConvertedAmount] = useState("")

  useEffect(() => {
    const numAmount = Number.parseFloat(amount) || 0
    const converted = convertPrice(numAmount, selectedCountry.rate)
    setConvertedAmount(formatPrice(converted, selectedCountry.symbol))
  }, [amount, selectedCountry])

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-serif">
          <DollarSign className="h-6 w-6 text-rose-500" />
          Currency Converter
        </CardTitle>
        <p className="text-sm text-muted-foreground">Convert USD to your local currency instantly</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount in USD
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7 text-lg h-12"
              placeholder="100"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Country Selector with Horizontal Scroll */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Country</label>
          <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
            <div className="flex gap-2 p-4">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  className={`inline-flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-rose-300 hover:bg-rose-50/50 min-w-[120px] ${
                    selectedCountry.code === country.code ? "border-rose-400 bg-rose-50" : "border-gray-200"
                  }`}
                >
                  <span className="text-4xl">{country.flag}</span>
                  <div className="text-center">
                    <p className="font-medium text-sm">{country.name}</p>
                    <p className="text-xs text-muted-foreground">{country.currency}</p>
                  </div>
                  {selectedCountry.code === country.code && <Check className="h-4 w-4 text-rose-600" />}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Converted Result */}
        <div className="rounded-lg bg-gradient-to-br from-rose-50 to-cream-100 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Converted Amount</p>
          <p className="text-4xl font-bold text-rose-600">{convertedAmount}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {selectedCountry.currency} ({selectedCountry.name})
          </p>
        </div>

        {/* Exchange Rate Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            1 USD = {selectedCountry.symbol}
            {selectedCountry.rate.toFixed(2)} {selectedCountry.currency}
          </p>
          <p className="text-xs mt-1">Exchange rates are approximate</p>
        </div>
      </CardContent>
    </Card>
  )
}
