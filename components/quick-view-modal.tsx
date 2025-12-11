"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface QuickViewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    name: string
    description: string
    fullDescription?: string
    price: number
    image: string
    category: string
    badge?: string
    rating?: number
    reviews?: number
    stock?: string
    scentNotes?: {
      top: string
      middle: string
      base: string
    }
    burnTime?: string
    size?: string
    ingredients?: string[]
  }
}

export function QuickViewModal({ open, onOpenChange, product }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-secondary/20 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product.badge}</Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h2 className="font-serif text-3xl font-bold mb-2">{product.name}</h2>
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating!) ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}
              <p className="text-3xl font-bold mb-4">${product.price}</p>
              {product.stock && (
                <Badge variant={product.stock === "In Stock" ? "default" : "secondary"} className="mb-4">
                  {product.stock}
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.fullDescription || product.description}</p>

            {/* Scent Notes */}
            {product.scentNotes && (
              <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
                <h3 className="font-semibold mb-3">Scent Profile</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Top Notes:</span> {product.scentNotes.top}
                  </div>
                  <div>
                    <span className="font-medium">Middle Notes:</span> {product.scentNotes.middle}
                  </div>
                  <div>
                    <span className="font-medium">Base Notes:</span> {product.scentNotes.base}
                  </div>
                </div>
              </div>
            )}

            {/* Specifications */}
            {(product.burnTime || product.size || product.ingredients) && (
              <div className="mb-6 space-y-2 text-sm">
                {product.size && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )}
                {product.burnTime && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Burn Time:</span>
                    <span className="font-medium">{product.burnTime}</span>
                  </div>
                )}
                {product.ingredients && (
                  <div>
                    <span className="text-muted-foreground">Ingredients:</span>
                    <p className="text-sm mt-1">{product.ingredients.join(", ")}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant={inWishlist ? "default" : "outline"} size="lg" onClick={handleWishlist}>
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
