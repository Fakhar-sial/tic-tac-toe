import { useState, useEffect } from "react";
import Cell from "./Cell1";
import CellFinal from "./CellFinal";

function Board() {
  const [player, setPlayer] = useState(1);
  const [cells, setCells] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    // Winner Check
    const combos = [
      [cells[0], cells[1], cells[2]],
      [cells[3], cells[4], cells[5]],
      [cells[6], cells[7], cells[8]],
      [cells[0], cells[3], cells[6]],
      [cells[1], cells[4], cells[7]],
      [cells[2], cells[5], cells[8]],
      [cells[2], cells[4], cells[6]],
      [cells[0], cells[4], cells[8]],
    ];

    // Straight Check
    for (let i = 0; i < combos.length; i++) {
      if (
        combos[i][0] !== 0 &&
        combos[i][0] === combos[i][1] &&
        combos[i][0] === combos[i][2]
      ) {
        setWinner(true);
        console.log("We got Winner");
        break;
      }
    }
  }, [cells]);

  const updateCell = (index) => {
    if (!winner) {
      const updatedCells = [...cells];
      updatedCells[index] = player;
      setCells(updatedCells);
      setPlayer(player === 1 ? 2 : 1);
    }
  };

  return (
    <>
      {winner ? (
        <h2>Player {player === 1 ? 2 : 1} Wins</h2>
      ) : (
        <h2>Player {player}</h2>
      )}
      <div className="board">
        {cells.map((item, index) =>
          item ? (
            <CellFinal key={Math.random()} value={item} />
          ) : (
            <Cell
              key={Math.random()}
              player={player}
              updateCell={() => updateCell(index)}
            />
          )
        )}
      </div>
    </>
  );
}

export default Board;
