"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useCurrency } from "@/contexts/currency-context"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  category?: string
  badge?: string
}

export function ProductCard({ id, name, description, price, image, category, badge }: ProductCardProps) {
  const { addItem } = useCart()
  const { convertAndFormat } = useCurrency()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id, name, price, image, category })
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <Link href={`/product/${id}`}>
          <div className="relative overflow-hidden aspect-square">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {badge && (
              <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                {badge}
              </span>
            )}
            <button className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </Link>
        <div className="p-6 bg-card">
          {category && <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{category}</p>}
          <Link href={`/product/${id}`}>
            <h3 className="font-serif text-xl font-semibold mb-2 hover:text-primary transition-colors">{name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{convertAndFormat(price)}</span>
            <Button
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
