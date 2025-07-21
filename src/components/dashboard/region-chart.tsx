"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface ChartData {
  time: string
  temperature: number
  pressure: number
  windSpeed: number
}

interface RegionChartProps {
  data: ChartData[]
  dataKey: keyof ChartData
  title: string
  color: string
  unit?: string
  convertValue?: (value: number) => number
}

export default function RegionChart({ data, dataKey, title, color, unit = "", convertValue }: RegionChartProps) {
  const processedData = data.map((item) => ({
    ...item,
    [dataKey]: convertValue ? convertValue(item[dataKey] as number) : item[dataKey],
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b0f1a]/95 border border-[#66fcf1]/30 rounded-lg p-3 backdrop-blur-md">
          <p className="text-[#66fcf1] font-medium">{`Time: ${label}`}</p>
          <p className="text-white">
            {`${title}: ${typeof payload[0].value === "number" ? payload[0].value.toFixed(1) : payload[0].value} ${unit}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="border-[#66fcf1]/30 bg-white/5 backdrop-blur-md shadow-lg">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <CardTitle className="text-[#66fcf1] flex items-center gap-2 text-base sm:text-lg md:text-xl">
          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="h-64 sm:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#66fcf1" strokeOpacity={0.1} />
              <XAxis
                dataKey="time"
                stroke="#66fcf1"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#66fcf1" }}
              />
              <YAxis
                stroke="#66fcf1"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
                tick={{ fill: "#66fcf1" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, stroke: color, strokeWidth: 2, fill: "#0b0f1a" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
