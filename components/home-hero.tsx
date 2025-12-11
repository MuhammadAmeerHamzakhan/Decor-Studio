"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  { image: "/luxury-candles-on-elegant-table-soft-lighting.jpg", caption: "Artisan Candles & Creative Souls" },
  { image: "/luxury-handcrafted-candle-styled-with-soft-pink-an.jpg", caption: "Artisan Candles & Creative Souls" },
  { image: "/luxury-artisan-candle-with-rich-wooden-lid-and-for.jpg", caption: "Artisan Candles & Creative Souls" },
]

export function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlay(false)
  }

  const slideVariants = {
    enter: () => ({ opacity: 0, scale: 1.05 }),
    center: { opacity: 1, scale: 1 },
    exit: () => ({ opacity: 0, scale: 0.98 }),
  }

  return (
    <section className="relative w-full min-h-screen md:h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1, ease: "easeInOut" },
            scale: { duration: 1.2, ease: "easeOut" },
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroSlides[currentSlide].image || "/placeholder.svg"}
            alt="Candle background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto py-16 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="font-serif font-bold mb-3 md:mb-5 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              {heroSlides[currentSlide].caption}
            </motion.h1>
          </AnimatePresence>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 md:mb-10 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Handcrafted luxury candles that transform your space into a sanctuary of calm and creativity.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-neutral-800 text-sm sm:text-base 
                         px-6 sm:px-10 md:px-12 py-4 md:py-5 rounded-lg shadow-xl 
                         hover:shadow-2xl transition-all duration-300 font-semibold hover:scale-105 border border-neutral-700"
            >
              <Link href="/candles">Shop Now</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Buttons (Hidden on Mobile) */}
      <motion.button
        onClick={goToPrevious}
        className="hidden sm:flex absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-20 
                   bg-black/70 hover:bg-black/90 rounded-full shadow-lg hover:shadow-xl 
                   transition-all duration-300 items-center justify-center backdrop-blur-sm
                   w-10 h-10 md:w-12 md:h-12 border border-white/10"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <motion.button
        onClick={goToNext}
        className="hidden sm:flex absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-20 
                   bg-black/70 hover:bg-black/90 rounded-full shadow-lg hover:shadow-xl 
                   transition-all duration-300 items-center justify-center backdrop-blur-sm
                   w-10 h-10 md:w-12 md:h-12 border border-white/10"
        aria-label="Next slide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="text-white w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-6 sm:w-7 md:w-8 h-2 sm:h-2.5 md:h-3"
                : "bg-white/40 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </section>
  )
}
