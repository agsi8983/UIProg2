/**
 * File: GameBoard.jsx 
 * 
 * This file contains the game logic of RatMan, which includes navigating the rat,
 * collecting cheese and game over. 
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import React, { useState, useEffect, useContext } from 'react';
import Brick from './Brick';
import Cheese from './Cheese';
import Rat from './Rat';
import Cat from './Cat';
import LanguageContext from './LanguageContext';
import useSound from 'use-sound';
import chew from './audio/chew.mp3'
import GameOver from '../screens/GameOver';
import { useNavigate } from 'react-router-dom';


function GameBoard(props) {
  const [gameboard,setGameboard] = useState([]); // state for gameboard 
  const { width, height } = props;
  const [playerCoords, setPlayerCoords] = useState({x: 1, y: 1}); // state for the player's position
  const [open, setOpen] = useState(false) // state for Rat open or closed
  const [direction, setDirection] = useState('r') // r(ight), l(eft), u(p), d(own). Direction to go next tick.
  const [points, setPoints] = useState(0);  // state for player's score 
  const language = useContext(LanguageContext); // state for current language 

  // TODO: change to volume: 0.1 or 0.2 debugging done
  const [playChew] = useSound(chew, {volume:0}); // state for sound effect: eatCheese

  const [isPlaying, setIsPlaying] = useState(true);  // state for game over
  const [catPosition, setCatPosition] = useState({x:1, y:8})

  // Sets the Direction state according to keyboard input
  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'w':
        case 'ArrowUp':
          setDirection('u')
          break
          case 'a':
            case 'ArrowLeft':
              setDirection('l')
              break
              case 's':
                case 'ArrowDown':
                  setDirection('d')
                  break
                  case 'd':
                    case 'ArrowRight':
                      setDirection('r')
                      break
    }
  }

  // moves player according to the Direction state
  const move = () => {
    let newCoords = {}
  
    switch (direction) {
      // Right 
      case 'r':
        newCoords = { x: (playerCoords.x + 1) % width, y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      // Left 
      case 'l':
        newCoords = { x: (playerCoords.x - 1) < 0 ? width : (playerCoords.x - 1), y: playerCoords.y}
        if (!isBrick(newCoords.x, newCoords.y)){
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }
        break
      // Up 
      case 'u':
        newCoords = { x: playerCoords.x, y: (playerCoords.y - 1) < 0 ? height : (playerCoords.y - 1)}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }       
        break
      // Down 
      case 'd':
        newCoords = { x: playerCoords.x, y: (playerCoords.y + 1) % height}
        if (!isBrick(newCoords.x, newCoords.y)) {
          setPlayerCoords(newCoords)
          eatCheese(gameboard,newCoords.x,newCoords.y)
          moveCat(catPosition)
        }

        break
    }
  }
  // Add eventlistner for keypresses. When a key is pressed, handleKeyPress is called.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  },[gameboard, playerCoords.x, playerCoords.y])

  // Change the open state for Rat and player coordinates every 300 ms.
  useEffect(() => {
    setTimeout(() => { 
      setOpen(!open)
      move()
    }, 200)
  }, [open])
  //setTimeout(() => setOpen(!open), 500)
  

// Creates a game board with empty cells as a matrice
useEffect(() => {
    // cellValue indicates type of cell 
    let cellValue = ''
    let blankRows = [];
    for (let y = 0; y < height; y++) {
      const cells = [];
      for (let x = 0; x < width; x++) {
        // x and y are coordinates for the cell 
        cells.push({ x, y, cellValue });
      }
      blankRows.push(cells);
    }
    setGameboard(blankRows);
  },[]);
 
  // Function that updates the cell value of a cell, 
  // returns the updated gameboard.
  // 
 function updateCellValue(gameboard, x, y, newValue){
  if(gameboard[y]){
    let cell = gameboard[y][x];
    if(cell){
      if(cell.cellValue === 'empty' || cell.cellValue === 'rat'){
        return gameboard;
      } else {
        cell.cellValue = newValue;
      }
      }
    return gameboard;
 }
}

// Calculates the adjacent cells, from the position of the Cat 
// The adjacent cells are either to the left, right, up or down. 
// 
function adjacentCells(catPosition){
  let adjCells = {}

  // If Cat is positioned on the x-axis, we only have 3 possible adjacent cells
  /*if(catPosition.x === 0 && catPosition.y !== 0){
    console.log('x === 1 // 11')
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y },
      { x: catPosition.x, y: (catPosition.y + 1) }, 
      { x: catPosition.x, y: (catPosition.y - 1) }
    ]
  // If Cat is positioned on the y-axis, we only have 3 possible adjacent cells 
  } else if (catPosition.y === 1 && catPosition.x !== 1){
    console.log('y === 1')
    adjCells = [
      { x: catPosition.x, y: (catPosition.y + 1) }, 
      { x: (catPosition.x + 1), y: catPosition.y }, 
      { x: (catPosition.x - 1), y: catPosition.y }
    ]
  // If Cat is positioned 
  } else if (catPosition.x === 1 && catPosition.y === 1 || catPosition.x === 11 && catPosition.y === 11 || ){
    console.log('x === 1 && y === 1')
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y }, 
      { x: catPosition.x, y: (catPosition.y + 1) }
    ]
  } else {*/
    
    adjCells = [
      { x: (catPosition.x + 1), y: catPosition.y },
      { x: (catPosition.x - 1), y: catPosition.y },
      { x: catPosition.x, y: (catPosition.y + 1) },
      { x: catPosition.x, y: (catPosition.y - 1) }
    ]
  
  return adjCells;
}

