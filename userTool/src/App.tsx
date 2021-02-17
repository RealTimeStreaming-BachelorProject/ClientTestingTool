import React from "react";
import Metrics from "./components/Metrics";
import { useSocket } from "./hooks/useSocket";
import MapView from './views/MapView'

function App() {
  const socket = useSocket();
  return (
    <div className="App" style={{padding: "40px"}}>
      <SocketContext.Provider value={socket}>
        <MapView />
        <Metrics />
      </SocketContext.Provider>
    </div>
  );
}

export const SocketContext = React.createContext<SocketIOClient.Socket | null>(null);

export default App;
