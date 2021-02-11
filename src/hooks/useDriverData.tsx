import React, { useContext, useEffect, useState } from "react";
import {SocketContext} from '../App'

export const useDriverData = (
  driverId: string
): { position: [number, number] | undefined; error: string } => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState<[number, number] | undefined>(
    undefined
  );

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    socket.emit("subscribe-to-driver-coordinates", driverId);
  }, [driverId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("latest-coordinates", (lastPosition: [number, number]) => {
      console.log(lastPosition);
      setPosition(lastPosition);
    });
    socket.on("connect_error", (error: any) => {
      setError(error.message);
    });
  }, [socket]);

  return { position, error };
};
