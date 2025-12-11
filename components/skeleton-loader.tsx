export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border animate-pulse">
      <div className="aspect-square bg-secondary/20" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-secondary/20 rounded w-1/4" />
        <div className="h-6 bg-secondary/20 rounded w-3/4" />
        <div className="h-4 bg-secondary/20 rounded w-full" />
        <div className="h-4 bg-secondary/20 rounded w-2/3" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-secondary/20 rounded w-1/4" />
          <div className="h-9 bg-secondary/20 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border animate-pulse">
      <div className="aspect-[4/3] bg-secondary/20" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-secondary/20 rounded w-1/3" />
        <div className="h-6 bg-secondary/20 rounded w-full" />
        <div className="h-4 bg-secondary/20 rounded w-3/4" />
        <div className="flex gap-4 mt-4">
          <div className="h-4 bg-secondary/20 rounded w-20" />
          <div className="h-4 bg-secondary/20 rounded w-20" />
          <div className="h-4 bg-secondary/20 rounded w-20" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-secondary/20 rounded w-1/4" />
          <div className="h-9 bg-secondary/20 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="h-[60vh] min-h-[500px] bg-secondary/20 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 bg-secondary/30 rounded w-96 mx-auto" />
        <div className="h-6 bg-secondary/30 rounded w-64 mx-auto" />
        <div className="h-10 bg-secondary/30 rounded w-32 mx-auto mt-8" />
      </div>
    </div>
  )
}
