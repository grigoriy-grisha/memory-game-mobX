import React from "react";
import { ContainerGameComponent } from "./Components/ContainerGameComponent";
import { Table } from "./Components/Table";
import { Timer } from "./Components/Timer";
import { NotesProvider } from "./NotesContext";
import { RootStateProvider } from "./RootStateContext";

const App: React.FC = () => {
  return (
    <RootStateProvider>
      <ContainerGameComponent />
    </RootStateProvider>
  );
};

export default App;
