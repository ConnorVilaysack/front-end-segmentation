import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Geography = () => {
  const mapRef = useRef(null);
  const [populationData, setPopulationData] = useState({
    "Suncorp Stadium": { population: 500, maxCapacity: 1000 },
    "Brisbane Entertainment Centre": { population: 550, maxCapacity: 1200 },
    "The Gabba": { population: 600, maxCapacity: 1300 },
    "Emporium Hotel Southbank": { population: 500, maxCapacity: 900 },
    "Central Station": { population: 340, maxCapacity: 500 },
    "Roma Street Busway Station": { population: 400, maxCapacity: 700 },
  });
  const circleLayersRef = useRef([]); // To keep track of circle layers

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([-27.470125, 153.021072], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const locations = [
        { name: "Suncorp Stadium", lat: -27.4648, lng: 153.0095 },
        { name: "Brisbane Entertainment Centre", lat: -27.3422, lng: 153.0704 },
        { name: "The Gabba", lat: -27.4858, lng: 153.0381 },
        { name: "Emporium Hotel Southbank", lat: -27.481382543911, lng: 153.02309927206 },
        { name: "Central Station", lat: -27.4662, lng: 153.0262 },
        { name: "Roma Street Busway Station", lat: -27.275829, lng: 153.010703 },
      ];

      // Function to update population density data
      const updatePopulationData = () => {
        const updatedData = { ...populationData };
        // Simulate changing population density values over time for all locations
        for (const location of locations) {
          const { name } = location;
          const newPopulation = populationData[name].population + Math.floor(Math.random() * 100) - 50;
          updatedData[name].population = Math.min(Math.max(newPopulation, 0), updatedData[name].maxCapacity);
        }
        setPopulationData(updatedData);
      };

      // Function to create or update red circles
      const createOrUpdateCircles = () => {
        locations.forEach((location) => {
          const { name, lat, lng } = location;
          const { population, maxCapacity } = populationData[name];

          const existingCircle = circleLayersRef.current.find((circle) =>
            circle.options.locationName === name
          );

          // Calculate the circle radius based on population density and a maximum radius of 500 meters
          const circleRadius = Math.min((population / maxCapacity) * 500, 500);

          if (existingCircle) {
            existingCircle.setRadius(circleRadius);
          } else {
            // Add a new red circle with a fixed radius
            const newCircle = L.circle([lat, lng], {
              color: "red",
              fillColor: "red",
              fillOpacity: 0.5,
              radius: circleRadius,
            });
            newCircle.options.locationName = name;
            newCircle.addTo(map);
            circleLayersRef.current.push(newCircle);
          }
        });
      };

      // Update population data and circles periodically
      setInterval(() => {
        updatePopulationData();
        createOrUpdateCircles();
      }, 5000); // Update every 5 seconds (adjust as needed)

      mapRef.current = map;
    }
  }, [populationData]);

  return <div id="map" style={{ width: "600px", height: "600px" }}></div>;
};

export default Geography;
