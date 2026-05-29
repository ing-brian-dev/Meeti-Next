"use client"
import { Icon } from "leaflet";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Marker as TMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';


const markerIcon = new Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type Props = {
  address: string
  lat: number
  lng: number
  placeName: string
}

export default function Location({ address, lat, lng, placeName }: Props) {
  const markerRef = useRef<TMarker>(null);
  const ZOOM = 16;

  return (
    <>
      <MapContainer center={[lat,lng]} zoom={ZOOM} scrollWheelZoom={true} className='h-96 w-full'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lat,lng]}
          icon={markerIcon}
          ref={markerRef}
        >
          <Popup>{placeName} - {address}</Popup>
        </Marker>
      </MapContainer>
    </>
  )
}