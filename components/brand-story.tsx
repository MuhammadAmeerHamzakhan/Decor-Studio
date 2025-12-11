import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BrandStory() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
            <img src="/elegant-woman-founder-candle-maker-studio.jpg" alt="Founder" className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Crafted with Love & Intention</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to Decor Studio by LA, where every candle tells a story. Founded by Laura Anderson, our studio was
              born from a passion for creating beautiful, sustainable candles that transform ordinary moments into
              extraordinary experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each candle is hand-poured with premium soy wax, infused with carefully curated fragrances, and designed
              to bring warmth and elegance to your home. We believe in the power of scent to evoke memories, inspire
              creativity, and create sanctuary.
            </p>
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
