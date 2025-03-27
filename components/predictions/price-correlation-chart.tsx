"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

type PriceCorrelationChartProps = {
  region: string
  commodities: string[]
  weatherMetric: "temperature" | "precipitation" | "wind" | "humidity"
}

// Generate correlation data between weather and commodity prices
type CorrelationData = {
  commodity: string
  weatherValue: number
  priceChange: number
  z: number
}

const generateCorrelationData = (commodities: string[], region: string, weatherMetric: string): CorrelationData[] => {
  const data: CorrelationData[] = []

  // Generate 20 data points per commodity
  commodities.forEach((commodity) => {
    for (let i = 0; i < 20; i++) {
      // Base correlation patterns by commodity and weather type
      let weatherValue, priceChange

      if (weatherMetric === "temperature") {
        // Temperature correlations
        if (commodity === "wheat" || commodity === "corn" || commodity === "soybeans") {
          // Negative correlation - higher temps can reduce yield
          weatherValue = 15 + Math.random() * 20
          priceChange = 5 - (weatherValue - 15) * 0.4 + (Math.random() * 4 - 2)
        } else if (commodity === "natural-gas") {
          // Negative correlation - higher temps reduce heating demand
          weatherValue = 10 + Math.random() * 25
          priceChange = 15 - weatherValue * 0.5 + (Math.random() * 5 - 2.5)
        } else {
          // Weak correlation for other commodities
          weatherValue = 15 + Math.random() * 20
          priceChange = Math.random() * 10 - 5
        }
      } else if (weatherMetric === "precipitation") {
        // Precipitation correlations
        if (commodity === "wheat" || commodity === "corn" || commodity === "soybeans" || commodity === "rice") {
          // Initially positive then negative - moderate rain good, too much bad
          weatherValue = Math.random() * 50
          priceChange = -8 + Math.abs(weatherValue - 25) * 0.3 + (Math.random() * 4 - 2)
        } else if (commodity === "coffee" || commodity === "cocoa") {
          // Positive correlation - more rain can boost production
          weatherValue = Math.random() * 40
          priceChange = 5 - weatherValue * 0.2 + (Math.random() * 4 - 2)
        } else {
          // Weak correlation for other commodities
          weatherValue = Math.random() * 40
          priceChange = Math.random() * 8 - 4
        }
      } else {
        // Wind or humidity - weaker correlations
        weatherValue = Math.random() * 30
        priceChange = Math.random() * 10 - 5
      }

      data.push({
        commodity,
        weatherValue: Number.parseFloat(weatherValue.toFixed(1)),
        priceChange: Number.parseFloat(priceChange.toFixed(1)),
        // Size of dots can represent volume or confidence
        z: 50 + Math.random() * 200,
      })
    }
  })

  return data
}

export default function PriceCorrelationChart({ region, commodities, weatherMetric }: PriceCorrelationChartProps) {
  const data = generateCorrelationData(commodities, region, weatherMetric)

  // Color mapping for commodities
  const commodityColors: Record<string, string> = {
    wheat: "hsl(var(--chart-1))",
    corn: "hsl(var(--chart-2))",
    "natural-gas": "hsl(var(--chart-3))",
    soybeans: "hsl(var(--chart-4))",
    coffee: "hsl(var(--chart-5))",
    sugar: "hsl(var(--chart-6))",
    rice: "hsl(var(--chart-7))",
    "palm-oil": "hsl(var(--chart-8))",
    cocoa: "hsl(var(--chart-9))",
  }

  // Create config object for ChartContainer
  const chartConfig: Record<string, { label: string; color: string }> = {}
  commodities.forEach((commodity) => {
    chartConfig[commodity] = {
      label: commodity.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      color: commodityColors[commodity] || "hsl(var(--chart-1))",
    }
  })

  // Weather metric labels
  const metricLabel =
    weatherMetric === "temperature"
      ? "Temperature (°C)"
      : weatherMetric === "precipitation"
        ? "Precipitation (mm)"
        : weatherMetric === "wind"
          ? "Wind Speed (km/h)"
          : "Humidity (%)"

  // Custom tooltip formatter
  const tooltipFormatter = (value: unknown, name: unknown): [React.ReactNode, string] => {
    if (name === "weatherValue") return [value as React.ReactNode, metricLabel]
    if (name === "priceChange") return [`${value}%` as React.ReactNode, "Price Change"]
    return [value as React.ReactNode, name as string]
  }

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="weatherValue"
            name={metricLabel}
            label={{ value: metricLabel, position: "insideBottom", offset: -5 }}
          />
          <YAxis
            type="number"
            dataKey="priceChange"
            name="Price Change %"
            label={{ value: "Price Change %", angle: -90, position: "insideLeft" }}
          />
          <ZAxis type="number" dataKey="z" range={[50, 350]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={tooltipFormatter} />

          {commodities.map((commodity) => (
            <Scatter
              key={commodity}
              name={commodity.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              data={data.filter((item) => item.commodity === commodity)}
              fill={commodityColors[commodity] || "hsl(var(--chart-1))"}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

