import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Amelia Brown",
    text: "This course completely transformed how I approach candle design. The advanced pouring and layering lessons gave my work a professional edge I never thought possible.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Martinez",
    text: "I enrolled as a beginner, and now I’m confidently crafting my own collection! The guidance, videos, and community support were beyond amazing.",
    rating: 5,
  },
  {
    id: 3,
    name: "Hannah Lee",
    text: "Learning from Laura has been an inspiring journey. Every module was beautifully structured — I loved the mix of theory, artistry, and practical tips.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-[#FFF8F6]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
            What Our Students Say
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Real experiences from students who mastered the art of candle making
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4 text-[#FFC0CB]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FFC0CB]" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 leading-relaxed italic">
                  “{testimonial.text}”
                </p>
                <p className="font-semibold text-neutral-900">— {testimonial.name}</p>
                <p className="text-sm text-neutral-500 mt-1">Graduate, Advanced Candle Design</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
