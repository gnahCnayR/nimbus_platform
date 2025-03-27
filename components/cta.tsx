import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your trading strategy?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join leading commodities traders who use our weather intelligence platform to gain a competitive edge.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

