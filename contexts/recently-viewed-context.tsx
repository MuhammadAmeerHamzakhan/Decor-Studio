"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface RecentlyViewedContextType {
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed")
    if (stored) {
      setRecentlyViewed(JSON.parse(stored))
    }
  }, [])

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      const updated = [product, ...filtered].slice(0, 10)
      localStorage.setItem("recentlyViewed", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}
