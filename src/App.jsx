import "./App.css";
import StartingText from "./Components/StartingText/StartingText";
import Board from "./Components/Board/Board";
import { useState } from "react";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  function startGame() {
    setIsGameStarted(true);
  }
  return (
    <>
      {!isGameStarted && <StartingText startGame={startGame} />}
      {isGameStarted && <Board />}
    </>
  );
}

export default App;
