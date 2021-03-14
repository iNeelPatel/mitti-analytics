import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import * as action from "../actions";
import { TimelineChart } from "ant-design-pro/lib/Charts";

export default class all extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loader: true,
    };
  }

  UNSAFE_componentWillMount = async () => {
    await action
      .getSensorData()
      .then((sensorData) => {
        this.setState({ data: sensorData, loader: false });
      })
      .catch((err) => console.log(err));

    await console.log(this.state.loader);
  };

  render() {
    const sensorChartData = [];
    this.state.data.map(async (item) =>
      item.soilTemprature === -127 || item.airTemprature === null
        ? ""
        : sensorChartData.push({
            x: new Date(item.createdAt) + 19800,
            y1: item.soilTemprature,
            y5: item.soilMoisture,
            y3: item.soilPh,
            y4: item.airTemprature,
            y2: item.airHumidity,
          })
    );
    //  console.table(this.state.data);

    return this.state.loader ? (
      <h2>
        <Spin /> Loading......
      </h2>
    ) : (
      <Row>
        <Col span={24}>
          <TimelineChart
            height={550}
            data={sensorChartData}
            titleMap={{
              y1: "Temprature",
              y2: "Moisture",
            }}
          />
        </Col>
      </Row>
    );
  }
}
