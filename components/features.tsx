import { Cloud, BarChart3, Compass, Droplets, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: <Cloud className="h-10 w-10 text-blue-500" />,
      title: "Advanced Weather Modeling",
      description:
        "High-resolution global weather forecasts with up to 15-day predictions for informed trading decisions.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
      title: "Market Impact Analysis",
      description: "Analyze how weather events correlate with commodity price movements across global markets.",
    },
    {
      icon: <Compass className="h-10 w-10 text-blue-500" />,
      title: "Geospatial Intelligence",
      description: "Visualize weather patterns and their potential impact on agricultural regions and shipping routes.",
    },
    {
      icon: <Droplets className="h-10 w-10 text-blue-500" />,
      title: "Precipitation Forecasting",
      description:
        "Accurate rainfall and snowfall predictions to anticipate agricultural yields and water resource availability.",
    },
    {
      icon: <Thermometer className="h-10 w-10 text-blue-500" />,
      title: "Temperature Anomalies",
      description: "Track temperature deviations from historical norms to identify potential market disruptions.",
    },
    {
      icon: <Wind className="h-10 w-10 text-blue-500" />,
      title: "Extreme Weather Alerts",
      description: "Real-time notifications for hurricanes, floods, and droughts that may impact commodity supplies.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Weather Intelligence for Smarter Trading
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Our platform combines meteorological data with market analytics to give you the edge in commodities trading.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg dark:bg-slate-800">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

