import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React, { useContext } from "react";
import MapIcon from "@material-ui/icons/Map";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { View, ViewContext } from "../../hooks/useSelectedView";

export default function Navigation() {
  const [viewContext, setViewContext] = useContext(ViewContext);
  if (!setViewContext) return <p>Error loading navigation</p>;
  return (
    <BottomNavigation
      value={ViewContext}
      onChange={(event, newValue) => {
        setViewContext(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Map"
        icon={<MapIcon />}
        value={View.MAP_VIEW}
      />
      <BottomNavigationAction
        label="Package"
        icon={<LocalShippingIcon />}
        value={View.PACKAGE_VIEW}
      />
    </BottomNavigation>
  );
}
