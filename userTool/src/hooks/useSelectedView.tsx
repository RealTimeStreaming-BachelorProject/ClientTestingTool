import React, { useState } from "react";

export enum View {
  MAP_VIEW = "MAP_VIEW",
  PACKAGE_VIEW = "PACKAGE_VIEW",
}

export const useSelectedView = (): [
  View,
  React.Dispatch<React.SetStateAction<View>>
] => {
  const [selectedView, setSelectedView] = useState<View>(View.MAP_VIEW);
  return [selectedView, setSelectedView];
};

export const ViewContext = React.createContext<
  [View, React.Dispatch<React.SetStateAction<View>> | null]
>([View.MAP_VIEW, null]);
