import React, { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import {useDriverServiceUrl} from './useDriverServiceUrl'
const ENDPOINT_LOADBALANCER = "http://localhost:5002/clients";

export const useDriverData = (
  driverId: string
): [number, number] | undefined => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [position, setPosition] = useState<[number, number] | undefined>(
    undefined
  );
  const DRIVER_SERVICE_ENDPOINT = useDriverServiceUrl(ENDPOINT_LOADBALANCER);
  useEffect(() => {
    if (socket) return;
    if (!DRIVER_SERVICE_ENDPOINT) return;
    setSocket(SocketIOClient(DRIVER_SERVICE_ENDPOINT));
    return () => {
        if (!socket) return;
        (socket as SocketIOClient.Socket).disconnect();
    }
  },[DRIVER_SERVICE_ENDPOINT]);

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
