"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, Wind, Gauge, MapPin, Clock } from "lucide-react"
import RegionChart from "./region-chart"

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

interface DetailedDataViewProps {
  region: RegionData
  tempUnit: "celsius" | "kelvin"
}

export default function DetailedDataView({ region, tempUnit }: DetailedDataViewProps) {
  const convertTemperature = (temp: number) => {
    return tempUnit === "kelvin" ? temp + 273.15 : temp
  }

  const getTemperatureUnit = () => (tempUnit === "kelvin" ? "K" : "°C")

  return (
    <div className="space-y-4 sm:space-y-6 p-2">
      {/* Overview Cards - Enhanced Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
        <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md lg:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 rounded-lg bg-orange-500/20 flex-shrink-0">
                <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-1 font-medium">Temperature</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#66fcf1] break-words">
                  {convertTemperature(region.temperature).toFixed(1)}
                  <span className="text-xl sm:text-2xl md:text-3xl ml-1">{getTemperatureUnit()}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md lg:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 flex-shrink-0">
                <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-1 font-medium">Pressure</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#66fcf1] break-words">
                  {region.pressure}
                  <span className="text-xl sm:text-2xl md:text-3xl ml-1">Pa</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md lg:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 rounded-lg bg-green-500/20 flex-shrink-0">
                <Wind className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-1 font-medium">Wind Speed</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#66fcf1] break-words">
                  {region.windSpeed}
                  <span className="text-xl sm:text-2xl md:text-3xl ml-1">m/s</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs - Fixed Styling */}
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="w-full  bg-white/10 border-[#66fcf1]/30">
          <TabsTrigger
            value="charts"
            className="data-[state=active]:bg-[#66fcf1]/20 data-[state=active]:text-[#66fcf1] text-white hover:text-[#66fcf1] text-sm sm:text-base font-medium transition-all duration-200"
          >
            Visual Data
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="data-[state=active]:bg-[#66fcf1]/20 data-[state=active]:text-[#66fcf1] text-white hover:text-[#66fcf1] text-sm sm:text-base font-medium transition-all duration-200"
          >
            Raw Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-6 sm:space-y-8 mt-6">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              <RegionChart
                data={region.historicalData}
                dataKey="temperature"
                title="Temperature Trend"
                color="#f97316"
                unit={getTemperatureUnit()}
                convertValue={convertTemperature}
              />
              <RegionChart
                data={region.historicalData}
                dataKey="pressure"
                title="Pressure Trend"
                color="#3b82f6"
                unit="Pa"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              <RegionChart
                data={region.historicalData}
                dataKey="windSpeed"
                title="Wind Speed Trend"
                color="#10b981"
                unit="m/s"
              />
              <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md">
                <CardHeader className="p-4 sm:p-6 pb-3">
                  <CardTitle className="text-[#66fcf1] flex items-center gap-2 text-base sm:text-lg md:text-xl">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                    Region Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">Status</span>
                    <Badge
                      variant={region.status === "active" ? "default" : "secondary"}
                      className={`text-sm md:text-base px-4 py-2 ${
                        region.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/50"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/50"
                      }`}
                    >
                      {region.status === "active" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                          Active
                        </div>
                      ) : (
                        "Inactive"
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">Coordinates</span>
                    <span className="font-mono text-white text-sm sm:text-base md:text-lg font-semibold">
                      {region.coordinates.lat}°, {region.coordinates.lng}°
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">Last Update</span>
                    <span className="text-white text-sm sm:text-base md:text-lg font-semibold">
                      {region.lastUpdate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-4 sm:mt-6">
          <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-[#66fcf1] flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                Historical Data
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-[#66fcf1]/30">
                      <th className="text-left p-3 text-[#66fcf1] font-semibold">Time</th>
                      <th className="text-left p-3 text-[#66fcf1] font-semibold">Temp ({getTemperatureUnit()})</th>
                      <th className="text-left p-3 text-[#66fcf1] font-semibold">Pressure (Pa)</th>
                      <th className="text-left p-3 text-[#66fcf1] font-semibold">Wind (m/s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {region.historicalData.map((data, index) => (
                      <tr key={index} className="border-b border-gray-600/30 hover:bg-white/5 transition-colors">
                        <td className="p-3 text-gray-300 font-medium">{data.time}</td>
                        <td className="p-3 font-mono text-white font-semibold">
                          {convertTemperature(data.temperature).toFixed(1)}
                        </td>
                        <td className="p-3 font-mono text-white font-semibold">{data.pressure}</td>
                        <td className="p-3 font-mono text-white font-semibold">{data.windSpeed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
