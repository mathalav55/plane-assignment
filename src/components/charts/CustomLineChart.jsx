import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateColors } from "../../utils";
const CustomLineChart = ({ data, xAxis, yAxis }) => {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    if (yAxis) {
      setColors(
        isArray(yAxis) ? generateColors(yAxis.length) : generateColors(1)
      );
    }
  }, [yAxis]);
  return (
    <>
      <ResponsiveContainer width="100%" height={'100%'}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          {isArray(yAxis) ? (
            yAxis.map((e, index) => {
              return (
                <Line
                  type={"monotone"}
                  dataKey={e.value}
                  stroke={colors[index]}
                  key={index}
                />
              );
            })
          ) : (
            <Line type={"monotone"} dataKey={yAxis} stroke={colors[0]} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;
