import React from "react";
import ReactApexChart from "react-apexcharts";
import fr from "apexcharts/dist/locales/fr.json";
const LineChart = (props) => {
  const { data} = props;
  console.log(new Date("2018-02-12").getTime());
  const series = [
    {
      name: `montant`,
      data: data,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      locales: [fr],
      defaultLocale: "fr",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 5,
    },
    title: {
      text: "Montant des opérations",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },

    markers: {
      size: 10,
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
