import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductCardSkeleton, HeroSkeleton } from "@/components/skeleton-loader"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <HeroSkeleton />

        {/* Collections Navigation Skeleton */}
        <section className="border-b bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-6 overflow-x-auto py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-32 bg-secondary/20 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-8">
              {/* Filters Sidebar Skeleton */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-6 bg-secondary/20 rounded w-32 animate-pulse" />
                      <div className="space-y-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-5 bg-secondary/20 rounded animate-pulse" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
