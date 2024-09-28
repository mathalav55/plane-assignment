import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { capitalize, isArray } from "lodash";
import { generateColors } from "../../utils";
const CustomRadarChart = ({ data, xAxis, yAxis }) => {
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
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey={xAxis} />
        <PolarRadiusAxis />
        {isArray(yAxis) ? (
          yAxis.map((e, index) => {
            return (
              <Radar
                name={capitalize(e.value)}
                dataKey={e.value}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.6}
                key={index}
              />
            );
          })
        ) : (
          <Radar
            name={capitalize(yAxis)}
            dataKey={yAxis}
            stroke={colors[0]}
            fill={colors[0]}
            fillOpacity={0.6}
          />
        )}
        <Legend/>
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadarChart;
