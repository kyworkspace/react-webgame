import React, { memo, useEffect, useRef,useMemo } from 'react'
import Td from './Td'

const Tr = memo(({rowData,rowIndex,dispatch}) =>{

    // const ref = useRef([]);
    // useEffect(() => {
    //     //비교
    //     console.log(rowIndex===ref.current[0],  dispatch===ref.current[1], rowData===ref.current[2])
    //     // //true true true false
    //     ref.current = [rowIndex,dispatch,rowData]
    // }, [rowIndex,dispatch,rowData])

    return (
        <tr>
            {/* {Array(rowData.length).fill().map((td,i)=>(<Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}>{''}</Td>))} */}

            {Array(rowData.length).fill().map((td,i)=>(
                useMemo(()=><Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}>{''}</Td>,[rowData[i]])
            ))}
        </tr>
    )
});

export default Tr
