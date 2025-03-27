"use client"

import { useState } from "react"
import {
  Cloud,
  Filter,
  MapPin,
  Calendar,
  ChevronDown,
  RefreshCw,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CommodityPrices from "@/components/predictions/commodity-prices"
import WeatherTrendChart from "@/components/predictions/weather-trend-chart"
import PriceCorrelationChart from "@/components/predictions/price-correlation-chart"
import MiniGlobe from "@/components/predictions/mini-globe"

import Link from "next/link"

// Types for our data
type Region = {
  id: string
  name: string
  coordinates: [number, number] // [latitude, longitude]
  commodities: string[]
}

type TimeRange = "7days" | "14days" | "30days" | "3months"

type WeatherMetric = "temperature" | "precipitation" | "wind" | "humidity" | "all"

export default function Predictions() {
  const [selectedRegion, setSelectedRegion] = useState<string>("north-america")
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("14days")
  const [selectedMetric, setSelectedMetric] = useState<WeatherMetric>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Available regions
  const regions: Region[] = [
    {
      id: "north-america",
      name: "North America",
      coordinates: [40, -100],
      commodities: ["wheat", "corn", "natural-gas"],
    },
    {
      id: "south-america",
      name: "South America",
      coordinates: [-15, -60],
      commodities: ["soybeans", "coffee", "sugar"],
    },
    {
      id: "europe",
      name: "Europe",
      coordinates: [50, 10],
      commodities: ["wheat", "natural-gas", "corn"],
    },
    {
      id: "asia-pacific",
      name: "Asia Pacific",
      coordinates: [30, 100],
      commodities: ["rice", "palm-oil", "natural-gas"],
    },
    {
      id: "africa",
      name: "Africa",
      coordinates: [0, 20],
      commodities: ["cocoa", "coffee", "wheat"],
    },
  ]

  // Find the currently selected region object
  const currentRegion = regions.find((region) => region.id === selectedRegion) || regions[0]

  // Mock function to refresh data
  const refreshData = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-950 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
                WeatherTrade
              </Link>
              <nav className="ml-10 hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Home
                </Link>
                <Link
                  href="/predictions"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-0.5"
                >
                  Predictions
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Analytics
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Reports
                </Link>
              </nav>
            </div>

            <div className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2">
                Help
              </Button>
              <Button size="sm">Account</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Weather Predictions & Market Impact
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Last updated: {lastUpdated.toLocaleString()}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <Button variant="outline" className="mr-2" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
            <Button>Export Report</Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-slate-500 mr-2" />
                <span className="font-medium">Filters:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                {/* Region Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-between">
                      <MapPin className="h-4 w-4 mr-2" />
                      {currentRegion.name}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {regions.map((region) => (
                      <DropdownMenuItem key={region.id} onClick={() => setSelectedRegion(region.id)}>
                        {region.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Time Range Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-between">
                      <Calendar className="h-4 w-4 mr-2" />
                      {selectedTimeRange === "7days" && "7 Days"}
                      {selectedTimeRange === "14days" && "14 Days"}
                      {selectedTimeRange === "30days" && "30 Days"}
                      {selectedTimeRange === "3months" && "3 Months"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange("7days")}>7 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange("14days")}>14 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange("30days")}>30 Days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange("3months")}>3 Months</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Weather Metric Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-between">
                      <Cloud className="h-4 w-4 mr-2" />
                      {selectedMetric === "all" && "All Metrics"}
                      {selectedMetric === "temperature" && "Temperature"}
                      {selectedMetric === "precipitation" && "Precipitation"}
                      {selectedMetric === "wind" && "Wind"}
                      {selectedMetric === "humidity" && "Humidity"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedMetric("all")}>All Metrics</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMetric("temperature")}>Temperature</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMetric("precipitation")}>
                      Precipitation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMetric("wind")}>Wind</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMetric("humidity")}>Humidity</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="w-full sm:w-64">
                <Input placeholder="Search regions or commodities..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Region Info and Map */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  {currentRegion.name}
                </CardTitle>
                <CardDescription>Weather prediction and key commodities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full relative mb-4">
                  <MiniGlobe latitude={currentRegion.coordinates[0]} longitude={currentRegion.coordinates[1]} />
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="font-medium">Key Commodities:</div>
                  <div className="flex flex-wrap gap-2">
                    {currentRegion.commodities.map((commodity) => (
                      <Badge key={commodity} variant="secondary" className="capitalize">
                        {commodity.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Weather Alerts
                </CardTitle>
                <CardDescription>Critical events affecting the region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentRegion.id === "north-america" && (
                    <>
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                        <div className="font-medium text-red-700 dark:text-red-400 mb-1">Drought Warning</div>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Severe drought conditions expected in Midwest wheat belt over next 14 days.
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                        <div className="font-medium text-amber-700 dark:text-amber-400 mb-1">Heat Wave</div>
                        <p className="text-sm text-amber-600 dark:text-amber-300">
                          Above-average temperatures in the corn belt could impact yields.
                        </p>
                      </div>
                    </>
                  )}

                  {currentRegion.id === "south-america" && (
                    <>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                        <div className="font-medium text-blue-700 dark:text-blue-400 mb-1">Heavy Rainfall</div>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          Above-average rainfall in Brazil&apos;s coffee-growing regions over next 7 days.
                        </p>
                      </div>
                    </>
                  )}

                  {currentRegion.id === "europe" && (
                    <>
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
                        <div className="font-medium text-amber-700 dark:text-amber-400 mb-1">Temperature Anomaly</div>
                        <p className="text-sm text-amber-600 dark:text-amber-300">
                          Unusually warm winter may affect natural gas demand in Central Europe.
                        </p>
                      </div>
                    </>
                  )}

                  {currentRegion.id === "asia-pacific" && (
                    <>
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                        <div className="font-medium text-blue-700 dark:text-blue-400 mb-1">Monsoon Pattern</div>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          Early monsoon arrival predicted for Southeast Asia rice-growing regions.
                        </p>
                      </div>
                    </>
                  )}

                  {currentRegion.id === "africa" && (
                    <>
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                        <div className="font-medium text-red-700 dark:text-red-400 mb-1">Drought Risk</div>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Extended dry period forecasted for cocoa-growing regions in West Africa.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Weather Metrics and Charts */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">14-Day Weather Forecast</CardTitle>
                <CardDescription>Key metrics for {currentRegion.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="temperature">
                  <TabsList className="mb-4">
                    <TabsTrigger value="temperature">
                      <Thermometer className="h-4 w-4 mr-2" />
                      Temperature
                    </TabsTrigger>
                    <TabsTrigger value="precipitation">
                      <Droplets className="h-4 w-4 mr-2" />
                      Precipitation
                    </TabsTrigger>
                    <TabsTrigger value="wind">
                      <Wind className="h-4 w-4 mr-2" />
                      Wind
                    </TabsTrigger>
                    <TabsTrigger value="sunshine">
                      <Sun className="h-4 w-4 mr-2" />
                      Sunshine
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="temperature" className="h-[350px]">
                    <WeatherTrendChart type="temperature" region={currentRegion.id} timeRange={selectedTimeRange} />
                  </TabsContent>

                  <TabsContent value="precipitation" className="h-[350px]">
                    <WeatherTrendChart type="precipitation" region={currentRegion.id} timeRange={selectedTimeRange} />
                  </TabsContent>

                  <TabsContent value="wind" className="h-[350px]">
                    <WeatherTrendChart type="wind" region={currentRegion.id} timeRange={selectedTimeRange} />
                  </TabsContent>

                  <TabsContent value="sunshine" className="h-[350px]">
                    <WeatherTrendChart type="sunshine" region={currentRegion.id} timeRange={selectedTimeRange} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
              {/* Commodity Price Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Commodity Prices</CardTitle>
                  <CardDescription>Market trends for key commodities</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <CommodityPrices
                    region={currentRegion.id}
                    commodities={currentRegion.commodities}
                    timeRange={selectedTimeRange}
                  />
                </CardContent>
              </Card>

              {/* Weather-Price Correlation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Weather-Price Correlation</CardTitle>
                  <CardDescription>How weather affects commodity prices</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <PriceCorrelationChart
                    region={currentRegion.id}
                    commodities={currentRegion.commodities}
                    weatherMetric={selectedMetric === "all" ? "temperature" : selectedMetric}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

