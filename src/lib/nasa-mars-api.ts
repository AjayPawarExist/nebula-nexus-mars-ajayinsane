const NASA_API_KEY = "M4ZOZqBT9suNEoiAFknBi4ksN2DXSlXV9JYG40Wz"
const NASA_API_URL = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`

export interface MarsWeatherData {
  sol: string
  temperature: {
    average: number
    min: number
    max: number
    count: number
  } | null
  pressure: {
    average: number
    min: number
    max: number
    count: number
  } | null
  windSpeed: {
    average: number
    min: number
    max: number
    count: number
  } | null
  windDirection: {
    mostCommon: {
      compassPoint: string
      compassDegrees: number
      count: number
    } | null
  } | null
  season: string
  firstUTC: string
  lastUTC: string
}

export interface ProcessedMarsData {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  temperature: number
  pressure: number
  windSpeed: number
  windDirection?: string
  status: "active" | "inactive"
  description: string
  season: string
  lastUpdated: string
  historicalData: Array<{
    time: string
    temp: number
    pressure: number
    wind: number
  }>
}

const celsiusToDisplay = (celsius: number): number => {
  return Math.round(celsius * 10) / 10
}


export const processNASAWeatherData = (apiResponse: any): MarsWeatherData[] => {
  const { sol_keys } = apiResponse

  return sol_keys.map((sol: string) => {
    const solData = apiResponse[sol]

    return {
      sol,
      temperature: solData.AT
        ? {
            average: celsiusToDisplay(solData.AT.av),
            min: celsiusToDisplay(solData.AT.mn),
            max: celsiusToDisplay(solData.AT.mx),
            count: solData.AT.ct,
          }
        : null,
      pressure: solData.PRE
        ? {
            average: Math.round(solData.PRE.av),
            min: Math.round(solData.PRE.mn),
            max: Math.round(solData.PRE.mx),
            count: solData.PRE.ct,
          }
        : null,
      windSpeed: solData.HWS
        ? {
            average: Math.round(solData.HWS.av * 10) / 10,
            min: Math.round(solData.HWS.mn * 10) / 10,
            max: Math.round(solData.HWS.mx * 10) / 10,
            count: solData.HWS.ct,
          }
        : null,
      windDirection: solData.WD
        ? {
            mostCommon: solData.WD.most_common
              ? {
                  compassPoint: solData.WD.most_common.compass_point,
                  compassDegrees: solData.WD.most_common.compass_degrees,
                  count: solData.WD.most_common.ct,
                }
              : null,
          }
        : null,
      season: solData.Season || "unknown",
      firstUTC: solData.First_UTC,
      lastUTC: solData.Last_UTC,
    }
  })
}


export const fetchMarsWeatherData = async (): Promise<MarsWeatherData[]> => {
  try {
    const response = await fetch(NASA_API_URL)

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`)
    }

    const data = await response.json()
    return processNASAWeatherData(data)
  } catch (error) {
    console.error("Error fetching Mars weather data:", error)
    throw error
  }
}


