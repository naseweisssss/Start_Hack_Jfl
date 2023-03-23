import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import { World } from '..Globe/'

// const World = lazy(() => import('../components/globe/'))

import { Canvas } from "@react-three/fiber";
import css from "../styles/Home.module.css";
import { lazy } from 'react';

import React, { useState, useEffect, useMemo, useRef } from "react"
import ReactDOM from "react-dom"
import Globe from "react-globe.gl"
import countries from "../files/custom.geo.json"
import { useToken } from "@chakra-ui/react"
import cablesGeo from "@/utils/cablegeo.json"

const color = "purple"

export const World = () => {
  const gradient = [...Array(10).keys()].map((i) => {
    if (i == 0) {
      return useToken("colors", color + ".50")
    }
    return useToken("colors", color + `.${i}00`)
  })

  const [cablePaths, setCablePaths] = useState([])

  const N = 300

  useEffect(() => {
    // from https://www.submarinecablemap.com
    let cablePaths = []
    cablesGeo.features.forEach(({ geometry, properties }) => {
      geometry.coordinates.forEach((coords) => cablePaths.push({ coords, properties }))
    })
    setCablePaths(cablePaths)
  }, [])

  const globeRef = useRef()
  const [counter, setCounter] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Check if the key R is pressed, if so, reset the globe
    const handleKeyDown = (e) => {
      if (e.key === "r") {
        setKey(i => i + 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const renderGlobe = () => {
      ReactDOM.render(
        <Globe
          //   pointsData={gData}
          //   pointAltitude={0}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pathsData={cablePaths}
          pathPoints="coords"
          pathPointLat={(p) => p[1]}
          pathPointLng={(p) => p[0]}
          pathColor={() => "rgba(137, 196, 244, 1)"}
          pathPointAlt={0.01}
          pathDashLength={0.1}
          pathDashGap={0.008}
          pathDashAnimateTime={12000}
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          animateIn={true}
          hexPolygonColor={() => gradient[Math.floor(Math.random() * 10)]}
        />,
        document.getElementById("globeViz")
      )
    }
    renderGlobe()
  }, [countries, cablePaths, key])

  return <div key={key} id="globeViz" ref={globeRef}></div>
}


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <World />
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
