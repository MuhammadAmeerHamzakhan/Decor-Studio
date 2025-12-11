import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { CourseCardSkeleton } from "@/components/skeleton-loader"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavigation />
      <main className="flex-1">
        {/* Hero Skeleton */}
        <section className="h-[50vh] bg-secondary/20 animate-pulse" />

        {/* Filter Navigation Skeleton */}
        <section className="sticky top-16 z-20 bg-background border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-4 py-4 overflow-x-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-secondary/20 rounded-full animate-pulse flex-shrink-0" />
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Featured Section Skeleton */}
            <div className="mb-12">
              <div className="h-8 bg-secondary/20 rounded w-64 mb-6 animate-pulse" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* All Courses Section Skeleton */}
            <div>
              <div className="h-8 bg-secondary/20 rounded w-48 mb-6 animate-pulse" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <CourseCardSkeleton key={i} />
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
