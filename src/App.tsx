import React from "react";
import { Table } from "./Components/Table";
import { Timer } from "./Components/Timer";
import { NotesProvider } from "./NotesContext";

const App: React.FC = () => {
  const [time, setTime] = React.useState(10);
  const timerRef = React.useRef<any>();

  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => --prev);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!time) {
      console.log(time);
      clearInterval(timerRef.current);
    }
  }, [time]);
  return (
    <NotesProvider>
      <Timer time={time} />
      <Table time={time} />
    </NotesProvider>
  );
};

export default App;
