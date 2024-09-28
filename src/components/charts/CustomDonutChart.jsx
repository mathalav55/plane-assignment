import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { generateColors } from "../../utils";
import { isArray } from "lodash";
const CustomPieChart = ({ data, yAxis, xAxis, isPie }) => {
  const [colors, setColors] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (data) {
      if(isArray(yAxis)){
        yAxis = yAxis[0].value
      }
      const _chartData = data
        .map((e) => {
          if (e[yAxis] && e[xAxis])
            return {
              name: e[xAxis],
              value: parseInt(e[yAxis]),
            };
          return null;
        })
        .filter((x) => x);
      setChartData(_chartData);
    }
  }, [data, yAxis, xAxis]);

  useEffect(() => {
    if (chartData.length) {
      setColors(generateColors(chartData.length));
    }
  }, [chartData]);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart width={300} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={isPie ? 0 : 90}
          outerRadius={140}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          label
        >
          50%
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
