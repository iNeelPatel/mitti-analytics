import React, { Component } from "react";
import newLogo from "../asset/logo.png";
import { HashRouter, Route } from "react-router-dom";
import { Row, Col, Button } from "antd";
import All from "../components/all";
import SoilMoisture from "../components/soilmoisture";
import SoilTemperature from "../components/soilTemperature";
import AirTemperature from "../components/airTemperature";
import AirHumidity from "../components/airHumidity";
import solarRadiation from "../components/solarRadiation";
import soilPh from "../components/soilPh";

export default class NavRoute extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Row justify="center">
            <Col>
              <img src={newLogo} alt="logo" width={300} />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 10, marginBottom: 10 }}>
          <Row justify="center">
            <Col>
              <Button
                onClick={() => {
                  this.props.history.push("/chart");
                }}
              >
                All
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/soilmoisture");
                }}
              >
                Soil Moisture
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/soiltemperature");
                }}
              >
                Soil Temperature
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/soilph");
                }}
              >
                Soil pH
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/airtemperature");
                }}
              >
                Air Temperature
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/airhumidity");
                }}
              >
                Air Humidity
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/chart/solarradiation");
                }}
              >
                Solar Radiation
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <HashRouter>
            <Route path="/chart" exact component={All} />
            <Route path="/chart/soilmoisture" component={SoilMoisture} />
            <Route path="/chart/soiltemperature" component={SoilTemperature} />
            <Route path="/chart/soilph" component={soilPh} />
            <Route path="/chart/airtemperature" component={AirTemperature} />
            <Route path="/chart/airhumidity" component={AirHumidity} />
            <Route path="/chart/solarradiation" component={solarRadiation} />
          </HashRouter>
        </Col>
      </Row>
    );
  }
}
