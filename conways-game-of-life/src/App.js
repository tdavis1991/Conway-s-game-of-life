import React, { useState, useCallback, useRef, useEffect } from "react";
import './App.css';
import produce from "immer";


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



function App() {
  const [gridSize, setGridSize] = useState({
    numCols: 30,
    numRows: 30
  })

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < gridSize.numRows; i++) {
      rows.push(Array.from(Array(gridSize.numCols), () => 0));
    }
  
    return rows;
  };
  const [generation, setGeneration] = useState(-1)
  const [speed, setSpeed] = useState(500)
  

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  useEffect(() => {
    setGeneration(generation + 1)
  }, [grid])

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;



    let runSimulation = useCallback(() => {
      if (!runningRef.current) {
        return;
      }
        setGrid(g => {
          //  The rules for the game of life
          return produce(g, gridCopy => {
            for (let i = 0; i < gridSize.numRows; i++) {
              for (let k = 0; k < gridSize.numCols; k++) {
                let neighbors = 0;
                operations.forEach(([x, y]) => {
                  const newI = i + x;
                  const newK = k + y;
                  if (newI >= 0 && newI < gridSize.numRows && newK >= 0 && newK < gridSize.numCols) {
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
          setTimeout(runSimulation, speed);  
    }, [gridSize, speed]);

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
            for (let i = 0; i < gridSize.numRows; i++) {
              rows.push(
                Array.from(Array(gridSize.numCols), () => (Math.random() > 0.7 ? 1 : 0))
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
        {/* Grid size */}
        <label className='label-style'>Grid Size:</label>
        <div> 
          <button className='small-button' onClick={() => setGridSize({numRows: 50, numCols: 50})}>Large</button>
          <button className='small-button' onClick={() => setGridSize({numRows: 30, numCols: 30})}>Normal</button>
          <button className='small-button' onClick={() => setGridSize({numRows: 15, numCols: 15})}>Small</button>
        </div>
        
        {/* Grid speed */}
        <label className='label-style'>Grid Speed:</label>
        <div>        
          <button className='small-button' onClick={() => setSpeed(100)}>Fast</button>
          <button className='small-button' onClick={() => setSpeed(500)}>Normal</button>
          <button className='small-button' onClick={() => setSpeed(1000)}>Slow</button>
        </div>
        
        
      </div>
      
    
      <div
      
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.numCols}, 20px)`
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