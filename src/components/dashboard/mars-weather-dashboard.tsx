"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RefreshCcw, Wifi, Thermometer, Wind, Gauge, MapPin, TrendingUp, Activity } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import MarsGlobe from "./mars-globe"
import DetailedDataView from "./detailed-data-view"

interface RegionData {
  id: string
  name: string
  temperature: number
  pressure: number
  windSpeed: number
  status: "active" | "inactive"
  coordinates: { lat: number; lng: number }
  lastUpdate: string
  historicalData: Array<{
    time: string
    temperature: number
    pressure: number
    windSpeed: number
  }>
}

const mockRegionsData: RegionData[] = [
  {
    id: "jezero",
    name: "Jezero Crater",
    temperature: -63,
    pressure: 610,
    windSpeed: 12.5,
    status: "active",
    coordinates: { lat: 18.4, lng: 77.5 },
    lastUpdate: "2 mins ago",
    historicalData: [
      { time: "00:00", temperature: -65, pressure: 605, windSpeed: 11.2 },
      { time: "06:00", temperature: -68, pressure: 608, windSpeed: 13.1 },
      { time: "12:00", temperature: -63, pressure: 610, windSpeed: 12.5 },
      { time: "18:00", temperature: -61, pressure: 612, windSpeed: 14.8 },
    ],
  },
  {
    id: "gale",
    name: "Gale Crater",
    temperature: -58,
    pressure: 750,
    windSpeed: 8.3,
    status: "active",
    coordinates: { lat: -5.4, lng: 137.8 },
    lastUpdate: "5 mins ago",
    historicalData: [
      { time: "00:00", temperature: -62, pressure: 745, windSpeed: 7.8 },
      { time: "06:00", temperature: -60, pressure: 748, windSpeed: 9.2 },
      { time: "12:00", temperature: -58, pressure: 750, windSpeed: 8.3 },
      { time: "18:00", temperature: -56, pressure: 752, windSpeed: 10.1 },
    ],
  },
  {
    id: "olympus",
    name: "Olympus Mons",
    temperature: -89,
    pressure: 120,
    windSpeed: 25.7,
    status: "inactive",
    coordinates: { lat: 18.6, lng: -133.8 },
    lastUpdate: "2 hours ago",
    historicalData: [
      { time: "00:00", temperature: -91, pressure: 118, windSpeed: 24.2 },
      { time: "06:00", temperature: -90, pressure: 119, windSpeed: 26.3 },
      { time: "12:00", temperature: -89, pressure: 120, windSpeed: 25.7 },
      { time: "18:00", temperature: -87, pressure: 122, windSpeed: 27.9 },
    ],
  },
  {
    id: "valles",
    name: "Valles Marineris",
    temperature: -45,
    pressure: 890,
    windSpeed: 15.2,
    status: "active",
    coordinates: { lat: -14.0, lng: -59.2 },
    lastUpdate: "1 min ago",
    historicalData: [
      { time: "00:00", temperature: -48, pressure: 885, windSpeed: 14.1 },
      { time: "06:00", temperature: -47, pressure: 887, windSpeed: 16.3 },
      { time: "12:00", temperature: -45, pressure: 890, windSpeed: 15.2 },
      { time: "18:00", temperature: -43, pressure: 892, windSpeed: 17.8 },
    ],
  },
]

