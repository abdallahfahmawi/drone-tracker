import { Box, Typography } from "@mui/material";
import { useState } from "react";
import mapIcon from "../../assets/Images/map.png";
import dashboardIcon from "../../assets/Images/dashboard.svg";

type MenuKey = "DASHBOARD" | "MAP";

const SideBar = () => {
  const [active, setActive] = useState<MenuKey>("MAP");

  const menuItems: { key: MenuKey; label: string; icon: string }[] = [
    { key: "DASHBOARD", label: "DASHBOARD", icon: dashboardIcon },
    { key: "MAP", label: "MAP", icon: mapIcon },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#111111",
        width: "100%",
        height: "100vh",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        userSelect: "none",
      }}
    >
      {menuItems.map((item) => {
        const isActive = active === item.key;
        return (
          <Box
            key={item.key}
            component="button"
            onClick={() => setActive(item.key)}
            sx={{
              all: "unset",
              width: "100%",
               maxWidth: "100%",
              boxSizing: "border-box",
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              transition: "background-color .2s",
              backgroundColor: isActive ? "#1a1a1a" : "transparent",
              borderLeft: isActive ? "4px solid #e53935" : "4px solid transparent",
              "&:hover": { backgroundColor: "#1a1a1a" },
            }}
          >
            <Box
              component="img"
              src={item.icon}
              alt={`${item.label} icon`}
              sx={{ width: 28, height: 28, display: "block" }}
            />
            <Typography variant="body2" sx={{ letterSpacing: 1 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SideBar;
