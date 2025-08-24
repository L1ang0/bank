'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { exchangePoints } from '@/data/exchangePoints'

// компонент-обертка для динамического импорта
export default function MapComponent({ center }: { center: { lat: number; lng: number } }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    })
  }, [])

  if (!isClient) return null

  // Иконки маркеров
  const DefaultIcon = L.icon({
    iconUrl: '/marker-icon-red.png',
    iconRetinaUrl: '/marker-icon-2x-red.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  const BlueIcon = L.icon({
    iconUrl: '/marker-icon-blue.png',
    iconRetinaUrl: '/marker-icon-2x-blue.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  const position: [number, number] = [center.lat, center.lng]

  return (
    <MapContainer 
      center={position} 
      zoom={11} 
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <Marker position={position} icon={DefaultIcon}>
        <Popup>
          <div className="font-semibold">Центральный банк</div>
          <div className="text-sm">БГБ</div>
        </Popup>
      </Marker>
      
      {exchangePoints.map(point => (
        <Marker 
          key={point.id} 
          position={point.position} 
          icon={BlueIcon}
        >
          <Popup>
            <div className="font-semibold">{point.name}</div>
            <div className="text-sm">{point.address}</div>
            <div className="text-xs text-blue-600 mt-1">Валюты: {point.currencies}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

