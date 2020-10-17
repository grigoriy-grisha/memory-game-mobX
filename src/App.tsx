import React from "react";
import { Table } from "./Components/Table";
import { NotesProvider } from "./NotesContext";


const App: React.FC = () => {
  return (
    <NotesProvider>
        <Table />
    </NotesProvider>
  );
};

export default App;
