import React from "react";
import _, { capitalize } from "lodash";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Legend,
} from "recharts";

const CustomScatterChart = ({ data, xAxis, yAxis }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey={xAxis}
            name=""
            unit=""
            label={{ value: _.capitalize(xAxis), position: "insideBottom", offset: 0 }}
          />
          <YAxis
            type="number"
            dataKey={yAxis}
            name={capitalize(yAxis)}
            unit=""
            label={{ value: _.capitalize(yAxis), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name={capitalize(yAxis)} data={data} fill="#8884d8" />
          <Legend/>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomScatterChart;
