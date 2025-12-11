import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNavigation />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cream-50 to-rose-50 px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-rose-200">404</h1>
            <h2 className="text-4xl font-serif font-bold mt-4 mb-2">Page Not Found</h2>
            <p className="text-lg text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/candles">
              <Button size="lg" variant="outline">
                <Search className="mr-2 h-5 w-5" />
                Browse Candles
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
