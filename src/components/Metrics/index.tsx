import React, { useContext, useEffect, useRef, useState } from 'react'
import { SocketContext } from '../../App'

export default function Metrics() {
    const socket = useContext(SocketContext)
    const [time, setTime] = useState<Date | null>(null);
    const [delay, setDelay] = useState(0);
    const [started, setStarted] = useState(false);
    const timeRef = useRef<Date | null>();

    timeRef.current = time;

    useEffect(() => {
        if (!socket) return;
        socket.on("pong", () => {
            if (!timeRef?.current) return;
            const milliseconds = new Date().getTime() - timeRef.current?.getTime();
            setDelay(milliseconds)
        })
    },[socket])

    const handleClick = () => {
        setStarted(true);
        setInterval(() => {
            setTime(new Date());
            socket?.emit("ping");
        },1000)
    }

    return (
        <div style={{background: "rgba(0,0,0,0.2)", padding: "10px", position: "fixed", bottom: "20px", left: "20px", width: "200px", zIndex: 999, borderRadius: "10px"}}>
            <h2 style={{marginTop: "0px"}}>Metrics</h2>
            <button onClick={handleClick} disabled={started}>START TEST</button>
            <p><strong>Latency: </strong>{delay} ms</p>
        </div>
    )
}
