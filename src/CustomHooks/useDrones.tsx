import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9013"; // backend server

export const useDroneData = () => {
  const [drones, setDrones] = useState<any[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["polling"],  // match the server
    });

    socket.on("connect", () => {
      console.log("Connected with id:", socket.id);
    });

    socket.on("message", (data) => {
      setDrones([data]); // or push if multiple
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return drones;
};
