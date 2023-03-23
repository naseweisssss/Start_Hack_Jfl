"use client";

import { Loader, LoaderOptions } from "google-maps";
import { useEffect, useLayoutEffect, useRef } from "react";
import { GoogleMap, LoadScript, KmlLayer } from "@react-google-maps/api";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

export default function maptest() {
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API!}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
              <KmlLayer url="https://github.com/naseweisssss/Start_Hack_Jfl/raw/main/jfl-solar/public/World_PVOUT_GoogleEarthData_GlobalSolarAtlas.kmz"></KmlLayer>
            </GoogleMap>
        </LoadScript>

    );
}
