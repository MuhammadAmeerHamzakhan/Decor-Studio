import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WelcomeLevelUp() {
  return (
    <section className="w-full bg-[#FFF8F6] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-neutral-900">WELCOME</h2>
          <p className="text-base md:text-lg text-neutral-600 mb-3">Where craftsmanship meets creativity</p>
          <p className="text-sm md:text-base text-neutral-500 max-w-3xl mx-auto">
            Explore the world of premium candles, handmade artistry, and design inspiration. From exclusive craft
            tutorials and material guides to elegant décor pieces — everything you need to create, learn, and live artfully.
          </p>
        </div>

        {/* Level Up Section */}
        <div className="grid md:grid-cols-2 gap-0 max-w-6xl mx-auto shadow-2xl rounded-lg overflow-hidden">
          {/* Left Side - Image Only */}
          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-[#f2c0ca] to-[#FFC0CB]">
            <img
              src="/luxury-concrete-candle-art.jpg"
              alt="Luxury concrete candle artistry"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Right Side - Content Card */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center border-l-4 border-[#FFC0CB]">
            <h4 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-neutral-900 leading-tight">
              LEVEL UP: The Ultimate Advanced Block for Candle Creators
            </h4>

            <div className="space-y-4 text-neutral-700 text-sm md:text-base leading-relaxed mb-8">
              <p>
                Step inside our <span className="font-semibold text-[#FFC0CB]">exclusive advanced series</span> — 
                featuring <span className="font-semibold text-neutral-900">brand-new techniques</span> and 
                <span className="font-semibold text-neutral-900"> original design methods</span> that will 
                redefine how you create concrete candles.
              </p>
              <p>
                From <span className="font-semibold text-neutral-900">texture blending</span> to 
                <span className="font-semibold text-neutral-900">layer pouring</span> and 
                <span className="font-semibold text-neutral-900">color infusion artistry</span>, 
                this course takes you from beautiful to breathtaking — 
                unlocking your next level of craftsmanship.
              </p>
              <p>
                Join early to secure <span className="font-semibold text-neutral-900">priority access</span> and 
                enjoy an <span className="font-semibold text-neutral-900"> exclusive pre-launch offer</span> before 
                this collection goes public.
              </p>
            </div>

            <Button
              asChild
              className="bg-[#FFC0CB] hover:bg-[#f2c0ca] text-neutral-900 font-semibold px-8 py-5 rounded-md text-sm tracking-wider transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/courses">Join the Waitlist</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
