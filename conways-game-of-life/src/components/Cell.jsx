import React, { useState } from 'react';

function Cell() {
    const [status, setStatus] = useState(false)

    return (
        <div onClick={() => {
            setStatus(!status)}
            } 
            style={{
                height: '20px', 
                width: '20px', 
                backgroundColor: status ? 'black' : undefined, 
                border: 'solid 1px black'
                }}
        >

        </div>
    )
}


export default Cell;