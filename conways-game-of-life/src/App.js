import React, { useState, useCallback, useRef, useEffect } from "react";
import './App.css';
import produce from "immer";

let numRows = 50;
let numCols = 50;

// function grids(gridSize) {
//   if(gridSize === 'small') {
//     let numRows = 25;
//     let numCols = 25;
//     console.log(gridSize)
//   }

//   if(gridSize === 'medium') {
//     let numRows = 50;
//     let numCols = 50;
//     console.log(gridSize)
//   }

//   if(gridSize === 'large') {
//     let numRows = 75;
//     let numCols = 75;
//     console.log(gridSize)
//   }
//   console.log(gridSize)
// }


const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function App() {
  const [generation, setGeneration] = useState(-1)
  const [select, setSelect] = useState()
  const [gridSize, setGridSize] = useState('')
  

  // function selectSize(e) {
  //   setGridSize(e.target.value)


  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   grids(gridSize)
  // }
  

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  useEffect(() => {
    setGeneration(generation + 1)
  }, [grid])

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      //  The rules for the game of life
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', margin: '20px'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button
          className='button'
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>

        {/*randomly set cells on grid*/}
        <button
          className='button'
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          random
        </button>

        {/*clear all cells on grid*/}
        <button
          className='button'
          onClick={() => {
            setGrid(generateEmptyGrid());
            setRunning(false)
            setGeneration(-1)
          }}
        >
          clear
        </button>

        {/*Select Grid size for game*/}
        <form>
          <label className='label-style'>Select Grid size:</label>
          <select name='size' id='grid-size' className='drop-down' value={gridSize}>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
            
          </select>
          <button type='submit'>Size</button>
        </form>

        {/* Select speed for game */}
        <label className='label-style'>Select Speed:</label>
        <select name='speed' id='grid-speed' className='drop-down'>
          <option value='slow'>Slow</option>
          <option value='normal'>Normal</option>
          <option value='fast'>Fast</option>
        </select>

      </div>
      
    
      <div
      
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {/*Generating the grid for the game*/}
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                if(!running) {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  })
                  setGrid(newGrid);
                };
                
              }}
              className={grid[i][k] ? 'on' : 'off'}
              style={{
                width: 20,
                height: 20,
                border: "solid 1px white"
              }}
            />
          ))
        )}
        {/* Counting the generations*/}
        <h2>Generation: {generation}</h2>
      </div>
      
    </div>
  );
};

export default App;