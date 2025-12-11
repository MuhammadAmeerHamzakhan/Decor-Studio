import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Image Gallery Skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-secondary/20 rounded-lg animate-pulse" />
                <div className="grid grid-cols-5 gap-2 md:gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="aspect-square bg-secondary/20 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-secondary/20 rounded w-32 animate-pulse" />
                  <div className="h-12 bg-secondary/20 rounded w-3/4 animate-pulse" />
                  <div className="h-6 bg-secondary/20 rounded w-48 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <div className="h-10 bg-secondary/20 rounded w-32 animate-pulse" />
                  <div className="h-6 bg-secondary/20 rounded w-64 animate-pulse" />
                </div>

                <div className="border-t pt-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-6 bg-secondary/20 rounded animate-pulse" />
                  ))}
                </div>

                <div className="flex gap-3">
                  <div className="h-12 bg-secondary/20 rounded flex-1 animate-pulse" />
                  <div className="h-12 w-12 bg-secondary/20 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Skeleton */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex gap-4 border-b mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-10 w-32 bg-secondary/20 rounded animate-pulse" />
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-secondary/20 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
