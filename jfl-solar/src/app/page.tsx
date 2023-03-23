"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import TutorialHeader from "./headerShell";
import {
  Content,
  NumberInput,
  Tile,
  Column,
  Grid,
  Row,
  Form,
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListCell,
  StructuredListRow,
  FormGroup,
  ProgressBar
} from "carbon-components-react";
import MapBox from "./maptest/mapbox";

import GTF from "./maptest/geotiff";
import { useEffect, useRef, useState } from "react";
import { GlobalTheme } from '@carbon/react';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [coord, setCoord] = useState({ lat: null, lng: null });
  const [area, setArea] = useState(1);
  const [coverage, setCoverage] = useState(85);
  const [loading, setLoading] = useState(false);
  const numberRef = useRef();
  const pctRef = useRef();
  const [pva, setPVA] = useState(null);
  const [score, setScore] = useState(0);
  let status = "error"

  const fetchSolar = async () => {
    console.log("fetch", coord?.lat, coord?.lng);
    setLoading(true);
    fetch(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${coord?.lng}&latitude=${coord?.lat}&format=json&start=2021&end=2021`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.properties.parameter.ALLSKY_SFC_SW_DWN["202113"]);
        setLoading(false)
      });
  };

  useEffect(() => {
    fetchSolar();
  }, [coord]);

  useEffect(()=>{
    if(score < 30){
      status = "error"
    } else if (score >= 30 && score < 70){
      status = "active"
    } else {
      status = "finished"
    }
  }, [score])

  return (
    <main>
      {/* <GlobalTheme theme="g100"> */}
      <TutorialHeader></TutorialHeader>
      <Content>
        <Grid>
          <Column lg={12}>
            <Row>
              <MapBox setter={setCoord} loading={loading}></MapBox>
            </Row>
          </Column>
          <Column lg={4}>
            <Row>
              <Grid>
                <Column lg={4}>
                  <Row>
                    <h3>Input Parameters:</h3>
                  </Row>
                  <Row>
                    <FormGroup>
                      <NumberInput
                        ref={numberRef}
                        id={"jhgfjhg"}
                        value={0}
                        hideSteppers={true}
                        label={"Roof Area (m^2)"}
                        onKeyUp={() => {
                          // console.log(parseInt(numberRef.current.value))
                          setArea(parseInt(numberRef.current.value));
                        }}
                      ></NumberInput>
                      <NumberInput
                        ref={pctRef}
                        id={"jhgfjhga"}
                        value={85}
                        hideSteppers={true}
                        label={"Percentage Coverage"}
                        onKeyUp={() => {
                          // console.log(parseInt(numberRef.current.value))
                          setArea(parseInt(pctRef.current.value));
                        }}
                      ></NumberInput>
                    </FormGroup>
                  </Row>
                  <Row
                    style={{ marginTop: "1rem" }}
                    
                  >
                    <h3>Results:</h3>
                  </Row>
                  <Row>
                    <StructuredListWrapper>
                      <StructuredListHead>
                        <StructuredListRow head>
                          <StructuredListCell head>ColumnA</StructuredListCell>
                          <StructuredListCell head>ColumnB</StructuredListCell>
                        </StructuredListRow>
                      </StructuredListHead>
                      <StructuredListBody>
                        <StructuredListRow>
                          <StructuredListCell noWrap>Row 1</StructuredListCell>
                          <StructuredListCell>Row 1</StructuredListCell>
                        </StructuredListRow>
                        <StructuredListRow>
                          <StructuredListCell noWrap>Row 2</StructuredListCell>
                          <StructuredListCell>Row 2</StructuredListCell>
                        </StructuredListRow>
                      </StructuredListBody>
                    </StructuredListWrapper>
                  </Row>
                  <Row
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    
                  >
                    <h3>Score:</h3>
                  </Row>
                  <Row>
                    <ProgressBar label={"Score"} hideLabel={true} value={loading ? null : score}></ProgressBar>
                  </Row>
                </Column>
              </Grid>
            </Row>
          </Column>
        </Grid>
      </Content>
      {/* </GlobalTheme> */}
    </main>
  );
}
