import React from "react";
import { Line } from "react-chartjs-2";
import { useState } from "react";

function LineChart({ playerDetails, name }) {
  const newDetails = playerDetails.sort((a, b) => (a.id - b.id))
  const xAxis = newDetails.map((data) => ({course: data?.course, date: new Date(data?.date).toLocaleDateString()}))

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Past Results for {name}</h2>
      <Line
        data={{
          labels: xAxis.map((data) => (data?.course)), 
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