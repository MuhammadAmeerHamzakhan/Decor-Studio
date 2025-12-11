"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { countries } from "@/lib/currency"
import { useCurrency } from "@/contexts/currency-context"
import { Check } from "lucide-react"

export function CountrySelectorModal() {
  const { isFirstVisit, setSelectedCountry, selectedCountry, setIsFirstVisit } = useCurrency()

  const handleSelectCountry = (country: (typeof countries)[0]) => {
    setSelectedCountry(country)
  }

  return (
    <Dialog open={isFirstVisit} onOpenChange={setIsFirstVisit}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Select Your Country</DialogTitle>
          <DialogDescription>Choose your country to see prices in your local currency</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleSelectCountry(country)}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover:border-rose-300 hover:bg-rose-50/50 ${
                selectedCountry.code === country.code ? "border-rose-400 bg-rose-50" : "border-gray-200"
              }`}
            >
              <span className="text-3xl">{country.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-medium">{country.name}</p>
                <p className="text-sm text-muted-foreground">
                  {country.currency} ({country.symbol})
                </p>
              </div>
              {selectedCountry.code === country.code && <Check className="h-5 w-5 text-rose-600" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
