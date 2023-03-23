"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import TutorialHeader from "./headerShell";
import { Content, NumberInput, Tile, Column, Grid, Row, Form, Button } from "carbon-components-react";
import MapBox from "./maptest/mapbox";

import GTF from "./maptest/geotiff";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [coord, setCoord] = useState({lat: null, lng: null});
    const [input, setInput] = useState(1)
    const numberRef = useRef();
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
                    <Column lg = {4}>
                        <Row>
                            
                            <Form>
                                <NumberInput ref={numberRef} id={"jhgfjhg"} value={0} hideSteppers={true} label={"Roof Area (m^2)"} onKeyUp={()=>{
                                    // console.log(parseInt(numberRef.current.value))
                                    setInput(parseInt(numberRef.current.value))
                                }} ></NumberInput>

                            </Form>
                            {input}
                            
                        </Row>
                    </Column>
                </Grid>
            </Content>

            <GTF coord = {coord}></GTF>
        </main>
    );
}
