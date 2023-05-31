import React from "react";
import ReactApexChart from "react-apexcharts";
import mc from "./multipleRadialBar.module.scss";

const MutipleRadialBar = (props) => {
  const { series, labels } = props;

  const options = {
    chart: {
      type: "radialBar",
      height: 350,
    },
    theme: {
      palette: "palette6",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "30%",
        },
        dataLabels: {
          name: {
            fontSize: "50px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return (
                Math.round(
                  w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0) / w.globals.series.length
                ) + "%"
              );
            },
          },
        },
      },
    },
    labels: labels,
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      floating: false,
      fontSize: "18px",
      fontFamily: "dm sans, Arial",
      fontWeight: 400,
      offsetX: 0,
      offsetY: 0,

      markers: {
        width: 18,
        height: 18,
        strokeColor: "#fff",
        radius: 18,
        offsetX: -3,
        offsetY: 3,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <div className={mc.multipleRadialBar} id="chart">
      <ReactApexChart width={'100%'} options={options} series={series} type="radialBar" />
    </div>
  );
};

export default MutipleRadialBar;
