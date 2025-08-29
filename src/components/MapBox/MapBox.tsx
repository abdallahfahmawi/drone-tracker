import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDroneData } from "../../CustomHooks/useDrones";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJkYWxsYWhmYWhtYXdpMSIsImEiOiJjbWV3a3NvbnQwanJsMmlyMjdodzhnaHNmIn0.6whmHCggwssU4xOZtAnmjQ";

const MapBox = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  const drones = useDroneData(); // live drone data from backend

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [35.91, 31.95],
      zoom: 12,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

useEffect(() => {
  if (!mapRef.current) return;

  drones.forEach((drone: any, idx: number) => {
    const feature = drone.features?.[0];
    const coords = feature.geometry.coordinates;
    const props = feature.properties;

    const regParts = props.registration?.split("-") || [];
    const afterDash = regParts[1] || "";
    const isAllowed = afterDash.startsWith("B");
    const pathId = `path-${idx}`;

    if (!markersRef.current[props.serial]) {
      const el = document.createElement("div");
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = isAllowed ? "green" : "red";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      markersRef.current[props.serial] = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color:white; font-size:12px;">
              <strong>${props.Name}</strong><br/>
              Altitude: ${props.altitude} m <br/>
              Pilot: ${props.pilot} <br/>
              Org: ${props.organization} <br/>
              Serial: ${props.serial} <br/>
              Registration: ${props.registration} <br/>
            </div>
          `)
        )
        .addTo(mapRef.current!);
    } else {
      markersRef.current[props.serial].setLngLat(coords);
      const el = markersRef.current[props.serial].getElement();
      el.style.backgroundColor = isAllowed ? "green" : "red";
    }
    if (!mapRef.current!.getSource(pathId)) {
      mapRef.current!.addSource(pathId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [coords] },
          properties: { isAllowed },
        },
      });

      mapRef.current!.addLayer({
        id: pathId,
        type: "line",
        source: pathId,
        paint: {
          "line-color": ["case", ["get", "isAllowed"], "#00ff00", "#ff0000"],
          "line-width": 3,
        },
      });
    } else {
      const source = mapRef.current!.getSource(pathId) as mapboxgl.GeoJSONSource;
      const oldData = source._data as any;
      const newCoords = [...oldData.geometry.coordinates, coords];
      source.setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: newCoords },
        properties: { isAllowed },
      });
    }
  });
}, [drones]);

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        overflowX: "hidden",
        top: 0,
        right: 0,
        zIndex: 0,
      }}
      id="map-container"
      ref={mapContainerRef}
    />
  );
};

export default MapBox;
