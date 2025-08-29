// src/components/DronePanel.tsx
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useDroneData } from "../../CustomHooks/useDrones";

const DronePanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const drones = useDroneData();
  
  return (
    <Box
      sx={{
        width: 360,
        backgroundColor: "#0f0f0f",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "85px",
        left: "130px"
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: "bold", letterSpacing: 1 }}
      >
        DRONE FLYING
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(_, val) => setTabIndex(val)}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "red", height: 3 } }}
        sx={{
          px: 2,
          "& .MuiTab-root": {
            color: "gray",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "0.9rem",
          },
          "& .Mui-selected": {
            color: "white",
          },
        }}
      >
        <Tab label="Drones" />
        <Tab label="Flights History" />
      </Tabs>

      {/* Content */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {tabIndex === 0 &&
          (drones.length === 0 ? (
            <Typography variant="body2" sx={{ color: "gray" }}>
              No drones connected...
            </Typography>
          ) : (
            drones.map((drone, idx) => {
              const props = drone?.features?.[0]?.properties;
              return (
                <Box
                  key={idx}
                  sx={{
                    backgroundColor: "#1c1c1c",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    position: "relative",
                  }}
                >
                  {/* Status dot absolutely positioned */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 70,
                      right: 16,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor:
                        props?.altitude > 50 ? "red" : "limegreen",
                    }}
                  />

                  {/* Drone name */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {props?.Name || "Unnamed Drone"}
                  </Typography>

                  {/* Serial + Registration */}
                  <Box sx={{ display: "flex", gap: 4, mb: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        Serial #
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {props?.serial}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        Registration #
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {props?.registration}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Pilot + Organization */}
                  <Box sx={{ display: "flex", gap: 4 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        Pilot
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {props?.pilot}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        Organization
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {props?.organization}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ))}

        {tabIndex === 1 && (
          <Typography variant="body2" sx={{ color: "gray" }}>
            Flight history data will appear here...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DronePanel;
