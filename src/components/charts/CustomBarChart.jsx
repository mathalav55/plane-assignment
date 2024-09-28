import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { generateColors } from "../../utils";
import _, { isArray } from "lodash";
const CustomBarChart = ({ data, xAxis, yAxis }) => {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    setColors(
      isArray(yAxis) ? generateColors(yAxis.length) : generateColors(1)
    );
  }, [yAxis]);
  const [isStacked, setStacked] = useState(false);
  return (
    <>
      <div>
        {isArray(yAxis) && yAxis.length > 1 ? (
          <div className="flex gap-2 justify-end">
            <input
              type="checkbox"
              name=""
              id=""
              checked={isStacked}
              onChange={(e) => {
                setStacked(e.target.checked);
              }}
            />
            Stacked
          </div>
        ) : (
          <></>
        )}
      </div>
      <ResponsiveContainer width={'100%'} maxHeight={400} height={'100%'}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          width={500}
          height={400}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} label={{ value: _.startCase(xAxis),position: 'insideBottom', offset: '-10' }} />
          <YAxis />
          <Tooltip />
          <Legend formatter={(value) => _.startCase(value)} wrapperStyle={{bottom: '-2%'}} />
          {isArray(yAxis) ? (
            yAxis.map((e, index) => {
              return (
                <Bar
                  key={index}
                  dataKey={e.value}
                  fill={colors[index]}
                  stackId={isStacked ? "a" : null}
                />
              );
            })
          ) : (
            <Bar dataKey={yAxis} fill={colors[0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomBarChart;
