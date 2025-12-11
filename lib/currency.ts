export interface Country {
  code: string
  name: string
  currency: string
  symbol: string
  flag: string
  rate: number // Conversion rate from USD
}

export const countries: Country[] = [
  { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "🇺🇸", rate: 1 },
  { code: "PK", name: "Pakistan", currency: "PKR", symbol: "₨", flag: "🇵🇰", rate: 280 },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧", rate: 0.8 },
  { code: "AE", name: "United Arab Emirates", currency: "AED", symbol: "د.إ", flag: "🇦🇪", rate: 3.67 },
  { code: "EU", name: "European Union", currency: "EUR", symbol: "€", flag: "🇪🇺", rate: 0.92 },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", flag: "🇨🇦", rate: 1.36 },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", flag: "🇦🇺", rate: 1.52 },
  { code: "IN", name: "India", currency: "INR", symbol: "₹", flag: "🇮🇳", rate: 83 },
]

export function convertPrice(priceInUSD: number, targetRate: number): number {
  return Math.round(priceInUSD * targetRate * 100) / 100
}

export function formatPrice(price: number, symbol: string): string {
  return `${symbol}${price.toLocaleString()}`
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code)
}
