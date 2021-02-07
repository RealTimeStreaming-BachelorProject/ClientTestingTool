import React, { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5001/clients";

export const useDriverData = (
  driverId: string
): [number, number] | undefined => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [position, setPosition] = useState<[number, number] | undefined>(
    undefined
  );
  useEffect(() => {
    if (socket) return;
    setSocket(SocketIOClient(ENDPOINT));
    return () => {
        if (!socket) return;
        (socket as SocketIOClient.Socket).disconnect();
    }
  },[]);

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
  }, [socket]);

  return position;
};
