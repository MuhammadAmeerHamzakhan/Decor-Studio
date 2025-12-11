import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CoursesCandlesHero() {
  return (
    <section className="relative w-full h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-dark-candles-hero.jpg"
          alt="Luxury handmade candles"
          className="w-full h-full object-cover object-center opacity-90"
        />
        {/* Soft overlay for balance */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/35 md:bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-3xl mx-auto">
        {/* Small heading */}
        <p className="text-[#FFD6DD] text-xs md:text-sm tracking-[0.15em] uppercase mb-3">
          Décor Studio by LA
        </p>

        {/* Main heading */}
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-3 leading-snug">
          Courses · Candles · Supplies
        </h2>

        {/* Subheading */}
        <p className="text-gray-200 text-sm md:text-base mb-6">
          Discover craftsmanship and creativity redefined
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="bg-[#FFF8F6] hover:bg-[#FFEFF1] text-neutral-900 font-medium px-6 md:px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:shadow-lg"
        >
          <Link href="/courses">Explore Our Courses</Link>
        </Button>
      </div>
    </section>
  )
}
