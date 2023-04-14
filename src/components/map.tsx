import Script from "next/script";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// export default function Map() {
//     return (
//         <div>
//             <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
//             {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
//             {/* <Script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></Script> */}
//             <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="h-96 w-full">
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={[51.505, -0.09]}>
//                     <Popup>
//                         A pretty CSS3 popup. <br /> Easily customizable.
//                     </Popup>
//                 </Marker>
//             </MapContainer>
//         </div>
//     )
// }

//function to fetch toilets from the database
export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/toilets`)
    const toilets = await res.json()
    return {
        props: {
            toilets
        }
    }
}
import { ToiletLocation } from "../models/toiletLocation";
import { useEffect, useState } from "react";

//function to display toilets on the map
export default function Map() {
    const [toilets, setToilets] = useState<ToiletLocation[]>([])
    useEffect(() => {
        fetch(`http://localhost:3000/api/toilets`)
            .then(res => res.json())
            .then(data => setToilets(data))

        //get current geo location
        navigator.geolocation.getCurrentPosition(function (position) {
            setHk({ lat: position.coords.latitude, lng: position.coords.longitude })
        })
    }, [])
    // current user geol location
    const [hk, setHk] = useState({ lat: 0, lng: 0 })

    if (hk.lat === 0 && hk.lng === 0)
        return <div>Loading...</div>
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center">Toilets in {hk.lat}, {hk.lng}</h1>
            </div>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
            <MapContainer center={[hk.lat, hk.lng]} zoom={13} scrollWheelZoom={false} className="h-96 w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {toilets.map(toilet => {
                    const lat = parseFloat(toilet.LATITUDE)
                    const lng = parseFloat(toilet.LONGITUDE)
                    if (lat && lng) {

                        return (<Marker key={`${toilet.OBJECTID}-${toilet.LATITUDE}-${toilet.LATITUDE}`} position={[lat, lng]}>
                            <Popup>
                                {toilet.NAME_TC}
                            </Popup>
                        </Marker>)
                    }

                })}
            </MapContainer>
        </div>

    )
}
