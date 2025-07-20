"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Wind, Gauge, Activity, ToggleLeft, ToggleRight, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { fetchMarsWeatherData, convertToRegionData, getFallbackData, type ProcessedMarsData } from "@/lib/nasa-mars-api"
import MarsGlobe from "@/components/mars/mars-globe"

export default function MarsDashboard() {
  const [marsRegions, setMarsRegions] = useState<ProcessedMarsData[]>(getFallbackData())
  const [selectedRegion, setSelectedRegion] = useState<ProcessedMarsData | null>(null)
  const [tempUnit, setTempUnit] = useState<"celsius" | "kelvin">("celsius")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)


  const fetchWeatherData = async () => {
    setIsLoading(true)
    try {
      const nasaData = await fetchMarsWeatherData()
      const processedData = convertToRegionData(nasaData)
      setMarsRegions(processedData)
      setIsOnline(true)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch Mars weather data:", error)
      setIsOnline(false)

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log("Mars Regions Data:", marsRegions)
    console.log("Historical Data Sample:", marsRegions[0]?.historicalData)
  }, [marsRegions])

  useEffect(() => {

    fetchWeatherData()


    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000)

  
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])

  const convertTemp = (celsius: number) => {
    return tempUnit === "kelvin" ? celsius + 273.15 : celsius
  }

  const formatTemp = (temp: number) => {
    const converted = convertTemp(temp)
    return `${converted.toFixed(1)}°${tempUnit === "kelvin" ? "K" : "C"}`
  }

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30"
  }

  const getStatusIcon = (status: string) => {
    return status === "active" ? (
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
    ) : (
      <div className="w-2 h-2 bg-red-400 rounded-full" />
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 border-b border-slate-800/50"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mars Weather Analytics
              </h1>
              {isOnline ? <Wifi className="w-5 h-5 text-emerald-400" /> : <WifiOff className="w-5 h-5 text-red-400" />}
            </div>
            <p className="text-slate-400 text-sm md:text-base">
              <span suppressHydrationWarning>
                Sol {Math.floor(Date.now() / 86400000) - 19000} • {currentTime.toLocaleTimeString()}
                {lastUpdated && <span className="ml-2 text-xs">• Updated: {lastUpdated.toLocaleTimeString()}</span>}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchWeatherData}
              disabled={isLoading}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating..." : "Refresh"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTempUnit(tempUnit === "celsius" ? "kelvin" : "celsius")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              {tempUnit === "celsius" ? (
                <ToggleLeft className="w-4 h-4 mr-2" />
              ) : (
                <ToggleRight className="w-4 h-4 mr-2" />
              )}
              {tempUnit === "celsius" ? "°C" : "°K"}
            </Button>
          </div>
        </div>
      </motion.header>

     
      <main className="p-4 md:p-6">

        <div className="lg:hidden space-y-4">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-[300px]"
          >
            <Card className="h-full bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm border-slate-700/50 overflow-hidden relative group">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-white mb-1">Mars Global Overview</h2>
                      <p className="text-slate-400 text-xs">{isOnline ? "Live NASA InSight data" : "Offline mode"}</p>
                    </div>
                    {!isOnline && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        API Offline
                      </Badge>
                    )}
                  </div>
                </div>

            
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-2 justify-center items-center flex h-full">
                   <MarsGlobe scale={1}/>
                  
                  </div>
                </div>

         
                <div className="p-4 pt-2 border-t border-slate-700/50">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-emerald-400">
                        {marsRegions.filter((r) => r.status === "active").length}
                      </div>
                      <div className="text-xs text-slate-400">Active</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-red-400">
                        {marsRegions.filter((r) => r.status === "inactive").length}
                      </div>
                      <div className="text-xs text-slate-400">Offline</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

     
          <div className="grid grid-cols-2 gap-3">
            {marsRegions.map((region, index) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full bg-slate-900/30 backdrop-blur-sm border-slate-800/50 hover:border-slate-700/50 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/20 group-hover:to-slate-900/40 transition-all duration-300"></div>

                      <CardHeader className="pb-2 relative z-10 p-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {region.name.replace(" Crater", "").replace(" Mons", "").replace(" Planitia", "")}
                          </CardTitle>
                          <Badge className={`${getStatusColor(region.status)} border text-xs scale-75`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(region.status)}
                              {region.status === "active" ? "LIVE" : "OFF"}
                            </div>
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-2 relative z-10 p-3 pt-0">

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <Thermometer className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-xs text-slate-300">Temp</span>
                          </div>
                          <span className="text-sm font-bold text-white">{formatTemp(region.temperature)}</span>
                        </div>

        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <Gauge className="w-3 h-3 text-purple-400" />
                            </div>
                            <span className="text-xs text-slate-300">Press</span>
                          </div>
                          <span className="text-xs font-bold text-white">{region.pressure}</span>
                        </div>

        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                              <Wind className="w-3 h-3 text-cyan-400" />
                            </div>
                            <span className="text-xs text-slate-300">Wind</span>
                          </div>
                          <span className="text-xs font-bold text-white">{region.windSpeed}</span>
                        </div>

       
                        <div className="h-8 mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={region.historicalData}>
                              <Line
                                type="monotone"
                                dataKey="temp"
                                stroke={region.status === "active" ? "#60a5fa" : "#64748b"}
                                strokeWidth={1.5}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>

                      {region.status === "inactive" && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-20">
                          <div className="text-center">
                            <Activity className="w-4 h-4 text-red-400 mx-auto mb-1 opacity-50" />
                            <p className="text-xs text-red-400">Offline</p>
                          </div>
                        </div>
                      )}
                    </Card>
                  </DialogTrigger>


                  <DialogContent className="max-w-[95vw] max-h-[90vh] bg-[#0b0f1a] border-slate-800 overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-lg text-white flex items-center gap-2">
                        {region.name}
                        <Badge className={`${getStatusColor(region.status)} border text-xs ml-2`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(region.status)}
                            {region.status === "active" ? "LIVE DATA" : "OFFLINE"}
                          </div>
                        </Badge>
                      </DialogTitle>
                      <p className="text-sm text-slate-400">
                        {region.description} • Season: {region.season}
                      </p>
                    </DialogHeader>

                    <div className="grid grid-cols-1 gap-4 mt-4">
        
                      <div className="space-y-3">
                        <h3 className="text-base font-semibold text-white">Current Conditions</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                            <div className="flex items-center gap-3">
                              <Thermometer className="w-5 h-5 text-blue-400" />
                              <div>
                                <p className="text-xs text-slate-400">Temperature</p>
                                <p className="text-lg font-bold text-white">{formatTemp(region.temperature)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                            <div className="flex items-center gap-3">
                              <Gauge className="w-5 h-5 text-purple-400" />
                              <div>
                                <p className="text-xs text-slate-400">Atmospheric Pressure</p>
                                <p className="text-lg font-bold text-white">{region.pressure} Pa</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                            <div className="flex items-center gap-3">
                              <Wind className="w-5 h-5 text-cyan-400" />
                              <div>
                                <p className="text-xs text-slate-400">Wind Speed</p>
                                <p className="text-lg font-bold text-white">{region.windSpeed} m/s</p>
                                {region.windDirection && (
                                  <p className="text-xs text-slate-500">Direction: {region.windDirection}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

            
                      <div className="space-y-3">
                        <h3 className="text-base font-semibold text-white">Recent Sol Trends</h3>
                        <div className="w-full h-48 bg-slate-900/30 rounded-lg border border-slate-800/50 p-3">
                          <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={region.historicalData}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis
                                  dataKey="time"
                                  stroke="#64748b"
                                  fontSize={11}
                                  tick={{ fill: "#64748b" }}
                                  axisLine={{ stroke: "#64748b" }}
                                />
                                <YAxis
                                  stroke="#64748b"
                                  fontSize={11}
                                  tick={{ fill: "#64748b" }}
                                  axisLine={{ stroke: "#64748b" }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="temp"
                                  stroke="#60a5fa"
                                  strokeWidth={2}
                                  dot={{ fill: "#60a5fa", strokeWidth: 0, r: 3 }}
                                  activeDot={{ r: 5, fill: "#60a5fa", stroke: "#1e40af", strokeWidth: 2 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="wind"
                                  stroke="#22d3ee"
                                  strokeWidth={2}
                                  dot={{ fill: "#22d3ee", strokeWidth: 0, r: 3 }}
                                  activeDot={{ r: 5, fill: "#22d3ee", stroke: "#0891b2", strokeWidth: 2 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

    
                      <div>
                        <h3 className="text-base font-semibold text-white mb-3">Pressure Analysis</h3>
                        <div className="w-full h-40 bg-slate-900/30 rounded-lg border border-slate-800/50 p-3">
                          <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={region.historicalData}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis
                                  dataKey="time"
                                  stroke="#64748b"
                                  fontSize={11}
                                  tick={{ fill: "#64748b" }}
                                  axisLine={{ stroke: "#64748b" }}
                                />
                                <YAxis
                                  stroke="#64748b"
                                  fontSize={11}
                                  tick={{ fill: "#64748b" }}
                                  axisLine={{ stroke: "#64748b" }}
                                />
                                <Bar dataKey="pressure" fill="#a855f7" radius={[3, 3, 0, 0]} opacity={0.8} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>


        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 h-[calc(100vh-140px)]">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 xl:col-span-2 lg:row-span-2 overflow-y-auto"
          >
            <Card className="h-full bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm border-slate-700/50 relative group">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">Mars Global Overview</h2>
                    {!isOnline && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">API Offline</Badge>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">
                    {isOnline
                      ? "Live NASA InSight weather data from Elysium Planitia"
                      : "Using cached data - API unavailable"}
                  </p>
                </div>

        
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-4 justify-center items-center flex h-full">
                    <MarsGlobe scale={1}/>
                  </div>
                </div>

                {/* Stats Summary - Desktop */}
                <div className="p-6 pt-4 border-t border-slate-700/50">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">
                        {marsRegions.filter((r) => r.status === "active").length}
                      </div>
                      <div className="text-xs text-slate-400">Active Stations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">
                        {marsRegions.filter((r) => r.status === "inactive").length}
                      </div>
                      <div className="text-xs text-slate-400">Offline Stations</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

   
          {marsRegions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="lg:col-span-1"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="h-full bg-slate-900/30 backdrop-blur-sm border-slate-800/50 hover:border-slate-700/50 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer group relative overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/20 group-hover:to-slate-900/40 transition-all duration-300"></div>

                    <CardHeader className="pb-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {region.name}
                          {region.id === "insight" && (
                            <span className="ml-2 text-xs text-emerald-400 font-normal">NASA</span>
                          )}
                        </CardTitle>
                        <Badge className={`${getStatusColor(region.status)} border text-xs`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(region.status)}
                            {region.status === "active" ? "LIVE" : "OFFLINE"}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{region.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-3 relative z-10">

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Thermometer className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-sm text-slate-300">Temp</span>
                        </div>
                        <span className="text-lg font-bold text-white">{formatTemp(region.temperature)}</span>
                      </div>


                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Gauge className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-sm text-slate-300">Pressure</span>
                        </div>
                        <span className="text-sm font-bold text-white">{region.pressure} Pa</span>
                      </div>

 
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <Wind className="w-4 h-4 text-cyan-400" />
                          </div>
                          <span className="text-sm text-slate-300">Wind</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">{region.windSpeed} m/s</span>
                          {region.windDirection && <div className="text-xs text-slate-400">{region.windDirection}</div>}
                        </div>
                      </div>

                      <div className="h-12 mt-3">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={region.historicalData}>
                            <Line
                              type="monotone"
                              dataKey="temp"
                              stroke={region.status === "active" ? "#60a5fa" : "#64748b"}
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>

                    {region.status === "inactive" && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-20">
                        <div className="text-center">
                          <Activity className="w-6 h-6 text-red-400 mx-auto mb-1 opacity-50" />
                          <p className="text-xs text-red-400">Station Offline</p>
                        </div>
                      </div>
                    )}
                  </Card>
                </DialogTrigger>

            
                <DialogContent className="max-w-4xl bg-[#0b0f1a] border-slate-800 max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white flex items-center gap-2">
                      {region.name}
                      {region.id === "insight" && (
                        <span className="text-sm text-emerald-400 font-normal">NASA InSight</span>
                      )}
                      <Badge className={`${getStatusColor(region.status)} border text-xs ml-2`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(region.status)}
                          {region.status === "active" ? "LIVE DATA" : "OFFLINE"}
                        </div>
                      </Badge>
                    </DialogTitle>
                    <p className="text-sm text-slate-400">
                      {region.description} • Season: {region.season}
                      {region.lastUpdated && (
                        <span className="ml-2">• Last updated: {new Date(region.lastUpdated).toLocaleString()}</span>
                      )}
                    </p>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Current Conditions</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Thermometer className="w-6 h-6 text-blue-400" />
                            <div>
                              <p className="text-sm text-slate-400">Temperature</p>
                              <p className="text-2xl font-bold text-white">{formatTemp(region.temperature)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Gauge className="w-6 h-6 text-purple-400" />
                            <div>
                              <p className="text-sm text-slate-400">Atmospheric Pressure</p>
                              <p className="text-2xl font-bold text-white">{region.pressure} Pa</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Wind className="w-6 h-6 text-cyan-400" />
                            <div>
                              <p className="text-sm text-slate-400">Wind Speed</p>
                              <p className="text-2xl font-bold text-white">{region.windSpeed} m/s</p>
                              {region.windDirection && (
                                <p className="text-sm text-slate-500">Direction: {region.windDirection}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

        
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Recent Sol Trends</h3>
                      <div className="w-full h-64 bg-slate-900/30 rounded-lg border border-slate-800/50 p-4">
                        <div className="w-full h-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={region.historicalData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                              <XAxis
                                dataKey="time"
                                stroke="#64748b"
                                fontSize={12}
                                tick={{ fill: "#64748b" }}
                                axisLine={{ stroke: "#64748b" }}
                              />
                              <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tick={{ fill: "#64748b" }}
                                axisLine={{ stroke: "#64748b" }}
                              />
                              <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="#60a5fa"
                                strokeWidth={3}
                                dot={{ fill: "#60a5fa", strokeWidth: 0, r: 4 }}
                                activeDot={{ r: 6, fill: "#60a5fa", stroke: "#1e40af", strokeWidth: 2 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="wind"
                                stroke="#22d3ee"
                                strokeWidth={3}
                                dot={{ fill: "#22d3ee", strokeWidth: 0, r: 4 }}
                                activeDot={{ r: 6, fill: "#22d3ee", stroke: "#0891b2", strokeWidth: 2 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold text-white mb-4">Pressure Analysis</h3>
                      <div className="w-full h-48 bg-slate-900/30 rounded-lg border border-slate-800/50 p-4">
                        <div className="w-full h-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={region.historicalData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                              <XAxis
                                dataKey="time"
                                stroke="#64748b"
                                fontSize={12}
                                tick={{ fill: "#64748b" }}
                                axisLine={{ stroke: "#64748b" }}
                              />
                              <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tick={{ fill: "#64748b" }}
                                axisLine={{ stroke: "#64748b" }}
                              />
                              <Bar dataKey="pressure" fill="#a855f7" radius={[4, 4, 0, 0]} opacity={0.8} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
