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
const data=fetch('world_population.csv')

export default function Page() {
  // useEffect(() => {
  //   // load data
  //   fetch('world_population.csv').then(res => res.text())
  //     // .then(setVolcanoes);
  // })
console.log(data)
  return (
    <main className={styles.main}>
      <Globe
        // width='100%'
        // height='100%'
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor='green'
        // showAtmosphere={true}
      //  hexbinPointsData={}
      />
    </main>
  )
}