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
const CustomPieChart = ({ data, yAxis, xAxis, isPie }) => {
  const [colors, setColors] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (data) {
      console.log({ xAxis, yAxis });
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
    console.log({ isPie });
  }, [data, yAxis, xAxis]);

  useEffect(() => {
    if (chartData.length) {
      console.log({ chartData });
      setColors(generateColors(chartData.length));
    }
  }, [chartData]);

  return (
    <div>
      <ResponsiveContainer width={'100%'}>
        {chartData.length ? (
          <PieChart>
            <Pie
              data={chartData}
              cx={200}
              cy={200}
              innerRadius={isPie ? 0 : 90}
              outerRadius={140}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            {/* <Tooltip /> */}
            <Legend />
          </PieChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
