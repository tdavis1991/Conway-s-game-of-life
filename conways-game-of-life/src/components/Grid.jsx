import React, { useState, useCallback, useRef, useEffect } from "react";
import '../App.css';
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

function Grid() {
      
      const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < 30; i++) {
          rows.push(Array.from(Array(30), () => 0));
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
                for (let i = 0; i < 30; i++) {
                  for (let k = 0; k < 30; k++) {
                    let neighbors = 0;
                    operations.forEach(([x, y]) => {
                      const newI = i + x;
                      const newK = k + y;
                      if (newI >= 0 && newI < 30 && newK >= 0 && newK < 30) {
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
        }, [speed]);
    
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
                for (let i = 0; i < 30; i++) {
                  rows.push(
                    Array.from(Array(30), () => (Math.random() > 0.7 ? 1 : 0))
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
            
            {/* Grid speed */}
            <label className='label-style'>Grid Speed:</label>
            <div>        
              <button className='small-button' onClick={() => setSpeed(100)}>Fast</button>
              <button className='small-button' onClick={() => setSpeed(500)}>Normal</button>
              <button className='small-button' onClick={() => setSpeed(1000)}>Slow</button>
            </div>
            
            <p id='speed-instructions'>In order to change the speed first stop the cell automation then set different speed.</p>
            
          </div>
          
        
          <div
          
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${30}, 20px)`
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

export default Grid;