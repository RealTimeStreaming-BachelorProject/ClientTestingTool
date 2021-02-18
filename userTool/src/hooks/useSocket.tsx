import { useEffect, useState } from "react";
import SocketIOClient from "socket.io-client";
import { useDriverServiceUrl } from "./useDriverServiceUrl";

const ENDPOINT_LOADBALANCER = "http://localhost:5002/clients";

export const useSocket = (): SocketIOClient.Socket | null => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const DRIVER_SERVICE_ENDPOINT = "ws://localhost:5002/clients"; // CHANGE THIS BACK TO ENDPOINT_LOADBALANCER if not in dev mode

  useEffect(() => {
    if (socket) return;
    if (!DRIVER_SERVICE_ENDPOINT) return;
    setSocket(SocketIOClient(DRIVER_SERVICE_ENDPOINT));
    return () => {
      if (!socket) return;
      (socket as SocketIOClient.Socket).disconnect();
    };
  }, [DRIVER_SERVICE_ENDPOINT]);

  return socket;
};
