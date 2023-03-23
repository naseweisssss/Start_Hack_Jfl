"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import TutorialHeader from "./headerShell";
import { Content, Tile } from "carbon-components-react";
import MapBox from "./maptest/mapbox";
import { Column, Grid, Row, FlexGrid } from "@carbon/react";
import GTF from "./maptest/geotiff";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [coord, setCoord] = useState({lat: null, lng: null});
    return (
        <main>
            <TutorialHeader></TutorialHeader>
            <Content>
                <Grid>
                    <Column lg={12}>
                        <Row>
                            <MapBox setter = {setCoord}></MapBox>
                        </Row>
                    </Column>
                    <Column lg={4}>
                        <Row>

                        </Row>
                    </Column>
                </Grid>
            </Content>

            <GTF coord = {coord}></GTF>
        </main>
    );
}
