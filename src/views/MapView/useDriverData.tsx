import React, { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client'
const ENDPOINT = "http://localhost:5001"

export const useDriverData = (driverId: string): [number, number] | undefined => {
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)
    const [position, setPosition] = useState<[number, number] | undefined>(undefined)
    useEffect(() => {
        if (socket) return;
        setSocket(SocketIOClient(ENDPOINT))
    })
    useEffect(() => {
        if (!socket) return;
        socket.emit("subscribe-to-driver", driverId);
    },[driverId])
    useEffect(() => {
        if (!socket) return;
        if (!driverId) return;
        socket.on("last-position", (lastPosition: [number, number]) => {
            setPosition(lastPosition)
        })
    },[socket])
    
    return position
}