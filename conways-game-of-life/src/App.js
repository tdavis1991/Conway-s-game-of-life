import React, {useState} from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
  const [running, setRunning] = useState(false)
  return(
    <div>
      <h1>Conway's Game of Life</h1>
      <Grid />
      <button onClick={() => setRunning(!running)}>
        {running ? 'stop': 'start'}
      </button>
    </div>
  );
}

export default App;
