import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { InlineCurrencyConverter } from "@/components/inline-currency-converter"

export default function CurrencyConverterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNavigation />
      <main className="flex-1 py-12 bg-gradient-to-br from-cream-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Currency Converter</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quickly convert prices from USD to your local currency
            </p>
          </div>
          <InlineCurrencyConverter />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
