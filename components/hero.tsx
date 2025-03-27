"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Globe from "@/components/globe"

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative overflow-hidden">
      {/* Navigation */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">WeatherTrade</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link
                  href="#features"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Features
                </Link>
                <Link
                  href="/predictions"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Predictions
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Pricing
                </Link>
                <Button variant="outline" className="ml-8">
                  Log in
                </Button>
                <Button>Sign up</Button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="#features"
                  className="text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Features
                </Link>
                <Link
                  href="/predictions"
                  className="text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Predictions
                </Link>
                <Link
                  href="#testimonials"
                  className="text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-base font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Pricing
                </Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                  <Button className="w-full">Sign up</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-0 pt-8 pb-16 sm:pb-20 md:pt-12 lg:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Weather Intelligence for</span>
              <span className="block text-blue-600 dark:text-blue-500">Smarter Trading</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
              Advanced weather modeling and analytics to optimize your commodities trading strategies and reduce
              climate-related risks.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Button size="lg" className="w-full">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Live demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Globe visualization */}
        <div className="relative mt-12 h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
          <Globe />
        </div>
      </div>
    </div>
  )
}

