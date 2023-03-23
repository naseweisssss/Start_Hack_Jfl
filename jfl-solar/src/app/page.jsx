"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import { World } from '..Globe/'

// const World = lazy(() => import('../components/globe/'))

import { Canvas } from "@react-three/fiber";
// import css from "../styles/Home.module.css";
import { lazy } from 'react';

import React, { useState, useEffect, useMemo, useRef } from "react"
import ReactDOM from "react-dom"
import Globe from "react-globe.gl"
// import countries from "../files/custom.geo.json"
// import { useToken } from "@chakra-ui/react"
// import cablesGeo from "@/utils/cablegeo.json"

// const World = () => {
//   const [volcanoes, setVolcanoes] = useState([]);

//   useEffect(() => {
//     // load data
//     fetch('../datasets/world_volcanoes.json').then(res => res.json())
//       .then(setVolcanoes);
//   }, []);

//   const catColor = d3.scaleOrdinal(d3.schemeCategory10.map(col => polished.transparentize(0.2, col)));

//   const getAlt = d => d.elevation * 5e-5;

//   const getTooltip = d => `
//     <div style="text-align: center">
//       <div><b>${d.name}</b>, ${d.country}</div>
//       <div>(${d.type})</div>
//       <div>Elevation: <em>${d.elevation}</em>m</div>
//     </div>
//   `;
export default function Page() {
  return (
    <main className={styles.main}>
      <Globe
        width='100%'
        height='100%'
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor='#90ee90'
        showAtmosphere={true}
        // test pushhhhhh
      // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // pointsData={volcanoes}
      // pointLat="lat"
      // pointLng="lon"
      // pointAltitude={getAlt}
      // pointRadius={0.12}
      // pointLabel={getTooltip}
      // labelsData={volcanoes}
      // labelLat="lat"
      // labelLng="lon"
      // labelAltitude={d => getAlt(d) + 1e-6}
      // labelDotRadius={0.12}
      // labelDotOrientation={() => 'bottom'}
      // labelText="name"
      // labelSize={0.15}
      // labelResolution={1}
      // labelLabel={getTooltip}
      />
    </main>
  )
}