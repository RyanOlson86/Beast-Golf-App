import React from "react";
import { Line } from "react-chartjs-2";
import { useState } from "react";

function LineChart({ playerDetails, name }) {

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Past Results for {name}</h2>
      <Line
        data={{
          labels: playerDetails.map((data) => data?.course), 
          datasets: [
            {
              label: "Score",
              data: playerDetails.map((data) => data.score_final),
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