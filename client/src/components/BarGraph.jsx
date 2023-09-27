import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ isDashboard = false }) => {
  const [routeCounts, setRouteCounts] = useState({});
  const [error, setError] = useState(null);
  const chartRef = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    // Fetch data from fakeData.json
    fetch('/fakeData.json') // Replace with the actual path to your JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log('Fetched Data:', json);
        // Count the frequency of recurring routes
        const counts = {};
        json.routes.forEach((item) => {
          const { route } = item;
          if (counts[route]) {
            counts[route]++;
          } else {
            counts[route] = 1;
          }
        });
        setRouteCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  useEffect(() => {
    // Create or update the bar chart once data is available
    if (Object.keys(routeCounts).length > 0) {
      if (chartRef.current) {
        // Destroy the existing chart
        chartRef.current.destroy();
      }
      createBarChart(routeCounts);
    }
  }, [routeCounts]);
  const createBarChart = (data) => {
    const labels = Object.keys(data);
    const counts = Object.values(data);
  
    const ctx = document.getElementById('barChart').getContext('2d');
  
    // Generate an array of random colors for the bars
    const randomColors = Array.from({ length: labels.length }, () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
    );
  
    // Create the new chart
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Count',
            data: counts,
            backgroundColor: randomColors, // Use the array of random colors
            borderWidth: 1,
            barPercentage:0.5,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  

  return (
    <div>
      
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <canvas id="barChart" width={400} height={250}></canvas>
      )}
    </div>
  );
};

export default BarGraph;
