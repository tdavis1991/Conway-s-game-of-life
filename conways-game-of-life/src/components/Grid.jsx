import React, {useState} from 'react';
import Cell from './Cell';

function Grid(props){
    
    const numRows = 25;
    const numCols = 50;

     const [grid, setGrid] = useState(() => {
         const rows = []
         for (let i = 0; i < numRows; i++) {
             rows.push(Array.from(Array(numCols), () => false))
         }
         return rows
     });

     return (
         <div 
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}
         >
             {grid.map((rows, i) => 
                rows.map((col, j) => 
                    <div key={`${i}, ${j}`}>
                        <Cell />
                    </div>
                )    
            )}
            
         </div>
     )
}

export default Grid;