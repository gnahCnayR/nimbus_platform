import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "WeatherTrade's forecasting models have given us a significant edge in agricultural futures trading. The platform's accuracy is remarkable.",
      author: "Sarah Johnson",
      title: "Head of Commodities, Global Investments Ltd",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The geospatial visualization tools have transformed how we analyze weather impacts on our supply chain and trading strategies.",
      author: "Michael Chen",
      title: "Risk Manager, Eastern Trading Co",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "We've reduced our climate-related trading losses by 37% since implementing WeatherTrade's predictive analytics into our decision process.",
      author: "Elena Rodriguez",
      title: "Chief Strategy Officer, Meridian Commodities",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Trusted by Leading Traders
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            See how our weather intelligence platform is helping traders make more informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md dark:bg-slate-900">
              <CardContent className="pt-6">
                <p className="text-slate-700 dark:text-slate-300 italic">&quot;{testimonial.quote}&quot;</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 pt-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

