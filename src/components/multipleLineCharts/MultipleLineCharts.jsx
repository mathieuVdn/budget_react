import React from "react";
import ReactApexChart from "react-apexcharts";
import mc from "./multipleLineCharts.module.scss";
const MultipleLineCharts = (props) => {
  const { savings, expenses, challenges } = props;

  const series = [
    {
      name: "Epargnes",
      data: savings,
    },
    {
      name: "Dépenses",
      data: expenses,
    },
    {
      name: "Défis",
      data: challenges,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.4,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454", "#9C27B0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Montant total des opérations par mois",
      align: "left",
    },
    grid: {
      borderColor: "#5D5A88",
      row: {
        colors: ["#d6d6e1", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      title: {
        text: "Mois",
        style: {
          color: "#5D5A88",
          fontSize: "14px",
          fontFamily: "dm sans, Arial, sans-serif",
          fontWeight: 700,
        },
      },
    },
    yaxis: {
      title: {
        text: "Montant",
        style: {
          color: "#5D5A88",
          fontSize: "14px",
          fontFamily: "dm-sans, Arial, sans-serif",
          fontWeight: 700,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " €";
        },
      },
    },
  };
  return (
    <div>
      <ReactApexChart
          className={`${mc.multipleLineCharts}`}
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default MultipleLineCharts;