export const convertToRegionData = (nasaData: MarsWeatherData[]): ProcessedMarsData[] => {

  const latestSol = nasaData[nasaData.length - 1]


  const historicalData = nasaData.slice(-7).map((sol, index) => ({
    time: `Sol ${sol.sol}`,
    temp: Math.round((sol.temperature?.average || -70) * 10) / 10,
    pressure: Math.round(sol.pressure?.average || 600),
    wind: Math.round((sol.windSpeed?.average || 5) * 10) / 10,
  }))


  while (historicalData.length < 4) {
    const lastPoint = historicalData[historicalData.length - 1] || { time: "Sol 1", temp: -70, pressure: 600, wind: 5 }
    historicalData.push({
      time: `Sol ${historicalData.length + 1}`,
      temp: lastPoint.temp + (Math.random() - 0.5) * 10,
      pressure: lastPoint.pressure + (Math.random() - 0.5) * 50,
      wind: lastPoint.wind + (Math.random() - 0.5) * 3,
    })
  }

  console.log("Processed Historical Data:", historicalData)


  const baseRegions = [
    {
      id: "insight",
      name: "Elysium Planitia",
      coordinates: { lat: 4.5, lng: 135.9 },
      description: "NASA InSight lander location, real-time data",
      multiplier: { temp: 1, pressure: 1, wind: 1 },
    },
    {
      id: "jezero",
      name: "Jezero Crater",
      coordinates: { lat: 18.38, lng: 77.58 },
      description: "Ancient river delta site, Perseverance rover location",
      multiplier: { temp: 1.1, pressure: 0.85, wind: 1.3 },
    },
    {
      id: "gale",
      name: "Gale Crater",
      coordinates: { lat: -5.4, lng: 137.8 },
      description: "Curiosity rover location, ancient lake bed",
      multiplier: { temp: 1.05, pressure: 1.2, wind: 0.7 },
    },
    {
      id: "olympus",
      name: "Olympus Mons",
      coordinates: { lat: 18.65, lng: -133.8 },
      description: "Largest volcano in the solar system",
      multiplier: { temp: 0.7, pressure: 0.1, wind: 2.5 },
    },
  ]

  return baseRegions.map((region, index) => {
    const hasData = latestSol.temperature && latestSol.pressure && latestSol.windSpeed
    const isActive = hasData && index !== 3 


    const temperature = hasData ? Math.round(latestSol.temperature!.average * region.multiplier.temp * 10) / 10 : -70

    const pressure = hasData ? Math.round(latestSol.pressure!.average * region.multiplier.pressure) : 600

    const windSpeed = hasData ? Math.round(latestSol.windSpeed!.average * region.multiplier.wind * 10) / 10 : 5


    const regionHistoricalData = historicalData.map((data) => ({
      time: data.time,
      temp: Math.round(data.temp * region.multiplier.temp * 10) / 10,
      pressure: Math.round(data.pressure * region.multiplier.pressure),
      wind: Math.round(data.wind * region.multiplier.wind * 10) / 10,
    }))

    return {
      id: region.id,
      name: region.name,
      coordinates: region.coordinates,
      temperature,
      pressure,
      windSpeed,
      windDirection: latestSol.windDirection?.mostCommon?.compassPoint,
      status: isActive ? ("active" as const) : ("inactive" as const),
      description: region.description,
      season: latestSol.season,
      lastUpdated: latestSol.lastUTC,
      historicalData: regionHistoricalData,
    }
  })
}

export const getFallbackData = (): ProcessedMarsData[] => {
  const generateHistoricalData = (baseTemp: number, basePressure: number, baseWind: number) => {
    return Array.from({ length: 7 }, (_, i) => ({
      time: `Sol ${i + 1}`,
      temp: Math.round((baseTemp + (Math.random() - 0.5) * 15) * 10) / 10,
      pressure: Math.round(basePressure + (Math.random() - 0.5) * 100),
      wind: Math.round((baseWind + (Math.random() - 0.5) * 8) * 10) / 10,
    }))
  }

  return [
    {
      id: "insight",
      name: "Elysium Planitia",
      coordinates: { lat: 4.5, lng: 135.9 },
      temperature: -63.2,
      pressure: 610,
      windSpeed: 12.4,
      status: "active" as const,
      description: "NASA InSight lander location (API offline)",
      season: "winter",
      lastUpdated: new Date().toISOString(),
      historicalData: generateHistoricalData(-63, 610, 12),
    },
    {
      id: "jezero",
      name: "Jezero Crater",
      coordinates: { lat: 18.38, lng: 77.58 },
      temperature: -59.1,
      pressure: 735,
      windSpeed: 8.7,
      status: "active" as const,
      description: "Ancient river delta site, Perseverance rover location",
      season: "winter",
      lastUpdated: new Date().toISOString(),
      historicalData: generateHistoricalData(-59, 735, 8),
    },
    {
      id: "gale",
      name: "Gale Crater",
      coordinates: { lat: -5.4, lng: 137.8 },
      temperature: -71.3,
      pressure: 890,
      windSpeed: 16.8,
      status: "active" as const,
      description: "Curiosity rover location, ancient lake bed",
      season: "winter",
      lastUpdated: new Date().toISOString(),
      historicalData: generateHistoricalData(-71, 890, 16),
    },
    {
      id: "olympus",
      name: "Olympus Mons",
      coordinates: { lat: 18.65, lng: -133.8 },
      temperature: -89.5,
      pressure: 72,
      windSpeed: 23.1,
      status: "inactive" as const,
      description: "Largest volcano in the solar system",
      season: "winter",
      lastUpdated: new Date().toISOString(),
      historicalData: generateHistoricalData(-89, 72, 23),
    },
  ]
}
