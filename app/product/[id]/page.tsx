"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Check,
  Facebook,
  Instagram,
  Mail,
  Copy,
} from "lucide-react"
import { useState, use, useEffect } from "react"
import { candlesData } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useRecentlyViewed } from "@/contexts/recently-viewed-context"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(1) // Default to 14oz (middle option)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftMessage, setGiftMessage] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const { addItem } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()

  const product = candlesData.find((p) => p.id === resolvedParams.id)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        name: product.name,
        price: product.sizes?.[1]?.price || product.price,
        image: product.image,
      })
    }
  }, [product, addToRecentlyViewed])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteNavigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link href="/candles">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const relatedProducts = candlesData.filter((p) => p.id !== product.id).slice(0, 4)

  const currentSize = product.sizes?.[selectedSize] || { size: "14oz", price: product.price, burnTime: "80-90 hours" }
  const currentColor = product.colors?.[selectedColor]
  const images = product.images || [product.image, product.image, product.image]

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: `${product.name} - ${currentSize.size}`,
        price: currentSize.price,
        image: product.image,
        category: product.category,
      },
      quantity,
    )
  }

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: currentSize.price,
      image: product.image,
      category: product.category,
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out ${product.name} from Decor Studio by LA`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "instagram":
        // Instagram doesn't have direct sharing, copy link instead
        navigator.clipboard.writeText(url)
        alert("Link copied! Share on Instagram")
        break
      case "email":
        window.location.href = `mailto:?subject=${text}&body=${url}`
        break
      case "copy":
        navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
        break
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />

      {isSticky && (
        <div className="fixed top-0 left-0 right-0 bg-background border-b z-40 shadow-lg animate-in slide-in-from-top">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-sm text-muted-foreground">${currentSize.price}</p>
                </div>
              </div>
              <Button onClick={handleAddToCart} className="bg-foreground text-background hover:bg-foreground/90">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Product Details Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
                  <img
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-foreground text-background">{product.badge}</Badge>
                  )}
                  {product.stockStatus === "Low Stock" && (
                    <Badge className="absolute top-4 right-4 bg-orange-500 text-white">Low Stock</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-5 gap-2 md:gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all hover:border-foreground ${
                        selectedImage === idx ? "border-foreground" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Product Header */}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.collection}</p>
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 5)
                              ? "fill-foreground text-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating}/5 ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price & Availability */}
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-bold">${currentSize.price}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={product.stockStatus === "In Stock" ? "default" : "secondary"}>
                      {product.stockStatus}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Fragrance Notes</h3>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Top Notes:</span>
                        <span className="font-medium text-right">{product.scentNotes?.top}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Middle Notes:</span>
                        <span className="font-medium text-right">{product.scentNotes?.middle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Notes:</span>
                        <span className="font-medium text-right">{product.scentNotes?.base}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">{product.scentInspiration}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Size</Label>
                  <RadioGroup
                    value={selectedSize.toString()}
                    onValueChange={(v) => setSelectedSize(Number.parseInt(v))}
                  >
                    <div className="grid gap-3">
                      {product.sizes?.map((size, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <RadioGroupItem value={idx.toString()} id={`size-${idx}`} />
                          <Label htmlFor={`size-${idx}`} className="flex-1 flex justify-between cursor-pointer text-sm">
                            <span>
                              {size.size} - ${size.price}
                            </span>
                            <span className="text-muted-foreground">Burn time: {size.burnTime}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {product.colors && product.colors.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        Color: <span className="font-normal text-muted-foreground">{currentColor?.name}</span>
                      </Label>
                      <div className="flex gap-3">
                        {product.colors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedColor(idx)}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              selectedColor === idx ? "border-foreground scale-110" : "border-muted"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-11 w-11"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="h-11 w-11"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">Max: 10 per order</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-12 text-base"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 bg-transparent" onClick={handleAddToWishlist}>
                    <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold mb-3">Product Specifications</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Burn Time:</span>
                      <span className="font-medium">{product.specifications?.burnTime}</span>
                    </div>
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Wax Type:</span>
                      <span className="font-medium">{product.specifications?.waxType}</span>
                    </div>
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Wick Type:</span>
                      <span className="font-medium">{product.specifications?.wickType}</span>
                    </div>
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">{product.specifications?.weight}</span>
                    </div>
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-medium">{product.specifications?.dimensions}</span>
                    </div>
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground">Eco-Friendly:</span>
                      <span className="font-medium">{product.specifications?.ecoFriendly ? "✓" : "—"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">What's Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Icons */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Quality Guarantee</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="details" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">About This Candle</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{product.fullDescription}</p>
                  <p className="text-muted-foreground leading-relaxed italic">{product.scentInspiration}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Care Instructions</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.careInstructions}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Ingredients</h4>
                  <ul className="space-y-2">
                    {product.ingredients?.map((ingredient, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                        <span className="text-muted-foreground">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating}/5 based on {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
                              {review.author[0]}
                            </div>
                            <div>
                              <p className="font-semibold">{review.author}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                            ))}
                          </div>
                        </div>
                        {review.title && <p className="font-semibold mb-2">{review.title}</p>}
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <button className="hover:text-foreground">Helpful (12)</button>
                          <button className="hover:text-foreground">Report</button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Shipping Information</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>• Free standard shipping on orders over $50</p>
                    <p>• Standard shipping (5-7 business days): $5.99</p>
                    <p>• Express shipping (2-3 business days): $12.99</p>
                    <p>• Orders are processed within 1-2 business days</p>
                    <p>• You will receive a tracking number once your order ships</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Returns & Exchanges</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We want you to love your purchase! If you're not completely satisfied, we accept returns within 30
                      days of delivery.
                    </p>
                    <p>• Items must be unused and in original packaging</p>
                    <p>• Return shipping is free for defective items</p>
                    <p>• Refunds are processed within 5-7 business days</p>
                    <p>• Contact us at hello@decorstudiobyla.com to initiate a return</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-serif text-2xl font-bold mb-4">Gift Wrapping</h3>
                  <p className="text-muted-foreground">
                    Add gift wrapping to your order for $5. Each candle will be beautifully wrapped with a ribbon and
                    includes a handwritten gift card with your personal message.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-serif text-2xl font-bold">Gift Options</h3>

                <div className="flex items-center space-x-2">
                  <Checkbox id="gift-wrap" checked={giftWrap} onCheckedChange={(checked) => setGiftWrap(!!checked)} />
                  <Label htmlFor="gift-wrap" className="cursor-pointer">
                    Add gift wrapping (+$5.00)
                  </Label>
                </div>

                {giftWrap && (
                  <div className="space-y-4 pl-6 border-l-2">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Name</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter recipient's name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gift-message">Gift Message</Label>
                      <Textarea
                        id="gift-message"
                        placeholder="Write your personal message here..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">Maximum 200 characters</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="font-serif text-2xl font-bold">Share This Product</h3>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("instagram")}>
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("email")}>
                  <Mail className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("copy")}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">Verified Buyer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">Customers Also Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

const reviews = [
  {
    id: 1,
    author: "Sarah Mitchell",
    rating: 5,
    date: "2 weeks ago",
    title: "Absolutely Divine!",
    comment:
      "This candle exceeded all my expectations. The scent is sophisticated without being overwhelming, and it burns so evenly. I've already ordered three more as gifts!",
  },
  {
    id: 2,
    author: "Emily Rodriguez",
    rating: 5,
    date: "1 month ago",
    title: "Best Candle Ever",
    comment:
      "I'm obsessed with this candle! The quality is outstanding and the packaging is so beautiful. It makes my entire home smell amazing. Worth every penny.",
  },
  {
    id: 3,
    author: "Jessica Thompson",
    rating: 5,
    date: "2 months ago",
    title: "Transformed My Space",
    comment:
      "This candle has become a staple in my living room. The scent is long-lasting and creates such a cozy atmosphere. I love that it's made with natural ingredients too!",
  },
  {
    id: 4,
    author: "Amanda Chen",
    rating: 4,
    date: "3 months ago",
    title: "Beautiful and Luxurious",
    comment:
      "Gorgeous candle with an amazing scent throw. Burns cleanly and evenly. Only giving 4 stars because I wish it came in a larger size option.",
  },
]

const testimonials = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    quote:
      "The most beautiful candle I've ever owned. The scent is absolutely divine and fills my entire home with warmth.",
  },
  {
    id: 2,
    author: "Emily R.",
    rating: 5,
    quote:
      "I'm completely in love with this candle. The quality is exceptional and it burns for hours. Already planning my next order!",
  },
  {
    id: 3,
    author: "Jessica L.",
    rating: 5,
    quote:
      "This candle has transformed my self-care routine. The scent is so relaxing and the packaging is gorgeous. Highly recommend!",
  },
]
