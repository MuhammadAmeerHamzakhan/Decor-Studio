"use client"

import { useRecentlyViewed } from "@/contexts/recently-viewed-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Clock } from "lucide-react"

export function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed()
  const { addToCart } = useCart()

  if (recentlyViewed.length === 0) return null

  return (
    <section className="py-12 border-t">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-serif text-2xl font-bold">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyViewed.map((product) => (
            <div key={product.id} className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square bg-secondary/20">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-sm mb-1 hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm font-bold mb-2">${product.price}</p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
