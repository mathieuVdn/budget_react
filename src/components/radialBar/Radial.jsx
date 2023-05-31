import React from "react";
import ReactApexChart from "react-apexcharts";
import mc from "./radial.module.scss";

const Radial = (props) => {
  const series = props.series;

  const options = {
    chart: {
      height: 100,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%",
        },
      },
    },
    labels: ["Objectif"],
    dataLabels: {
      show: true,
      name: {
        show: true,
        fontSize: "16px",
        fontFamily: undefined,
        fontWeight: 600,
        color: undefined,
        offsetY: -10,
      },
      value: {
        show: true,
        fontSize: "14px",
        fontFamily: undefined,
        fontWeight: 400,
        color: undefined,
        offsetY: 16,
        formatter: function (val) {
          return val + "%";
        },
      },
      total: {
        show: false,
        label: "Total",
        color: "#373d3f",
        fontSize: "16px",
        fontFamily: undefined,
        fontWeight: 600,
        formatter: function (w) {
          return (
            w.globals.seriesTotals.reduce((a, b) => {
              return a + b;
            }, 0) /
              w.globals.series.length +
            "%"
          );
        },
      },
    },
  };

  return (
    <div className={`${mc.RadialBarCards}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
};

export default Radial;
