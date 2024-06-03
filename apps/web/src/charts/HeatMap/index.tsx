/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useRef } from "react";
import useSWR from "swr";
import * as echarts from "echarts";
import { Box } from "@chakra-ui/react";
import { NavigationDispatcherContext } from "../../NavigationContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

const HeatmapChart = ({ from, to }) => {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resizer;

  const dispatchDrawerState = useContext(NavigationDispatcherContext);

  const { data, error } = useSWR(
    `http://localhost:3000/health?from=${from}`,
    fetcher
  );

  useEffect(() => {
    if (ref.current && data) {
      const chartDom = ref.current;
      const myChart = echarts.init(chartDom);

      // Extract unique timestamps and format as needed
      const uniqueTimestamps = [
        ...new Set(data.map((item) => new Date(item.timestamp).toISOString())),
      ];

      const days = [...new Set(data.map((item) => item.flow_name))];

      const processedData = data.map((item) => {
        const timestampIndex = uniqueTimestamps.indexOf(
          new Date(item.timestamp).toISOString()
        );
        const dayIndex = days.indexOf(item.flow_name);
        let statusValue;

        switch (item.status) {
          case "up":
            statusValue = 1;
            break;
          case "partially up":
            statusValue = 0.5;
            break;
          case "down":
            statusValue = 0;
            break;
          default:
            statusValue = "-";
        }

        return [timestampIndex, dayIndex, statusValue];
      });

      const option = {
        tooltip: {
          position: "top",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: uniqueTimestamps,
          splitArea: {
            show: true,
          },
          axisLabel: {
            formatter: function (value) {
              const date = new Date(value);
              return date.getHours() + ":" + date.getMinutes();
            },
          },
        },
        yAxis: {
          type: "category",
          data: days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          show: false, // Set this to false to hide the visual map
          inRange: {
            color: ["red", "orange", "green"], //From smaller to bigger value ->
          },
          pieces: [
            { value: 1, label: "Up", color: "green" }, // Green for 'up'
            { value: 0.5, label: "Partially Up", color: "orange" }, // Orange for 'partially up'
            { value: 0, label: "Down", color: "red" }, // Red for 'down'
          ],
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: processedData,
            visualMap: false,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      myChart.on("click", "series", () => {
        dispatchDrawerState({
          type: "navigation",
          payload: {
            isOpen: true,
          },
        });
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
      resizer = () => {
        myChart.resize();
      };

      window.addEventListener("resize", resizer);
    }
    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, [data]);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box>
      <Box ref={ref} style={{ height: "500px" }} p={"0.8rem"} />
    </Box>
  );
};

export default HeatmapChart;
