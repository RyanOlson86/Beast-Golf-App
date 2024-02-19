import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ playerDetails, name }) {
  // sort array by id so most recent match is the last data point on the chart
  const newDetails = playerDetails.sort((a, b) => (a.id - b.id))

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Past Results for {name}</h2>
      <Line
        data={{
          labels: newDetails.map((data) => (data?.course)), 
          datasets: [
            {
              label: "Score",
              data: newDetails.map((data) => data.score_final),
              backgroundColor: [
                '#252df5'
              ],
              borderColor: "#252df5",
              borderWidth: 2
            }
          ]
        }}
        options={{
          plugins: {
            legend: {
              display: false
            },
          }
        }}
      />
    </div>
  );
}
export default LineChart;