import React, { useEffect, useState } from 'react'
import SocketIOClient from 'socket.io-client'
const ENDPOINT = "http://localhost:5001"

export const useDriverData = (): [number, number] => {
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
    
    return [55.37651, 10.43341]
    // return position
}