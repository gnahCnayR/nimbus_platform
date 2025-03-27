"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type WeatherTrendChartProps = {
  type: "temperature" | "precipitation" | "wind" | "sunshine"
  region: string
  timeRange: string
}

// Generate mock data based on region and type
const generateMockData = (type: string, region: string, days: number) => {
  const data = []
  const today = new Date()

  // Random starting values based on type and region
  let baseValue = 0

  if (type === "temperature") {
    if (region === "north-america") baseValue = 20
    else if (region === "south-america") baseValue = 25
    else if (region === "europe") baseValue = 15
    else if (region === "asia-pacific") baseValue = 28
    else if (region === "africa") baseValue = 30
  } else if (type === "precipitation") {
    if (region === "north-america") baseValue = 5
    else if (region === "south-america") baseValue = 12
    else if (region === "europe") baseValue = 8
    else if (region === "asia-pacific") baseValue = 15
    else if (region === "africa") baseValue = 3
  } else if (type === "wind") {
    if (region === "north-america") baseValue = 12
    else if (region === "south-america") baseValue = 8
    else if (region === "europe") baseValue = 15
    else if (region === "asia-pacific") baseValue = 20
    else if (region === "africa") baseValue = 10
  } else if (type === "sunshine") {
    if (region === "north-america") baseValue = 6
    else if (region === "south-america") baseValue = 8
    else if (region === "europe") baseValue = 5
    else if (region === "asia-pacific") baseValue = 7
    else if (region === "africa") baseValue = 9
  }

  const anomalyDay = Math.floor(days / 2) // Create an anomaly in the middle

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    // Generate value with some randomness and trends
    let value: number

    if (i === anomalyDay) {
      // Create an anomaly
      if (type === "temperature") value = baseValue + 8
      else if (type === "precipitation") value = baseValue + 20
      else if (type === "wind") value = baseValue + 15
      else value = baseValue - 4
    } else {
      // Normal trend with randomness
      const volatility = type === "precipitation" ? 5 : 2
      const trend = Math.sin(i / 3) * volatility
      value = baseValue + trend + (Math.random() * volatility - volatility / 2)
    }

    // Historical average for comparison
    let historicalAvg: number
    if (type === "temperature") historicalAvg = baseValue - 1 + Math.sin(i / 5) * 1.5
    else if (type === "precipitation") historicalAvg = baseValue - 2 + Math.sin(i / 4) * 3
    else if (type === "wind") historicalAvg = baseValue + Math.sin(i / 3) * 2
    else historicalAvg = baseValue - 0.5 + Math.sin(i / 6) * 1

    data.push({
      date: date.toLocaleDateString(),
      value: Math.max(0, parseFloat(value.toFixed(1))),
      historicalAvg: historicalAvg.toFixed(1),
    })
  }

  return data
}

export default function WeatherTrendChart({ type, region, timeRange }: WeatherTrendChartProps) {
  // Determine number of days based on timeRange
  const days = timeRange === "7days" ? 7 : timeRange === "14days" ? 14 : timeRange === "30days" ? 30 : 90

  const data = generateMockData(type, region, days)

  // Configure chart based on weather type
  let yAxisLabel = ""
  let color = ""
  let historicalColor = ""
  let referenceLine = null

  if (type === "temperature") {
    yAxisLabel = "Temperature (°C)"
    color = "hsl(var(--chart-1))"
    historicalColor = "hsl(var(--chart-2))"
    referenceLine = <ReferenceLine y={30} stroke="red" strokeDasharray="3 3" />
  } else if (type === "precipitation") {
    yAxisLabel = "Rainfall (mm)"
    color = "hsl(var(--chart-2))"
    historicalColor = "hsl(var(--chart-4))"
  } else if (type === "wind") {
    yAxisLabel = "Wind Speed (km/h)"
    color = "hsl(var(--chart-3))"
    historicalColor = "hsl(var(--chart-4))"
    referenceLine = <ReferenceLine y={25} stroke="orange" strokeDasharray="3 3" label="Storm Warning" />
  } else if (type === "sunshine") {
    yAxisLabel = "Sunshine Hours"
    color = "hsl(var(--chart-5))"
    historicalColor = "hsl(var(--chart-6))"
  }

  return (
    <ChartContainer
      config={{
        value: {
          label: "Forecast",
          color: color,
        },
        historicalAvg: {
          label: "Historical Average",
          color: historicalColor,
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Forecast"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={{ stroke: "var(--color-value)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="historicalAvg"
            name="Historical Average"
            stroke="var(--color-historicalAvg)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          {referenceLine}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

