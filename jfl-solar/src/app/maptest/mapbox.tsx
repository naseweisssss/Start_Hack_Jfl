"use client";

import { Loader, LoaderOptions } from "google-maps";
import { CSSProperties, useEffect, useLayoutEffect, useRef } from "react";
import { GoogleMap, LoadScript, KmlLayer } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",   
    boxSizing: `borderBox`,
} satisfies CSSProperties ;

const center = {
    lat: -3.745,
    lng: -38.523,
};

export default function MapBox() {
    return (
   
         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API!}>
             <GoogleMap
                 mapContainerStyle={containerStyle}
                 center={center}
                 zoom={10}
             >
               
             </GoogleMap>
         </LoadScript>


    );
}
