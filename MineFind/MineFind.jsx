import React, { useReducer,createContext, useMemo } from 'react'
import Table from './Table'
import Form from './Form';

//CELL STATE
export const CODE={
    MINE : -7,
    NORMAL : -1,
    QUESTION:-2,
    FLAG : -3,
    QUESTION_MINE : -4, //지뢰칸 물음표
    FLAG_MINE : -5, //지뢰칸 깃발
    CLICKED_MINE : -6, //지뢰칸 클릭
    OPEND : 0 //0이상이면 다 opened
}

const initialState = {
    tableData :[],
    timer : 0,
    result :''
}
//createContext 기본값을 넣어줄수 있음
export const TableContext = createContext({
    tableData :[],
    dispatch:()=>{}, //일단 모양만 맞춤
});

//프로바이더 묶어줘야 하위 컴포넌트들이 공유 가능

export const START_GAME = 'START_GAME';

const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME : 
            return {
                ...state,
                tableData : plantMine(action.row,action.cell,action.mine)
            }
    }
}
//지뢰 심기
const plantMine=(row,cell,mine)=>{
    console.log(row,cell,mine);
    const candidate = Array(row*cell).fill().map((arr,i)=>{
        return i
    })
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }

    const data = [];

    for(let i =0 ;i < row ; i++){
        const rowData = [];
        data.push(rowData);
        for(let j =0 ; j< cell ; j++){ //모든 칸에 정상 칸 넣어주기
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0 ; k <shuffle.length ; k++){ //셔플에서 지뢰 들어갈 칸에 지뢰 넣어주기
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data)
    return data;
}


const MineFind=()=> {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, timer, result } = state;

    const value = useMemo(() => ({tableData, dispatch}),[tableData])
    //컨텍스트 API를 사용할때 provider에서 value값을 직접 넘겨주게 되면 리렌더링 될때 context도 새롭게 정의가 되어 하부 컴포넌트들도 리렌더링되어 효율성이 떨어진다.
    //그렇기 때문에 useMemo로 캐싱하여 Provider의 value가 유지 되도록 하며, 이 값은 tableData가 갱신될때만 바뀌도록 한다.

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div > {state.timer}</div>
            <Table/>
            <div > {state.result}</div>
        </TableContext.Provider>
    )
}

export default MineFind
