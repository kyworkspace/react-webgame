import React, { useState, useCallback, useContext, memo } from 'react'
import {START_GAME, TableContext} from './MineFind'
//useContext를 사용하여 컨텍스트 내의 값을 사용할수 있도록 함

const Form = memo(() => {
    const [row, setRow] = useState(10)
    const [cell, setCell] = useState(10)
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext)

    const onChangeRow= useCallback((e)=>{
        setRow(e.currentTarget.value)
    },[]) 
    const onChangeCell = useCallback((e)=>{
        setCell(e.currentTarget.value)
    },[])
    const onChangeMine= useCallback((e)=>{
        setMine(e.currentTarget.value)
    },[])

    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, cell, mine });
      }, [row, cell, mine]);


    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
            <input type="number" placeholder="갯수" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    )
})

export default Form
