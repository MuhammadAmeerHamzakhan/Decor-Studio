import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="h-4 bg-secondary/30 rounded w-32 animate-pulse" />
              <div className="h-12 bg-secondary/30 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-secondary/30 rounded w-full animate-pulse" />
              <div className="flex gap-4 mt-6">
                <div className="h-10 bg-secondary/30 rounded w-32 animate-pulse" />
                <div className="h-10 bg-secondary/30 rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-6 bg-secondary/20 rounded animate-pulse" />
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="aspect-video bg-secondary/20 rounded animate-pulse" />
                  <div className="h-12 bg-secondary/20 rounded animate-pulse" />
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-6 bg-secondary/20 rounded animate-pulse" />
                    ))}
                  </div>
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
