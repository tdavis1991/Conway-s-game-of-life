import React, { useState } from 'react';

function Cell(props) {
    const [status, setStatus] = useState(false)

    return (
        <div onClick={() => {
            setStatus(!status)
        }}
            style={{
                height: '20px', 
                width: '20px', 
                backgroundColor: status ? 'red' : 'black', 
                border: 'solid 1px white'
                }}
        >

        </div>
    )
}


export default Cell;