export default function MarsWeatherDashboard() {
  const [currentTime, setCurrentTime] = useState("")
  const [lastUpdate, setLastUpdate] = useState("21 Jul 2025, 11:44 AM")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null)
  const [tempUnit, setTempUnit] = useState<"celsius" | "kelvin">("celsius")
  const [regionsData, setRegionsData] = useState<RegionData[]>(mockRegionsData)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      })
      setCurrentTime(time)
    }
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastUpdate(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }),
      )
      setIsRefreshing(false)
    }, 1500)
  }

  const convertTemperature = (temp: number) => {
    return tempUnit === "kelvin" ? temp + 273.15 : temp
  }

  const getTemperatureUnit = () => (tempUnit === "kelvin" ? "K" : "°C")

  const activeRegions = regionsData.filter((region) => region.status === "active").length

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white overflow-auto">
      <div className="flex min-h-screen flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:p-6 pb-safe">
        {/* Header - Enhanced Typography */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="group relative w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]">
            <div className="pointer-events-none absolute inset-0 z-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
            <CardContent className="relative z-10 flex flex-col sm:flex-row w-full items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 gap-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide bg-gradient-to-r from-[#66fcf1] via-teal-300 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite]">
                  Mars Weather
                </h1>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse" />
                  <Badge
                    variant="outline"
                    className="border-[#66fcf1]/50 text-[#66fcf1] bg-[#66fcf1]/10 text-sm md:text-base px-3 py-1"
                  >
                    {activeRegions}/4 Active
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setTempUnit(tempUnit === "celsius" ? "kelvin" : "celsius")}
                  className="border-[#66fcf1]/70 text-[#66fcf1] hover:bg-[#66fcf1]/20 hover:text-white bg-[#66fcf1]/10 font-medium transition-all duration-200 text-base px-4 py-2"
                >
                  {tempUnit === "celsius" ? "°C" : "K"}
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="flex items-center gap-2 bg-[#66fcf1]/20 text-[#66fcf1] hover:bg-[#66fcf1]/30 transition text-base px-4 py-2"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCcw className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <div className="flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:flex-1 lg:max-w-lg order-2 lg:order-1"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group relative h-64 sm:h-80 lg:h-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)] cursor-pointer">
                  <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40" />
                  <CardContent className="relative flex h-full items-center justify-center p-4 sm:p-6">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="w-full h-full min-h-[200px] sm:min-h-[250px]">
                        <MarsGlobe width="100%" height="100%" scale={1} />
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-[#66fcf1] mt-2 sm:mt-3 opacity-70 animate-pulse text-center font-medium">
                        Click to explore regions
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="w-full h-full sm:max-w-[90vw] lg:max-w-[80vw] max-h-[90vh] bg-[#0b0f1a]/95 border-[#66fcf1]/30 rounded-xl overflow-hidden p-0 m-0">
                <DialogHeader className="p-8 pb-6">
                  <DialogTitle className="text-[#66fcf1] text-2xl sm:text-3xl md:text-4xl font-bold">
                    Mars Surface Exploration
                  </DialogTitle>
                </DialogHeader>
                <div className="h-[calc(95vh-120px)] w-full px-8 pb-8">
                  <MarsGlobe width="100%" height="100%" scale={1} />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
              {regionsData.map((region, index) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <Dialog>
                    <DialogTrigger asChild> 
                      <Card
                        className={`group relative h-full rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer ${
                          region.status === "active"
                            ? "border-[#66fcf1]/30 bg-white/5 hover:shadow-[0_0_20px_4px_rgba(102,252,241,0.3)]"
                            : "border-gray-600/30 bg-white/2 hover:shadow-[0_0_10px_2px_rgba(128,128,128,0.2)]"
                        } backdrop-blur-md shadow-lg`}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                            region.status === "active"
                              ? "border-[#66fcf1]/10 animate-pulse group-hover:border-[#66fcf1]/40"
                              : "border-gray-600/10 group-hover:border-gray-500/30"
                          }`}
                        />
                        <CardContent className="relative z-10 p-4 sm:p-5 md:p-6 h-full flex flex-col justify-between">
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <MapPin
                                  className={`h-4 w-4 sm:h-5 sm:w-5 ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-400"}`}
                                />
                                <h3
                                  className={`font-semibold text-sm sm:text-base md:text-lg ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-300"}`}
                                >
                                  {region.name}
                                </h3>
                              </div>
                              <Badge
                                variant={region.status === "active" ? "default" : "secondary"}
                                className={`text-xs sm:text-sm px-2 py-1 ${
                                  region.status === "active"
                                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                                    : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                                }`}
                              >
                                {region.status === "active" ? (
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                                    Active
                                  </div>
                                ) : (
                                  "Inactive"
                                )}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 gap-2 sm:gap-3 text-sm md:text-base">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                                  <span className="text-gray-300 font-medium">Temperature</span>
                                </div>
                                <span
                                  className={`font-mono text-sm sm:text-base md:text-lg font-semibold ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-400"}`}
                                >
                                  {convertTemperature(region.temperature).toFixed(1)}
                                  {getTemperatureUnit()}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                                  <span className="text-gray-300 font-medium">Pressure</span>
                                </div>
                                <span
                                  className={`font-mono text-sm sm:text-base md:text-lg font-semibold ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-400"}`}
                                >
                                  {region.pressure} Pa
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                  <span className="text-gray-300 font-medium">Wind Speed</span>
                                </div>
                                <span
                                  className={`font-mono text-sm sm:text-base md:text-lg font-semibold ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-400"}`}
                                >
                                  {region.windSpeed} m/s
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-600/30">
                            <span className="text-xs sm:text-sm text-gray-400">{region.lastUpdate}</span>
                            <TrendingUp
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${region.status === "active" ? "text-[#66fcf1]" : "text-gray-400"}`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="w-full h-full sm:max-w-[90vw] lg:max-w-[80vw] max-h-[90vh] bg-[#0b0f1a]/95 border-[#66fcf1]/30 rounded-xl overflow-hidden p-0 m-0">
                      <DialogHeader className="sticky top-0 bg-[#0b0f1a]/95 p-8 pb-6 border-b border-[#66fcf1]/20 z-10">
                        <DialogTitle className="text-[#66fcf1] text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-4">
                          <MapPin className="h-8 w-8 sm:h-10 sm:w-10" />
                          {region.name} - Comprehensive Analytics
                        </DialogTitle>
                      </DialogHeader>
                      <div className="h-[calc(95vh-140px)] overflow-y-auto p-8">
                        <DetailedDataView region={region} tempUnit={tempUnit} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="w-full rounded-xl sm:rounded-2xl border border-[#66fcf1]/20 bg-white/5 backdrop-blur-md shadow-md">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 md:p-5 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 text-sm md:text-base text-[#6dede5]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#66fcf1] animate-ping" />
                  <span className="font-medium">IST: {currentTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">Last Updated: </span>
                  <span className="sm:hidden font-medium">Updated: </span>
                  <span className="font-medium">{lastUpdate}</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-[#6dede5] tracking-wide font-medium">
                Made by <span className="font-semibold text-white">AjayInsane</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
