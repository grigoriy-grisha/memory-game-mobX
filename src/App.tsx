import React from "react";
import { ContainerGameComponent } from "./Components/ContainerGameComponent";
import { RootStateProvider } from "./RootStateContext";

const App: React.FC = () => {
  return (
    <RootStateProvider>
      <ContainerGameComponent />
    </RootStateProvider>
  );
};

export default App;
