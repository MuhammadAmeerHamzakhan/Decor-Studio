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
import {
  Search,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Sparkles,
  TrendingUp,
  Package,
  BookOpen,
} from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllSupplies } from "@/lib/admin-data"

const categories = [
  "Waxes & Bases",
  "Fragrance Oils",
  "Containers & Jars",
  "Wicks",
  "Molds & Shapes",
  "Tools & Equipment",
  "Dyes & Colors",
]

const starterKits = [
  {
    id: "beginner-kit",
    name: "Beginner's Candle Kit",
    description: "Everything you need to start making candles",
    price: 89,
    image: "/candle-making-starter-kit.jpg",
    items: "Includes: 2lb soy wax, 3 fragrances, wicks, jars, thermometer",
  },
  {
    id: "advanced-kit",
    name: "Advanced Maker's Kit",
    description: "Professional tools for experienced candle makers",
    price: 159,
    image: "/professional-candle-making-kit.jpg",
    items: "Includes: 5lb wax blend, 6 fragrances, molds, pitcher, scale",
  },
]

export default function SuppliesPage() {
  const [allSupplies, setAllSupplies] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null)

  const { addItem } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    // Load supplies from admin storage
    const loadSupplies = () => {
      const suppliesFromAdmin = getAllSupplies()
      // If admin supplies exist, use them; otherwise use empty array
      setAllSupplies(suppliesFromAdmin.length > 0 ? suppliesFromAdmin : [])
    }

    loadSupplies()

    // Listen for updates from admin dashboard
    const handleSuppliesUpdate = (event: any) => {
      setAllSupplies(event.detail)
    }

    window.addEventListener("suppliesUpdated", handleSuppliesUpdate)
    return () => window.removeEventListener("suppliesUpdated", handleSuppliesUpdate)
  }, [])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleReset = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setSearchQuery("")
  }

  const handleAddToCart = (product: any) => {
    addItem({
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

  let filteredSupplies = allSupplies.filter((supply: any) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(supply.category)
    const priceMatch = supply.price >= priceRange[0] && supply.price <= priceRange[1]
    const searchMatch =
      searchQuery === "" ||
      supply.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supply.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && priceMatch && searchMatch
  })

  // Sort products
  filteredSupplies = [...filteredSupplies].sort((a: any, b: any) => {
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

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
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
          max={500}
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
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Candle-Making Supplies & Materials</h1>
              <p className="text-lg text-muted-foreground mb-8">Premium ingredients for your creative craft</p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search supplies..."
                  className="pl-12 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-8">
              {/* Desktop Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar />

                  {/* Educational Sidebar */}
                  <div className="mt-8 p-6 bg-secondary/20 rounded-lg">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Supplies Guide
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#" className="text-primary hover:underline">
                          Which Wax is Right for You?
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-primary hover:underline">
                          Wick Selection Guide
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-primary hover:underline">
                          Fragrance Blending Tips
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-primary hover:underline">
                          Getting Started Tutorial
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredSupplies.length} of {allSupplies.length} products
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

                {/* Bestselling Supplies */}
                <div className="mb-12 p-6 bg-primary/5 rounded-lg">
                  <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Bestselling Supplies
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allSupplies
                      .filter((s: any) => s.badge === "Best Seller")
                      .slice(0, 3)
                      .map((supply: any) => (
                        <div key={supply.id} className="bg-background p-4 rounded-lg border">
                          <div className="relative aspect-square mb-3 bg-secondary/20 rounded-md overflow-hidden">
                            <Image
                              src={supply.image || "/placeholder.svg"}
                              alt={supply.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-semibold mb-1">{supply.name}</h3>
                          <p className="text-2xl font-bold text-primary">${supply.price}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {filteredSupplies.map((supply: any) => (
                    <div
                      key={supply.id}
                      className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-secondary/20 overflow-hidden">
                        <Image
                          src={supply.image || "/placeholder.svg"}
                          alt={supply.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {supply.badge && (
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                            {supply.badge}
                          </Badge>
                        )}
                        {supply.stock === "Low Stock" && (
                          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                            Low Stock
                          </Badge>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={() => setQuickViewProduct(supply)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Quick View
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{supply.category}</p>
                        <h3 className="font-semibold mb-2 line-clamp-1">{supply.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{supply.description}</p>

                        {supply.rating && (
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(supply.rating!)
                                      ? "fill-primary text-primary"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {supply.rating} ({supply.reviews})
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold">${supply.price}</span>
                          {supply.size && <span className="text-xs text-muted-foreground">{supply.size}</span>}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" onClick={() => handleAddToCart(supply)}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            variant={isInWishlist(supply.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleWishlist(supply)}
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(supply.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredSupplies.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products match your filters</p>
                    <Button variant="outline" onClick={handleReset}>
                      Reset Filters
                    </Button>
                  </div>
                )}

                {/* Starter Kits Section */}
                <div className="mt-12 p-8 bg-secondary/20 rounded-lg">
                  <h2 className="font-serif text-3xl font-bold mb-2 flex items-center gap-2">
                    <Package className="h-7 w-7 text-primary" />
                    Starter Kits
                  </h2>
                  <p className="text-muted-foreground mb-6">Everything you need to begin your candle-making journey</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {starterKits.map((kit) => (
                      <div key={kit.id} className="bg-background p-6 rounded-lg border">
                        <div className="relative aspect-video mb-4 bg-secondary/20 rounded-md overflow-hidden">
                          <Image src={kit.image || "/placeholder.svg"} alt={kit.name} fill className="object-cover" />
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2">{kit.name}</h3>
                        <p className="text-muted-foreground mb-3">{kit.description}</p>
                        <p className="text-sm text-muted-foreground mb-4">{kit.items}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">${kit.price}</span>
                          <Button
                            onClick={() =>
                              handleAddToCart({
                                ...kit,
                                category: "Starter Kits",
                                rating: 5,
                                reviews: 0,
                                stock: "In Stock",
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
              </div>
            </div>
          </div>
        </section>

        {/* Bulk Pricing CTA */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-4xl font-bold mb-4">Bulk Discounts Available</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Order 10+ items and save! Contact us for special bulk pricing on supplies and materials.
              </p>
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link href="/contact">Get Bulk Pricing</Link>
              </Button>
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
