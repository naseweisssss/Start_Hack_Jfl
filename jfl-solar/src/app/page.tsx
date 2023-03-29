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
  ProgressBar,
} from "carbon-components-react";
import MapBox from "./maptest/mapbox";
import { World } from "./Globe";

import GTF from "./maptest/geotiff";
import { useEffect, useRef, useState } from "react";
import { GlobalTheme } from "@carbon/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [coord, setCoord] = useState({ lat: null, lng: null });
  const [area, setArea] = useState(100);
  const [coverage, setCoverage] = useState(85);
  const [loading, setLoading] = useState(false);
  const numberRef = useRef();
  const pctRef = useRef();
  const [pva, setPVA] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("active");
  // let status = "active";
  const [dailyOutput, setDailyOutput] = useState("0");
  const [yearlyOutput, setYearlyOutput] = useState("0");
  const [yearlyCostSavings, setYearlyCostSavings] = useState("0");
  const [lifetimeNetSavings, setLifetimeNetSavings] = useState("0");

  const fetchSolar = async () => {
    console.log("fetch", coord?.lat, coord?.lng);
    setLoading(true);
    setStatus("active");
    fetch(
      `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${coord?.lng}&latitude=${coord?.lat}&format=json&start=2021&end=2021`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.properties.parameter.ALLSKY_SFC_SW_DWN["202113"]);
        setPVA(data.properties.parameter.ALLSKY_SFC_SW_DWN["202113"]);
        setStatus("finished");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setStatus("error");
      });
  };

  useEffect(() => {
    console.log(pva);

    const _dailyOutput = ((pva * area * coverage) / 100) * 10;
    const _panelCost = (_dailyOutput / 1000) * 3;
    const _yearlyOutput = 365 * _dailyOutput;
    const cost = 0.25;
    const _yearlyCostSavings = (cost * _yearlyOutput) / 1000;
    const _lifetimeNetSavings = _yearlyCostSavings * 25 - _panelCost;
    setDailyOutput(_dailyOutput.toFixed(2));
    setYearlyOutput(_yearlyOutput.toFixed(2));
    setYearlyCostSavings(_yearlyCostSavings.toFixed(2));
    setLifetimeNetSavings(_lifetimeNetSavings.toFixed(2));
  }, [pva, coverage, area]);

  useEffect(() => {
    fetchSolar();
  }, [coord]);

  // useEffect(()=>{
  //   if(score < 30){
  //     status = "error"
  //   } else if (score >= 30 && score < 70){
  //     status = "active"
  //   } else {
  //     status = "finished"
  //   }
  // }, [score])

  return (
    <main>
      <TutorialHeader></TutorialHeader>
      <section
        onClick={() => {
          document
            .getElementById("mainApp")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
                <div style={{
                    position: "absolute",
                    height: "100vh",
                    width: "100vw",
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h1 style={{
                        zIndex: "999",
                        color: "#ffffff",
                        fontSize: "64px"
                    }}>Make a Difference ☀️</h1>
                </div>
        <World />
      </section>

      {/* <GlobalTheme theme="g100"> */}
      <section style={{ marginTop: "48px" }} id="mainApp">
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
                      <FormGroup legendText="">
                        <NumberInput
                          ref={numberRef}
                          id={"jhgfjhg"}
                          value={100}
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
                            setCoverage(parseInt(pctRef.current.value));
                          }}
                        ></NumberInput>
                      </FormGroup>
                    </Row>
                    <Row style={{ marginTop: "1rem" }}>
                      <h3>Results:</h3>
                    </Row>
                    <Row>
                      <StructuredListWrapper>
                        <StructuredListHead>
                          <StructuredListRow head>
                            <StructuredListCell head>
                              Parameter
                            </StructuredListCell>
                            <StructuredListCell head>Value</StructuredListCell>
                          </StructuredListRow>
                        </StructuredListHead>
                        <StructuredListBody>
                          <StructuredListRow>
                            <StructuredListCell noWrap>
                              Daily Output (Wh)
                            </StructuredListCell>
                            <StructuredListCell>
                              {dailyOutput}
                            </StructuredListCell>
                          </StructuredListRow>
                          <StructuredListRow>
                            <StructuredListCell noWrap>
                              Yearly Output (Wh)
                            </StructuredListCell>
                            <StructuredListCell>
                              {yearlyOutput}
                            </StructuredListCell>
                          </StructuredListRow>
                        </StructuredListBody>
                        <StructuredListRow>
                          <StructuredListCell noWrap>
                            Yearly Cost Savings (EUR)
                          </StructuredListCell>
                          <StructuredListCell>
                            {yearlyCostSavings}
                          </StructuredListCell>
                        </StructuredListRow>
                        <StructuredListRow>
                          <StructuredListCell noWrap>
                            Lifetime Net Savings (EUR)
                          </StructuredListCell>
                          <StructuredListCell>
                            {lifetimeNetSavings}
                          </StructuredListCell>
                        </StructuredListRow>
                      </StructuredListWrapper>
                    </Row>
                    {/* <Row
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}                    
                  >
                    <h3>Score:</h3>
                  </Row> */}
                    <Row
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <ProgressBar
                        label={"Score"}
                        hideLabel={true}
                        value={loading ? null : 0}
                        status={status}
                      ></ProgressBar>
                    </Row>
                  </Column>
                </Grid>
              </Row>
            </Column>
          </Grid>
        </Content>
      </section>
      {/* </GlobalTheme> */}
    </main>
  );
}
