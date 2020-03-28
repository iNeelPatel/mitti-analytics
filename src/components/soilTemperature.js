import React, { Component } from "react";
import { Row, Col, Spin, DatePicker } from "antd";
import * as action from "../actions";
// import { MiniBar } from "ant-design-pro/lib/Charts";
import { Line } from "react-chartjs-2";

const { RangePicker } = DatePicker;

// let count = 0;

export default class all extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loader: true,
      lable: [],
      dataOfSensor: [],
      chartData: {}
    };
  }

  UNSAFE_componentWillMount = async () => {
    await action
      .getSensorData()
      .then(sensorData => {
        this.setState({ data: sensorData, loader: false });
      })
      .catch(err => console.log(err));

    await console.log(this.state.loader);

    let lable = [];
    let dataOfSensor = [];

    await this.state.data.map(async item =>
      item.soilTemprature === -127
        ? ""
        : lable.push(
            new Date(item.createdAt).toDateString() +
              " " +
              new Date(item.createdAt).getHours() +
              ":" +
              new Date(item.createdAt).getMinutes()
          )
    );

    await this.state.data.map(async item =>
      item.soilTemprature === -127 ? "" : dataOfSensor.push(item.soilTemprature)
    );

    await this.setState({
      chartData: {
        labels: lable,
        datasets: [
          {
            label: "Soil Temprature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(91,179,88,0.4)",
            borderColor: "rgba(91,179,88,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(91,179,88,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(91,179,88,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataOfSensor
          }
        ]
      }
    });
  };

  onOk = async value => {
    console.log("onOk: ", value);
    if (value[0] != null && value[1] != null) {
      let lable = [];
      let dataOfSensor = [];

      await action
        .getFliterSensorData(value[0], value[1])
        .then(data => {
          var dataOfSensor = JSON.parse(JSON.stringify(data));
          this.setState({ data: dataOfSensor });
          //  console.log(dataOfSensor);
        })
        .catch(err => console.log(err));

      console.log(this.state.data);

      await this.state.data.map(async item =>
        item.soilTemprature === -127
          ? ""
          : lable.push(
              new Date(item.createdAt).toDateString() +
                " " +
                new Date(item.createdAt).getHours() +
                ":" +
                new Date(item.createdAt).getMinutes()
            )
      );

      await this.state.data.map(async item =>
        item.soilTemprature === -127
          ? ""
          : dataOfSensor.push(item.soilTemprature)
      );

      await this.setState({
        chartData: {
          labels: lable,
          datasets: [
            {
              label: "Soil Temprature",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(91,179,88,0.4)",
              borderColor: "rgba(91,179,88,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(91,179,88,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(91,179,88,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: dataOfSensor
            }
          ]
        }
      });
    }
  };

  render() {
    //  console.table(this.state.data);

    return this.state.loader ? (
      <h2>
        <Spin /> Loading......
      </h2>
    ) : (
      <Row>
        <Row justify="center" style={{ width: "100%" }}>
          <Col>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              onChange={this.onChange}
              onOk={this.onOk}
            />
          </Col>
        </Row>

        <Col span={24}>
          <Line height={100} data={this.state.chartData} />
        </Col>
      </Row>
    );
  }
}
