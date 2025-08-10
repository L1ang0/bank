import { useEffect, useState } from 'react'

interface MapData {
  defaultLocation: {
    lat: number
    lng: number
  }
  timestamp: number
}

export const useMapData = () => {
  const [mapData, setMapData] = useState<MapData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchMapData = async () => {
      try {

        setMapData({
          defaultLocation: {
            lat: 53.904562284304745,  
            lng: 27.56170454087176,
          },
          timestamp: Date.now()
        })
      } catch (error) {
        console.error('Error fetching map data:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMapData()
  }, [])

  return { mapData, isLoading, isError }
}