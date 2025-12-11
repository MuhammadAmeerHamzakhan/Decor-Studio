import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { ProductCardSkeleton } from "@/components/skeleton-loader"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center space-y-4">
              <div className="h-12 bg-secondary/30 rounded w-96 mx-auto animate-pulse" />
              <div className="h-6 bg-secondary/30 rounded w-64 mx-auto animate-pulse" />
              <div className="h-10 bg-secondary/30 rounded w-full max-w-md mx-auto animate-pulse mt-6" />
            </div>
          </div>
        </section>

        {/* Products Grid Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar Skeleton */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-6 bg-secondary/20 rounded w-32 animate-pulse" />
                      <div className="space-y-2">
                        {[...Array(3)].map((_, j) => (
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
