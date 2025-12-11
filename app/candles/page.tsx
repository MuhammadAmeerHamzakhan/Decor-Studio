"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { QuickViewModal } from "@/components/quick-view-modal"
import { useState, useEffect } from "react"
import { SlidersHorizontal, Star, Heart, ShoppingCart, Eye, Sparkles, Gift } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllCandles } from "@/lib/admin-data"

const categories = ["Floral", "Woody", "Fresh", "Gourmand"]

const collections = [
  { name: "All Candles", value: "all" },
  { name: "Signature Collection", value: "signature" },
  { name: "Seasonal", value: "seasonal" },
  { name: "Wellness & Aromatherapy", value: "wellness" },
  { name: "Limited Edition", value: "limited" },
]

const giftSets = [
  {
    id: "spa-retreat",
    name: "Spa Retreat Set",
    description: "Lavender Bliss + Ocean Dreams + Moonlit Garden",
    price: 125,
    originalPrice: 138,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "seasonal-collection",
    name: "Seasonal Collection",
    description: "All four seasonal candles in a beautiful gift box",
    price: 165,
    originalPrice: 178,
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function CandlesPage() {
  const [allCandles, setAllCandles] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null)

  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    const loadCandles = () => {
      const candlesFromAdmin = getAllCandles()
      setAllCandles(candlesFromAdmin.length > 0 ? candlesFromAdmin : [])
    }

    loadCandles()

    const handleCandlesUpdate = (event: any) => {
      setAllCandles(event.detail)
    }

    window.addEventListener("candlesUpdated", handleCandlesUpdate)
    return () => window.removeEventListener("candlesUpdated", handleCandlesUpdate)
  }, [])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedCollection("all")
    setPriceRange([0, 100])
    setSearchQuery("")
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = (product: any) => {
    const inWishlist = isInWishlist(product.id)
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

  let filteredCandles = allCandles.filter((candle) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(candle.category)
    const priceMatch = candle.price >= priceRange[0] && candle.price <= priceRange[1]
    const searchMatch =
      searchQuery === "" ||
      candle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candle.description.toLowerCase().includes(searchQuery.toLowerCase())

    let collectionMatch = true
    if (selectedCollection === "signature") {
      collectionMatch = candle.badge === "Best Seller"
    } else if (selectedCollection === "seasonal") {
      collectionMatch = candle.badge === "Seasonal"
    } else if (selectedCollection === "limited") {
      collectionMatch = candle.badge === "Limited Edition"
    } else if (selectedCollection === "wellness") {
      collectionMatch = candle.category === "Floral" || candle.name.includes("Lavender")
    }

    return categoryMatch && priceMatch && searchMatch && collectionMatch
  })

  // Sort products
  filteredCandles = [...filteredCandles].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "reviews":
        return (b.reviews || 0) - (a.reviews || 0)
      default:
        return 0
    }
  })

  const signatureCandles = allCandles.filter((c) => c.badge === "Best Seller").slice(0, 4)
  const seasonalCandles = allCandles.filter((c) => c.badge === "Seasonal")
  const newArrivals = allCandles.filter((c) => c.badge === "New Arrival")

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Scent Family</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={100}
          step={5}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full bg-transparent" onClick={handleReset}>
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/luxury-candles-on-elegant-table-soft-lighting.jpg"
              alt="Luxury Candles"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">Luxury Artisan Candles</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">Hand-Poured Elegance, Crafted with Passion</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Collections
            </Button>
          </div>
        </section>

        {/* Collections Navigation */}
        <section className="border-b bg-background sticky top-16 z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
              {collections.map((collection) => (
                <button
                  key={collection.value}
                  onClick={() => setSelectedCollection(collection.value)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                    selectedCollection === collection.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Collection Feature */}
        {selectedCollection === "all" && (
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">Signature Collection</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our most beloved scents, crafted to perfection
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {signatureCandles.map((candle) => (
                  <div
                    key={candle.id}
                    className="group bg-background rounded-lg overflow-hidden border hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={candle.image || "/placeholder.svg"}
                        alt={candle.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{candle.badge}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-xl font-bold mb-2">{candle.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{candle.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${candle.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(candle)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <FilterSidebar />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredCandles.length} of {allCandles.length} candles
                  </p>

                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="reviews">Most Reviewed</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterSidebar />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCandles.map((candle) => (
                    <div
                      key={candle.id}
                      className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-secondary/20 overflow-hidden">
                        <Image
                          src={candle.image || "/placeholder.svg"}
                          alt={candle.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {candle.badge && (
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                            {candle.badge}
                          </Badge>
                        )}
                        {candle.stock === "Low Stock" && (
                          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                            Low Stock
                          </Badge>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={() => setQuickViewProduct(candle)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Quick View
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{candle.category}</p>
                        <h3 className="font-serif text-xl font-bold mb-2">{candle.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 italic">{candle.description}</p>

                        {candle.rating && (
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(candle.rating!)
                                      ? "fill-primary text-primary"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {candle.rating} ({candle.reviews})
                            </span>
                          </div>
                        )}

                        {candle.scentNotes && (
                          <div className="mb-3 p-2 bg-secondary/20 rounded text-xs">
                            <p className="text-muted-foreground">
                              <span className="font-medium">Notes:</span> {candle.scentNotes.top}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold">${candle.price}</span>
                          <span className="text-xs text-muted-foreground">{candle.size}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" onClick={() => handleAddToCart(candle)}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            variant={isInWishlist(candle.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleWishlist(candle)}
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(candle.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredCandles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No candles match your filters</p>
                    <Button variant="outline" onClick={handleReset}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gift Sets Section */}
        {selectedCollection === "all" && (
          <section className="py-16 bg-primary/5">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-serif text-4xl font-bold mb-4">Gift Sets & Bundles</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Curated collections for the perfect gift
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {giftSets.map((set) => (
                  <div key={set.id} className="bg-background p-6 rounded-lg border hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square mb-4 bg-secondary/20 rounded-md overflow-hidden">
                      <Image src={set.image || "/placeholder.svg"} alt={set.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2">{set.name}</h3>
                    <p className="text-muted-foreground mb-4">{set.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold">${set.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">${set.originalPrice}</span>
                      </div>
                      <Button
                        onClick={() =>
                          handleAddToCart({
                            ...set,
                            category: "Gift Sets",
                            rating: 5,
                            reviews: 0,
                            stock: "In Stock",
                            size: "Gift Set",
                            burnTime: "Varies",
                            scentNotes: { top: "", middle: "", base: "" },
                            ingredients: [],
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
        )}

        {/* Subscribe CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-4xl font-bold mb-4">Join Our Candle Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe and save 15% on your first order. Get exclusive access to new collections and special offers.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email" type="email" className="flex-1" />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {quickViewProduct && (
        <QuickViewModal
          open={!!quickViewProduct}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
          product={quickViewProduct}
        />
      )}
    </div>
  )
}
