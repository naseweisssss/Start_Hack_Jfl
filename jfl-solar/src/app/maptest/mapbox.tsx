"use client";

import { Loader, LoaderOptions } from "google-maps";
import { CSSProperties, Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef } from "react";
import { GoogleMap, LoadScript, KmlLayer } from "@react-google-maps/api";

const containerStyle: CSSProperties = {
    width: "100%",
    height: "400px",   
    boxSizing: `borderBox`,
} ;

const center = {
    lat: 46,
    lng: 7.64,
};

interface mapProps {
    setter: Dispatch<SetStateAction<{
        lat: null;
        lng: null;
    }>>;
}

const MapBox: React.FC<mapProps> = ({
    setter
}) => {

    return (
   
         <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API!}>
             <GoogleMap
                 mapContainerStyle={containerStyle}
                 center={center}
                 zoom={10}
                 onClick={(_)=>{
                    let coordC = JSON.parse(JSON.stringify(_.latLng));
                    console.log(JSON.parse(JSON.stringify(_.latLng)))
                    setter({
                        lat: coordC.lat,
                        lng: coordC.lng
                    });
                }}>
                {/* <KmlLayer url="https://github.com/naseweisssss/Start_Hack_Jfl/raw/main/jfl-solar/public/World_PVOUT_GoogleEarthData_GlobalSolarAtlas.kmz"></KmlLayer> */}
             
               
             </GoogleMap>
         </LoadScript>


    );
}

export default MapBox
