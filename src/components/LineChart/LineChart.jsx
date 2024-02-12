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
              label: "hvjh",
              data: playerDetails.map((data) => data.score_final),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                "rebeccapurple"
              ],
              borderColor: "black",
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