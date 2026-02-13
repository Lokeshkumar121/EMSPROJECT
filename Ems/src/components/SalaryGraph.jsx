import { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import axios from "axios";
import { API_BASE } from "../config/api";

export default function SalaryGraph({ employeeId }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!employeeId) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#0f0f0f" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#1f1f1f" },
        horzLines: { color: "#1f1f1f" },
      },
    });

    // ✅ NEW WAY (v5+)
    const lineSeries = chart.addSeries(LineSeries, {
      color: "#00ff88",
      lineWidth: 2,
    });

    axios.get(`${API_BASE}/employees/${employeeId}/salary`)
      .then(res => {
        const history = res.data.salaryHistory || [];

        const formattedData = history.map(h => ({
          time: h.date.split("T")[0],
          value: h.salary,
        }));

        lineSeries.setData(formattedData);
      });

    return () => chart.remove();

  }, [employeeId]);

  return <div ref={chartContainerRef} />;
}
