// import { useState, useEffect } from "react";
// import EmptyCell from "../../assets/Empty.png";
// import Cross from "../../assets/Cross.png";
// import Tick from "../../assets/Tick.png";

// function Board() {
//   const [gridCells, setGridCells] = useState([
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//   ]);
//   const [isTickTurn, setIsTickTurn] = useState(true);
//   const [isOver, setIsOver] = useState(false);
//   const [winStateMessage, setWinStateMessage] = useState("Playing...");

//   // CLICK CONTENT PLACEMENT
//   function handleClick(index) {
//     if (isOver) {
//       return;
//     }
//     if (gridCells[index] === "") {
//       const newGridCells = [...gridCells];
//       newGridCells[index] = isTickTurn ? "Tick" : "Cross";
//       setGridCells(newGridCells);
//       setIsTickTurn((prevTurn) => !prevTurn);
//       checkIsOver();
//     }
//   }
//   // IS GAME OVER YET ? WE HAVE WINNERS OR DRAW ?
//   function checkIsOver() {
//     const gameIsOver = handleWinCheck();
//     const isDraw = !gridCells.includes("") && !gameIsOver;

//     if (isDraw) {
//       setIsOver(true);
//       setWinStateMessage("Draw! No player has won.");
//     } else if (gameIsOver) {
//       setIsOver(true);
//       setWinStateMessage(handleWinner());
//     }
//   }
//   // RESET THE GAME
//   function handleResetGame() {
//     setGridCells(["", "", "", "", "", "", "", "", ""]);
//     setIsOver(false);
//     setIsTickTurn(true);
//   }
//   // HANDLE WINNER STATE CHECKS
//   function handleRowWin() {
//     let answer = false;
//     for (let i = 0; i < 9; i += 3) {
//       answer =
//         answer ||
//         (gridCells[i] === gridCells[i + 1] &&
//           gridCells[i] === gridCells[i + 2] &&
//           gridCells[i] !== "");
//     }
//     return answer;
//   }
//   function handleColWin() {
//     let answer = false;
//     for (let i = 0; i < 3; i++) {
//       answer =
//         answer ||
//         (gridCells[i] === gridCells[i + 3] &&
//           gridCells[i] === gridCells[i + 6] &&
//           gridCells[i] !== "");
//       //0,3,6 / 1,4,7 / 2,5,8
//     }
//     return answer;
//   }
//   function handleDiagWin() {
//     return (
//       // main diagonal
//       (gridCells[0] === gridCells[4] &&
//         gridCells[0] === gridCells[8] &&
//         gridCells[0] !== "") ||
//       // secondary diagonal
//       (gridCells[2] === gridCells[4] &&
//         gridCells[2] === gridCells[6] &&
//         gridCells[2] !== "")
//     );
//   }
//   function handleWinCheck() {
//     const winHappened =
//       handleRowWin() || handleColWin() || handleDiagWin();
//     if (winHappened) setIsOver(true);
//     return winHappened;
//   }
//   function handleWinner() {
//     // LOGIC BELOW IS VICE VERSA . IF SOMEONE WINS NOW AND THE STATE CHANGES IT MEANS THE PREV PLAYER HAS WON
//     const winnerPlayer = isTickTurn ? "Cross" : "Tick";
//     return `${winnerPlayer} has won!`;
//   }
//   useEffect(() => {
//     checkIsOver();
//   }, [gridCells, isOver]);

//   return (
//     <div>
//       {/* TITLE CONDITIONAL RENDERING BASED ON GAME OVER OR CONTINUED */}
//       {isOver ? (
//         <h1
//           className="text-8xl text-white text-center cursor-pointer"
//           onClick={handleResetGame}
//         >
//           Reset
//         </h1>
//       ) : (
//         <h1 className="text-8xl text-white text-center">
//           {isTickTurn ? "Tick" : "Cross"}'s Turn
//         </h1>
//       )}
//       <div className="grid grid-cols-3 gap-5 justify-items-center my-12 w-[507px]">
//         {/* GENERATING CELLS */}
//         {gridCells.map((cell, index) => {
//           return (
//             <img
//               key={index}
//               src={
//                 cell === "" ? EmptyCell : cell === "Tick" ? Tick : Cross
//               }
//               alt="empty board cell"
//               className="cursor-pointer"
//               onClick={() => handleClick(index)}
//             />
//           );
//         })}
//       </div>
//       <div className="text-center text-white text-5xl">
//         {winStateMessage}
//       </div>
//     </div>
//   );
// }

// export default Board;

import { useReducer, useEffect } from "react";
import EmptyCell from "../../assets/Empty.png";
import Cross from "../../assets/Cross.png";
import Tick from "../../assets/Tick.png";

const initialState = {
  gridCells: ["", "", "", "", "", "", "", "", ""],
  isTickTurn: true,
  isOver: false,
  winStateMessage: "Playing...",
};

const actionTypes = {
  RESET: "RESET",
  CLICK: "CLICK",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.RESET:
      return initialState;
    case actionTypes.CLICK:
      const { index } = action.payload;
      if (state.isOver || state.gridCells[index] !== "") {
        return state;
      }

      const newGridCells = [...state.gridCells];
      newGridCells[index] = state.isTickTurn ? "Tick" : "Cross";

      return {
        ...state,
        gridCells: newGridCells,
        isTickTurn: !state.isTickTurn,
        isOver: handleWinCheck(newGridCells),
        winStateMessage: getWinStateMessage(newGridCells),
      };
    default:
      return state;
  }
};

const handleWinCheck = (gridCells) => {
  // Implement your winning condition logic here
  // Return true if there is a winner, otherwise false
  return false;
};

const getWinStateMessage = (gridCells) => {
  // Implement your win state message logic here
  // Return the appropriate message
  return "Playing...";
};

function Board() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Additional side effects or checks can be performed here
  }, [state]);

  const handleClick = (index) => {
    dispatch({ type: actionTypes.CLICK, payload: { index } });
  };

  const handleResetGame = () => {
    dispatch({ type: actionTypes.RESET });
  };

  return (
    <div>
      {/* TITLE CONDITIONAL RENDERING BASED ON GAME OVER OR CONTINUED */}
      {state.isOver ? (
        <h1
          className="text-8xl text-white text-center cursor-pointer"
          onClick={handleResetGame}
        >
          Reset
        </h1>
      ) : (
        <h1 className="text-8xl text-white text-center">
          {state.isTickTurn ? "Tick" : "Cross"}'s Turn
        </h1>
      )}
      <div className="grid grid-cols-3 gap-5 justify-items-center my-12 w-[507px]">
        {/* GENERATING CELLS */}
        {state.gridCells.map((cell, index) => (
          <img
            key={index}
            src={cell === "" ? EmptyCell : cell === "Tick" ? Tick : Cross}
            alt="empty board cell"
            className="cursor-pointer"
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="text-center text-white text-5xl">
        {state.winStateMessage}
      </div>
    </div>
  );
}

export default Board;
