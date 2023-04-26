import Script from "next/script";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { ToiletLocation } from "../models/toiletLocation";
import { useEffect, useState } from "react";

//function to display toilets on the map
export default function Map() {
    const [toilets, setToilets] = useState<ToiletLocation[]>([])
    async function refreshLocation() {
        let lat = 0
        let lng = 0

        // navigator.geolocation.getCurrentPosition((position) => {
        //     lat = position.coords.latitude
        //     lng = position.coords.longitude
        //     setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })

        // })
        let position = await getPosition() as GeolocationPosition;
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        return { lat, lng }
    }

    function getPosition() {
        // Simple wrapper
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }


    useEffect(() => {
        // prompt mobile users to turn on location service
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'prompt') {
                alert('Please turn on location service')
            }
        })

        async function fetchToilets() {

            // get current location

            let location = await refreshLocation()


            //add user location to the url as query string
            let url = new URL(`${window.location.origin}/api/toilet`)
            url.searchParams.append('lat', location.lat.toString())
            url.searchParams.append('lng', location.lng.toString())
            url.searchParams.append('limit', '5')
            console.log(location)
            fetch(url)
                .then(res => res.json())
                .then(data => { setToilets(data) })
        }
        fetchToilets()



    }, [])
    // current user geo location
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })

    if (userLocation.lat === 0 && userLocation.lng === 0)
        return <div>Loading...</div>
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center">Toilets in {userLocation.lat}, {userLocation.lng}</h1>
            </div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
            <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} scrollWheelZoom={false} className="h-96 w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {toilets.map((toilet, index) => {
                    const lat = parseFloat(toilet.LATITUDE)
                    const lng = parseFloat(toilet.LONGITUDE)
                    if (lat && lng) {
                        return (<Marker key={index} position={[lat, lng]}>
                            <Popup>
                                {toilet.NAME_TC}
                            </Popup>
                        </Marker>)
                    }
                })}
                <MarkerForCurrentLocation lat={userLocation.lat} lng={userLocation.lng} />
            </MapContainer>
            <ButtonToRefreshLocation refreshLocation={refreshLocation} />


        </div>

    )
}

type Props = {
    refreshLocation: () => void
}
export function ButtonToRefreshLocation(props: Props) {
    // returns a button to refresh location styled with tailwind
    return (
        <button onClick={props.refreshLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Refresh Location
        </button>
    )
}
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import google_maps_pin from "../../public/google_maps_pin.svg";
import Image from "next/image";

type MarkerProps = {
    lat: number,
    lng: number
}
export function MarkerForCurrentLocation(props: MarkerProps) {
    const iconMarkup = renderToStaticMarkup(
        // a svg marker that uses Google_maps_pin.svg
        <div className="relative">
            <Image src={google_maps_pin} alt="google maps pin" width={50} height={50} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">

            </div>
        </div>


    );
    const customMarkerIcon = divIcon({
        html: iconMarkup
    });

    return (
        <Marker position={[props.lat, props.lng]} icon={customMarkerIcon} riseOnHover={true} zIndexOffset={1000} >
            <Popup>
                You are here

            </Popup>
        </Marker>
    )
}