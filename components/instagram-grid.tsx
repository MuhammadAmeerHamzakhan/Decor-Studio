export function InstagramGrid() {
  const images = [
    "/aesthetic-candle-flat-lay-pink.jpg",
    "/luxury-candle-burning-cozy-home.jpg",
    "/candle-making-process-hands-pouring.jpg",
    "/candles-on-marble-table-flowers.jpg",
    "/candle-studio-workspace-aesthetic.jpg",
    "/luxury-candle-gift-set-packaging.jpg",
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Follow Our Journey</h2>
          <p className="text-lg text-muted-foreground">@decorstudiobyla</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image || "/placeholder.svg"}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
