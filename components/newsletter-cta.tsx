import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCTA() {
  return (
    <section className="py-20 bg-primary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to receive exclusive offers, candle care tips, and be the first to know about new collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1 h-12" />
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
