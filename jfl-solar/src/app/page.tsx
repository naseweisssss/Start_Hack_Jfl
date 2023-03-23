"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import TutorialHeader from './headerShell'
import { Content, Tile } from 'carbon-components-react'
import MapBox from './maptest/mapbox'
import {Column, Grid, Row, FlexGrid} from "@carbon/react"
import GTF from './maptest/geotiff';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      {/* <TutorialHeader></TutorialHeader>
      <Content>
        <FlexGrid>
        <Row>
            <Column>
            
            <MapBox></MapBox>
            
              
            </Column>
            <Column sm={1} md={1} lg={1}>
              <Tile>Test</Tile>
              
            </Column>
          
            </Row>
        </FlexGrid>
        
      </Content> */}

      <GTF></GTF>
    </main>
  )
}
