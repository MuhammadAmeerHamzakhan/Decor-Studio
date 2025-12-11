import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Leaf, Sparkles, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Where passion meets craftsmanship, and every candle tells a story of dedication, artistry, and the
                pursuit of creating beautiful moments.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="/elegant-woman-founder-candle-maker-studio.jpg"
                  alt="Laura Anderson, Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-4xl font-bold">Meet Laura Anderson</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My journey with candles began in a small Los Angeles apartment, where I discovered the transformative
                  power of scent and light. What started as a creative outlet during challenging times evolved into a
                  passion that would define my life's work.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  After years of experimenting with different waxes, fragrances, and techniques, I founded Decor Studio
                  by LA in 2018. My vision was simple: to create candles that weren't just products, but
                  experiences—pieces of art that could transform any space into a sanctuary.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, I'm honored to share my craft with thousands of customers and students worldwide, teaching the
                  art of candle making and helping others discover the joy of creating beautiful, meaningful pieces for
                  their homes.
                </p>
                <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/courses">Learn from Laura</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl font-bold mb-12 text-center">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Handcrafted with Love</h3>
                    <p className="text-sm text-muted-foreground">
                      Every candle is hand-poured with care and attention to detail, ensuring the highest quality.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <Leaf className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Sustainable Practices</h3>
                    <p className="text-sm text-muted-foreground">
                      We use natural soy wax, eco-friendly packaging, and sustainable sourcing for all materials.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Premium Quality</h3>
                    <p className="text-sm text-muted-foreground">
                      Only the finest ingredients and fragrances make it into our candles, no compromises.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                      <Award className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Expert Craftsmanship</h3>
                    <p className="text-sm text-muted-foreground">
                      Years of experience and continuous learning ensure every product meets our high standards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl font-bold mb-12 text-center">Our Journey</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-serif text-2xl font-bold text-primary">2018</span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-border pl-6">
                    <h3 className="font-semibold text-xl mb-2">The Beginning</h3>
                    <p className="text-muted-foreground">
                      Decor Studio by LA was founded in a small Los Angeles studio, with a dream to create luxury
                      candles that inspire and delight.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-serif text-2xl font-bold text-primary">2019</span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-border pl-6">
                    <h3 className="font-semibold text-xl mb-2">First Collection Launch</h3>
                    <p className="text-muted-foreground">
                      Launched our signature collection featuring four unique scents, quickly becoming bestsellers among
                      our growing community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-serif text-2xl font-bold text-primary">2021</span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-border pl-6">
                    <h3 className="font-semibold text-xl mb-2">Education Program</h3>
                    <p className="text-muted-foreground">
                      Started offering candle-making courses and workshops, sharing our knowledge and passion with
                      aspiring candle makers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-serif text-2xl font-bold text-primary">2023</span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-border pl-6">
                    <h3 className="font-semibold text-xl mb-2">Supplies & Materials</h3>
                    <p className="text-muted-foreground">
                      Expanded to offer premium candle-making supplies, helping our community create their own beautiful
                      candles at home.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="font-serif text-2xl font-bold text-primary">2025</span>
                  </div>
                  <div className="flex-1 pl-6">
                    <h3 className="font-semibold text-xl mb-2">Today</h3>
                    <p className="text-muted-foreground">
                      Serving thousands of customers worldwide, with a thriving community of candle enthusiasts and a
                      commitment to sustainable, beautiful craftsmanship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Become part of our story. Explore our collections, take a course, or simply follow along as we continue
                to create beautiful moments, one candle at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/candles">Shop Candles</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
