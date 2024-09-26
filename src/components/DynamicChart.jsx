import React from "react";
import DonutChart from "./charts/CustomDonutChart";
import CustomScatterChart from "./charts/CustomScatterChart";
import CustomBarChart from "./charts/CustomBarChart";
import { isArray } from "lodash";
import CustomLineChart from "./charts/CustomLineChart";
import CustomAreaChart from "./charts/CustomAreaChart";
import CustomRadarChart from "./charts/CustomRadarChart";
const DynamicChart = (config) => {
  const chartComponents = {
    donut: DonutChart,
    scatterplot: CustomScatterChart,
    bar_chart: CustomBarChart,
    line_chart: CustomLineChart,
    area_chart: CustomAreaChart,
    pie_chart: DonutChart,
    radar_chart: CustomRadarChart,
  };
  const Chart = chartComponents[config.chartType.value];
  return (
    <>
      {Chart ? (
        React.createElement(Chart, {
          data: config.data,
          xAxis: config.xAxis?.value,
          yAxis: isArray(config.yAxis) ? config.yAxis : config.yAxis?.value,
          isPie: config.chartType?.value == "pie_chart"
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default DynamicChart;