// Calculates possible moves for the Cat  
// 
function possibleMoves(catPosition){
  // Calculate adjacent cells first 
  let adjCells = adjacentCells(catPosition);
  let newMoves = []
  for(let i = 0; i < adjCells.length; i ++){
    // Check if the cell is a brick 
    if(!isBrick(adjCells[i].x, adjCells[i].y)){
      // If not, we add the possible move to the array newMoves 
      let cell = ({ x: adjCells[i].x, y: adjCells[i].y });
      newMoves.push(cell);
    }
  }
  return newMoves;
}

// Generates a random int within the interval of variables min and max 
// 
function getRandomInt(arrayLength) {
  return Math.floor(Math.random() * (arrayLength)); 
}

// Moves the cat to a new adjacent cell, which is chosen randomly 
// 
function moveCat(catPosition){
  // First calculate pssible moves 
  let moves = possibleMoves(catPosition);
  // Randomize choice of next move, based on length of moves 
  let randNum = getRandomInt(moves.length);
  // Next move is then calculated 
  let nextMove = moves[randNum];
  // And the cat is moved to this randomly chosen cell 
  setCatPosition(nextMove);
}

/**
 * Checks if the cheese of a cell is eaten 
 * @param {*} gameboard The game board
 * @param {*} x X coordinate of the cell
 * @param {*} y Y coordinate of the cell 
 * @returns true if cell is empty, false otherwise 
 */
function isCheeseEaten(gameboard,x,y){
  let cell = gameboard[y][x]
  if (cell && cell.cellValue === 'empty' || cell && cell.cellValue === 'rat'){
    return true;
  }
  return false;
}

/**
 * Eats a cheese and increment score by one 
 * @param {*} gameboard The game board  
 * @param {*} x The x coordinate of the cell
 * @param {*} y The y coordinate of the cell 
 * @returns the updated game board 
 */
  function eatCheese(gameboard, x,y){
    let cell = gameboard[y][x]
    console.log('cell.cellvalue', cell.cellValue)
    if(cell && !isCheeseEaten(gameboard,x,y)){
      // Increment score by one
      incrementPoints()
      // Update cell value that it is empty 
      updateCellValue(gameboard,x,y,'empty')
      // Plays sound effect 
      playChew();
      // Return the updated game board 
      return gameboard;
    } else {
      console.log('already eaten')
    // Return updated game board
      return gameboard;
  }
}
  /**
   * Decrement lives of player or points? 
   */
  function collision(){
    // TODO: collision, decrement lives? 
    setIsPlaying(false);
  }

  /**
   * Increments point counter by one 
   * @returns the incremented point counter
   */
  function incrementPoints(){
    let p = 0;
    p = points + 1;
    return(setPoints(p));
  }
  
  /**
   * Decrements point counter by one
   * @returns The decremented point counter
   */
  function decrementPoints(){
    let p = 0;
    p = points - 1;
    console.log('Decrements score')
    return(setPoints(p));
  }
  
  // Checks if a cell is a brick 
  const isBrick = (x, y) => {
    if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
      return true
    }
    if (y === 2 && x < width - 5 && x > 1) {
      return true
    }
    if (y > 2 && y < height - 2 && x === 2){
      return true
    }
    if (x === 4 && y < height - 2 && y > height - 8){
      return true
    }
    if (x === 5 && y < height - 5 && y > height - 8){
      return true
    }
    if (x === 6 && ((y < height - 5 && y > height - 8) || (y < height - 2 && y > height - 5))){
      return true
    }
    if (x === 7 && y < height - 2 && y > height - 5){
      return true
    }
    if (x === 8 && ((y < height - 2 && y > height - 6) || (y === height - 7))){
      return true
    }
    if (x === 10 && y < height - 2 && y > height - 9){ 
      return true
    }
    return false

  }

  // Determines what type of elements are in each cell 
  const determineElements = (gameboard, x, y) => {
    if(x === catPosition.x && y === catPosition.y){
      //console.log('Cat pos: ', catPosition.x, catPosition.y)
      updateCellValue(gameboard,x,y,'cat')
      return <Cat/>
    }
    if(catPosition.x === playerCoords.x && catPosition.y === playerCoords.y){
      console.log('collision - game over');
    }
    if (x === playerCoords.x && y === playerCoords.y) {
      updateCellValue(gameboard,x,y,'rat')
      return <Rat open={open} direction={direction}/>
    }
    if (isBrick(x, y)) {
      updateCellValue(gameboard,x,y,'brick')
      return <Brick/>
    }
    if(isCheeseEaten(gameboard,x,y)){
      return;
    }
    updateCellValue(gameboard,x,y,'cheese')
    return <Cheese/>
  }

    return (
      
      <> 
      { isPlaying ?  
        Text 
       : <GameOver> Text </GameOver>}
        <div className='body' 
          style={{
            flexDirection:'row', 
            justifyContent:'space-evenly',
            fontSize:30, 
            fontWeight:'bold'}}>
            {language.score.titleText}{points}
        </div>
        <div className="game-board" style={{backgroundColor: 'gray' }}>
          {gameboard.map((cells, y) => (
            <div key={y} className="row" style={{ }}>
              {cells.map(({ x, y }) => (
                <div key={`${x}-${y}`} className="cell" style={{ color: 'gray'}}>
                  {determineElements(gameboard, x,y)}
                </div>
              ))}
            </div>
          ))}
        </div> 
    </>
  );
}

export default GameBoard;
