"use client"
import styles from './page.module.css'
import { World } from './Globe'
import React, { useState, useEffect, useMemo, useRef } from "react"
import ReactDOM from "react-dom"



export default function Page() {


  return (
    <main className={styles.main}>
      <World/>
    </main>
  )
}