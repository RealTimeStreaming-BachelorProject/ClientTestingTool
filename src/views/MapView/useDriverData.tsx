import React, { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client'
const ENDPOINT = "http://localhost:5001"

export const useDriverData = () => {
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null)
    const [position, setPosition] = useState("");
    useEffect(() => {
        if (socket) return;
        setSocket(SocketIOClient(ENDPOINT))
    })
    useEffect(() => {
        if (!socket) return;
        socket.on("last-position", (lastPosition: string) => {
            setPosition(lastPosition)
        })
    },[socket])
    
    return position
}