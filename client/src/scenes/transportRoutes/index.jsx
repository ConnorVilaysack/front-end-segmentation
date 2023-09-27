import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const TransportRoutes = () => {

  const [routesData, setRoutesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from a JSON file (you can replace this with your actual data fetching code)
    fetch("/fakeData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json(); // Parse the JSON data here
        } else {
          throw new Error("Response is not JSON");
        }
      })
      .then((jsonData) => {
        // Handle the JSON data by setting the 'routes' property in the state
        setRoutesData(jsonData.routes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  // Define columns for the DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "route",
      headerName: "Route",
      flex: 0.5,
    },
    {
      field: "expectedArrivalTime",
      headerName: "Expected Arrival Time",
      flex: 1,
    },
    {
      field: "realArrivalTime",
      headerName: "Real Arrival Time",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ROUTES" subtitle="List of Routes" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // Styles for your DataGrid
        }}
      >
        {/* Check if routesData is an array before rendering the DataGrid */}
        {Array.isArray(routesData) ? (
          <DataGrid
            loading={isLoading}
            rows={routesData}
            columns={columns}
            getRowId={(row) => row._id}
            autoPageSize
          />
        ) : (
          // Render a loading indicator or an error message here
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  );
};

export default TransportRoutes;
