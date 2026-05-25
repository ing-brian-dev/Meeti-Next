import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from 'leaflet';
import type { Marker as TMarker, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FormError, FormInput, FormLabel } from '@/src/shared/components/forms';
import { useFormContext } from 'react-hook-form';
import { GeoCodeSchema, MeetiInput } from '../schemas/meetiSchema';

function CenterMap({ coordinates }: { coordinates: LatLngTuple }) {
    const map = useMap();
    useEffect(() => {
        map.setView([coordinates[0], coordinates[1]]);
    }, [coordinates, map]);
    return null;
}

const markerIcon = new Icon({
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});


export default function LocationPicker() {

    const { register, getValues, setValue, formState: { errors }, clearErrors } = useFormContext<MeetiInput>();

    const lat = getValues('location.lat');
    const lng = getValues('location.lng');

    const [coordinates, setCoordinates] = useState<LatLngTuple>([lat, lng]);

    const markerRef = useRef<TMarker>(null);
    const ZOOM = 16;
    const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=ES&location=";

    const reverseGeocoding = async (positionTuple: LatLngTuple) => {
        const url = GEOCODE_URL + `${positionTuple[1]},${positionTuple[0]}`;
        const data = await (await fetch(url)).json();
        const location = GeoCodeSchema.parse(data.address);

        setValue('location.address', location.LongLabel);
        setValue('location.city',location.City);
        setValue('location.country',location.CntryName);
        setValue('location.lat',location.InputY);
        setValue('location.lng',location.InputX);
        clearErrors('location.address');
    }


    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker !== null) {
                const latLng = marker.getLatLng();
                const positionTuple: LatLngTuple = [latLng.lat, latLng.lng];
                setCoordinates(positionTuple);
                reverseGeocoding(positionTuple)
            }
        },
    }), [reverseGeocoding]);

    return (
        <>
            <MapContainer center={coordinates} zoom={ZOOM} scrollWheelZoom={true} className='h-96 w-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={true}
                    position={coordinates}
                    icon={markerIcon}
                    eventHandlers={eventHandlers}
                    ref={markerRef}
                >
                    <Popup>Dirección aquí</Popup>
                </Marker>

                <CenterMap coordinates={coordinates} />
            </MapContainer>

            <FormLabel htmlFor="address">Dirección:</FormLabel>
            <FormInput
                id="address"
                type="text"
                placeholder="Dirección Evento"
                className="disabled:opacity-50 "
                disabled
                {...register('location.address')}
            />
            {'location' in errors && errors.location?.address && (
                <FormError>{errors.location.address.message}</FormError>
            )}
        </>
    )
}