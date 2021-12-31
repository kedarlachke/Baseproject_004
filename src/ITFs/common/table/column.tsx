import React from 'react'

function Column(props:any) {
    const{data, width} = props
    return (        
            <td key={data} width={width}>{data}</td>        
    )
}

export default Column
