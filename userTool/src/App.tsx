import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import Metrics from "./components/Metrics";
import Navigation from "./components/Navigation";
import { useSelectedView, View, ViewContext } from "./hooks/useSelectedView";
import { useSocket } from "./hooks/useSocket";
import MapView from "./views/MapView";
import PackageView from "./views/PackageView";

function App() {
  const socket = useSocket();
  const [selectedView, setSelectedView] = useSelectedView();
  return (
    <div className="App" style={{ padding: "0 40px 40px 40px" }}>
      <SocketContext.Provider value={socket}>
        <ViewContext.Provider value={[selectedView, setSelectedView]}>
          <Navigation />
          <Divider style={{marginBottom: "20px"}} />
          {selectedView === View.MAP_VIEW && (
            <>
              <MapView />
              <Metrics />
            </>
          )}
          {selectedView === View.PACKAGE_VIEW && <PackageView />}
        </ViewContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export const SocketContext = React.createContext<SocketIOClient.Socket | null>(
  null
);

export default App;
