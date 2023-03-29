"use client";

import { Loader, LoaderOptions } from "google-maps";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { GoogleMap, LoadScript, KmlLayer } from "@react-google-maps/api";

const containerStyle: CSSProperties = {
  width: "100%",
  height: "600px",
  // boxSizing: `borderBox`,
};

let center = {
  lat: 46,
  lng: 7.64,
};

interface mapProps {
  setter: Dispatch<
    SetStateAction<{
      lat: null;
      lng: null;
    }>
  >;
  loading: boolean;
}

const MapBox: React.FC<mapProps> = ({ setter, loading }) => {
  let pos: {
    lat: number;
    lng: number;
  };
  useEffect(() => {
    if (navigator.geolocation) {
      // console.log("geolocation call")
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos);

          center.lat = pos.lat;
          center.lng = pos.lng;
        },
        () => {}
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter()!);
    }
  }, [navigator.geolocation]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={(_) => {
          let coordC = JSON.parse(JSON.stringify(_.latLng));
          console.log(JSON.parse(JSON.stringify(_.latLng)));
          setter({
            lat: coordC.lat,
            lng: coordC.lng,
          });
        }}
      >
        {/* <KmlLayer url="https://github.com/naseweisssss/Start_Hack_Jfl/raw/main/jfl-solar/public/World_PVOUT_GoogleEarthData_GlobalSolarAtlas.kmz"></KmlLayer> */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapBox;
