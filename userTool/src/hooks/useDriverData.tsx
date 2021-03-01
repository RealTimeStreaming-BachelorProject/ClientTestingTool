import React, { useContext, useEffect, useState } from "react";
import {SocketContext} from '../App'
import { LATEST_COORDINATES, SUBSCRIBE_TO_DRIVER } from "../socketevents";

export const useDriverData = (
  driverID: string
): { position: [number, number] | undefined; error: string } => {
  const [error, setError] = useState("");
  const [position, setPosition] = useState<[number, number] | undefined>(
    undefined
  );

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    socket.emit(SUBSCRIBE_TO_DRIVER, driverID);
  }, [driverID]);

  useEffect(() => {
    if (!socket) return;
    socket.on(LATEST_COORDINATES, (lastPosition: [number, number]) => {
      console.log(lastPosition);
      setPosition(lastPosition);
    });
    socket.on("connect_error", (error: any) => {
      setError(error.message);
    });
  }, [socket]);

  return { position, error };
};
