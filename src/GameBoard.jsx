import React from 'react';
import { useState } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';

function GameBoard(props) {
  const rows = [];
  console.log(props)
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1});

  for (let y = 0; y < height; y++) {
    const cells = [];

    for (let x = 0; x < width; x++) {
      cells.push({ x, y });
    }
    rows.push(cells);

  }
  console.log(rows)

  const determineElements = (x, y) => {
    if (x === playerCoords.x && y === playerCoords.y) {
      return <div onClick={() => setPlayerCoords({x: playerCoords.x + 1, y: playerCoords.y + 1})}>rat</div>
    }
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      return <Brick/>
    }
    if (y === 2 && x < width - 5 && x > 1) {
      return <Brick/>
    }
    if (y > 2 && y < height - 2 && x === 2){
      return <Brick/>
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      return <Brick/>
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      return <Brick/>
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      return <Brick/>
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      return <Brick/>
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      return <Brick/>
    }
    if (x === 10 && y < height - 2 && y > height - 9){
      return <Brick/>
    }

    return <Cheese/>
  }

  return (
    <div className="game-board" style={{backgroundColor: 'gray',}}>
      {rows.map((cells, y) => (
        <div key={y} className="row">
          {cells.map(({ x, y }) => (
            <div key={`${x}-${y}`} className="cell">
              {determineElements(x,y)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
