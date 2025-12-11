"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const collections = [
  {
    id: 1,
    name: "Floral Essence",
    description: "Delicate blooms and fresh petals",
    price: "$42",
    image: "/luxury-floral-candle-pink-roses.jpg",
  },
  {
    id: 2,
    name: "Woodland Retreat",
    description: "Earthy cedar and warm amber",
    price: "$45",
    image: "/luxury-wooden-candle-forest-scent.jpg",
  },
  {
    id: 3,
    name: "Citrus Bliss",
    description: "Bright bergamot and sweet orange",
    price: "$38",
    image: "/luxury-citrus-candle-orange-lemon.jpg",
  },
  {
    id: 4,
    name: "Vanilla Dreams",
    description: "Rich vanilla and creamy tonka",
    price: "$40",
    image: "/luxury-vanilla-candle-cream-aesthetic.jpg",
  },
]

export function FeaturedCollections() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our bestselling candles, each crafted with premium ingredients and timeless elegance
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((candle) => (
            <Card
              key={candle.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={candle.image || "/placeholder.svg"}
                    alt={candle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-card">
                  <h3 className="font-serif text-xl font-semibold mb-2">{candle.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{candle.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{candle.price}</span>
                    <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={collections[currentIndex].image || "/placeholder.svg"}
                  alt={collections[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-card">
                <h3 className="font-serif text-xl font-semibold mb-2">{collections[currentIndex].name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{collections[currentIndex].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{collections[currentIndex].price}</span>
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
            <Link href="/candles">View All Candles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
