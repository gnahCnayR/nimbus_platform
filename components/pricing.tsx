import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      description: "Essential weather data for small trading operations",
      features: [
        "Global weather forecasts (7-day)",
        "Basic market correlation analysis",
        "Daily email reports",
        "Web dashboard access",
        "5 commodity categories",
      ],
    },
    {
      name: "Professional",
      price: "$799",
      description: "Advanced analytics for serious traders",
      features: [
        "Extended forecasts (15-day)",
        "Advanced market impact analysis",
        "Real-time alerts",
        "API access",
        "Historical data (5 years)",
        "All commodity categories",
        "Custom report builder",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-suite solution for trading firms",
      features: [
        "All Professional features",
        "Custom forecast models",
        "Dedicated account manager",
        "White-label options",
        "Advanced API (unlimited calls)",
        "Historical data (20+ years)",
        "Custom integration support",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Choose the right plan for your trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-0 shadow-lg ${plan.highlighted ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""} dark:bg-slate-800`}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1 text-xl font-semibold">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="ml-3 text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.highlighted ? "default" : "outline"} className="w-full">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

