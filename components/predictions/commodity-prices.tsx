"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type CommodityPricesProps = {
  region: string
  commodities: string[]
  timeRange: string
}

// Generate mock price data based on commodity and region
const generatePriceData = (commodities: string[], region: string, days: number) => {
  const data = []
  const today = new Date()

  // Base prices for each commodity
  const basePrices: Record<string, number> = {
    wheat: 750,
    corn: 590,
    "natural-gas": 2.8,
    soybeans: 1420,
    coffee: 185,
    sugar: 20,
    rice: 18,
    "palm-oil": 950,
    cocoa: 3500,
  }

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - days + i)

    const entry: Record<string, unknown> = {
      date: date.toLocaleDateString(),
    }

    // Add price for each commodity with some randomness and trends
    commodities.forEach((commodity) => {
      const basePrice = basePrices[commodity] || 100

      // Create some price variations by region
      let regionMultiplier = 1.0
      if (region === "north-america" && commodity === "wheat") regionMultiplier = 1.05
      else if (region === "south-america" && commodity === "coffee") regionMultiplier = 0.95
      else if (region === "europe" && commodity === "natural-gas") regionMultiplier = 1.1
      else if (region === "asia-pacific" && commodity === "rice") regionMultiplier = 0.98
      else if (region === "africa" && commodity === "cocoa") regionMultiplier = 1.02

      // Add volatility
      const volatility = commodity === "natural-gas" ? 0.06 : 0.03

      // Create price trend
      const trend = Math.sin(i / (days / 5)) * volatility * basePrice
      const randomness = (Math.random() * volatility - volatility / 2) * basePrice

      const price = (basePrice + trend + randomness) * regionMultiplier
      entry[commodity] = Number.parseFloat(price.toFixed(2))
    })

    data.push(entry)
  }

  return data
}

export default function CommodityPrices({ region, commodities, timeRange }: CommodityPricesProps) {
  // Determine number of days based on timeRange
  const days = timeRange === "7days" ? 7 : timeRange === "14days" ? 14 : timeRange === "30days" ? 30 : 90

  const data = generatePriceData(commodities, region, days)

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

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />

          {commodities.map((commodity) => (
            <Line
              key={commodity}
              type="monotone"
              dataKey={commodity}
              stroke={`var(--color-${commodity})`}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

