import React, { useState } from "react";
import './App.css';
import Grid from './components/Grid';



function App() {
  const [page, setPage] = useState(true)

  return (
    <>
      {
        page 
        ?
        <div className='home'>
          <h1>Welcome to Conway's Game of life</h1>
          <p className='text-style'>The Game of Life (an example of a cellular automaton ) is played on an infinite two-dimensional rectangular grid of cells. Each cell can be either alive or dead. The status of each cell changes each turn of the game (also called a generation) depending on the statuses of that cell's 8 neighbors.</p>
          <h2>Rules</h2>
          <ul>
            <li className='text-style'>Any live cell with two or three live neighbours survives</li>
            <li className='text-style'>Any dead cell with three live neighbours becomes a live cell.</li>
            <li className='text-style'>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
          </ul>
          <button className='small-button' onClick={() => {setPage(!page)}}>Start Game</button>
        </div>
        : 
        <Grid />
      }
    </>
  )
};

export default App;