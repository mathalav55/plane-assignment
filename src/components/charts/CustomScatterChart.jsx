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
    <ResponsiveContainer width="100%" height={"100%"}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey={xAxis}
          name=""
          unit=""
          label={{ value: _.startCase(xAxis),position: 'insideBottom', offset: '-10' }}
        />
        <YAxis
          type="number"
          dataKey={yAxis}
          name={capitalize(yAxis)}
          unit=""
          label={{
            value: _.startCase(yAxis),
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name={_.startCase(yAxis)} data={data} fill="#8884d8" />
        <Legend wrapperStyle={{bottom: '-2%'}}/>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CustomScatterChart;
