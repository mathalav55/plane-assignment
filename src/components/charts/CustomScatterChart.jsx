import React from "react";
import _ from "lodash";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
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
            name=""
            unit=""
            label={{ value: _.capitalize(yAxis), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomScatterChart;
