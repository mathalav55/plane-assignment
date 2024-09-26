import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { isArray } from "lodash";
import { generateColors } from "../../utils";
const CustomAreaChart = ({ data, xAxis, yAxis }) => {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    if (yAxis) {
      setColors(
        isArray(yAxis) ? generateColors(yAxis.length) : generateColors(1)
      );
    }
  }, [yAxis]);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        {isArray(yAxis) ? (
          yAxis.map((e, index) => {
            return (
              <Area
                type={"monotone"}
                dataKey={e.value}
                stroke={colors[index]}
                fill={colors[index]}
              />
            );
          })
        ) : (
          <Area
            type={"monotone"}
            dataKey={yAxis}
            stroke={colors[0]}
            fill={colors[0]}
          />
        )}
        <Legend/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
