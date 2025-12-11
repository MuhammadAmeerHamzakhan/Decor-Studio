"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating?: number
  burnTime?: string
  size?: string
}

export function ComparisonDrawer() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("comparison")
      if (stored) {
        setProducts(JSON.parse(stored))
      }
    }

    handleStorageChange()
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("comparison-updated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("comparison-updated", handleStorageChange)
    }
  }, [])

  const removeProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    localStorage.setItem("comparison", JSON.stringify(updated))
    window.dispatchEvent(new Event("comparison-updated"))
  }

  const clearAll = () => {
    setProducts([])
    localStorage.removeItem("comparison")
    window.dispatchEvent(new Event("comparison-updated"))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (products.length === 0) return null

  return (
    <>
      <Button className="fixed bottom-6 right-6 z-50 shadow-lg" size="lg" onClick={() => setOpen(true)}>
        Compare ({products.length})
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Compare Products</span>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="relative aspect-square mb-4 bg-secondary/20 rounded">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <h3 className="font-serif text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold mb-4">${product.price}</p>

                <div className="space-y-2 text-sm mb-4">
                  {product.rating && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-medium">{product.rating}/5</span>
                    </div>
                  )}
                  {product.burnTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Burn Time:</span>
                      <span className="font-medium">{product.burnTime}</span>
                    </div>
                  )}
                  {product.size && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{product.size}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
