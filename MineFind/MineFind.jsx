import React, { useReducer,createContext, useMemo, useEffect } from 'react'
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
    data : {
        row : 0,
        cell : 0,
        mine : 0
    },
    result :'',
    halted : true,
    openedCount : 0
}
//createContext 기본값을 넣어줄수 있음
export const TableContext = createContext({
    tableData :[],
    halted : true,
    dispatch:()=>{}, //일단 모양만 맞춤
});

//프로바이더 묶어줘야 하위 컴포넌트들이 공유 가능

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREAMENT_TIMER = 'INCREAMENT_TIMER';


const reducer = (state,action)=>{
    switch(action.type){
        case START_GAME : 
            return {
                ...state,
                data : { //시작 데이터 기록 
                    row : action.row,
                    cell : action.cell,
                    mine : action.mine
                },
                tableData : plantMine(action.row,action.cell,action.mine),
                openedCount :0,
                timer : 0,
                halted : false
            }
        case OPEN_CELL :
            {const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.cell] = CODE.OPEND;
            tableData.forEach((row,i)=>{ //불변성을 위해서 완전히 새로운 배열을 만듬
                tableData[i] = [...state.tableData[i]];
            });
            const checked=[];// 한번 검사한곳은 다시 검사하지 않도록
            let openedCount = 0; //오픈한 칸 갯수
            const checkAround=(row,cell)=>{ //주변 검사하는 메서드
                if([CODE.OPEND,CODE.FLAG_MINE,CODE.FLAG,CODE.QUESTION_MINE,CODE.QUESTION].includes(tableData[row][cell])){ 
                    //이미열린칸, 지뢰칸, 빈칸이 아닌 경우는 return 
                    return;
                }
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){ //상하좌우 칸이 아닌 경우 필터링
                    return;
                }
                if(checked.includes(row+','+cell)){//이미 검사한거는 리턴
                    return
                }else{
                    checked.push(row+','+cell)
                }
                if(tableData[row][cell]===CODE.NORMAL){ //이미 열린칸은 카운트 안올림
                    //checked 초기화할 필요 X
                    openedCount +=1;
                }
                //주변 지뢰 갯수 구하기
                let around = [];
                if(tableData[row-1]){ //윗줄이 있는 경우
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1]
                    )
                }
                if(tableData[row][cell-1]){
                    around = around.concat( // 좌우
                        tableData[row][cell-1],
                    )
                }
                if(tableData[row][cell+1]){
                    around = around.concat(
                        tableData[row][cell+1]
                    )
                }
                if(tableData[row+1]){ //아랫줄
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1],
                    )
                }
                const count = around.filter((v)=>[CODE.MINE,CODE.FLAG_MINE,CODE.QUESTION_MINE].includes(v)).length
                tableData[row][cell] = count;

                if(count === 0 ){
                    //본인이 0 이면 주변 칸도 검사
                    const near = [];
                    if(row-1 > -1){
                        near.push([row-1,cell-1]);
                        near.push([row-1,cell]);
                        near.push([row-1,cell+1]);
                    }
                    near.push([row,cell-1])
                    near.push([row,cell+1])
                    //좌우 칸의 경우 이중 배열에서 두번째 요소가 Undefined이냐 아니냐 이기 때문에 
                    //실질적인 데이터는 Undefined가 될뿐 프로그램에는 영향 X => filter 하는 과정에 없어짐
                    if(row+1 < tableData.length){
                        near.push([row+1,cell-1]);
                        near.push([row+1,cell]);
                        near.push([row+1,cell+1]);
                    }
                    near.forEach((n)=>{ //주변칸도 클릭해줌
                        if(tableData[n[0]][n[1]] !== CODE.OPEND){ //주변칸이 열려 있는게 아니면 
                            checkAround(n[0],n[1]);
                        }
                        
                    })
                } else {

                }
            }
            checkAround(action.row,action.cell) // 찍은 위치 기준 검사 시작
            //승리 조건 체크
            console.log(openedCount)
            let halted = false;
            let result = '';
            if(state.data.row*state.data.cell - state.data.mine === state.openedCount+openedCount){ //승리
                halted = true;
                result =`${state.timer}만에 승리하셨습니다.`
            }

            return {
                ...state,
                tableData,
                openedCount : state.openedCount+openedCount,
                halted,
                result,
            }}
        case CLICK_MINE :{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
             ...state,
                tableData,
                halted :true, //게임 멈추는 동작
            }}
        case FLAG_CELL : 
            {const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE
            }else{
                tableData[action.row][action.cell] = CODE.FLAG
            }
            return {
                ...state,
                tableData,
            }}
        case QUESTION_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL
            }
            return {
                ...state,
                tableData,
            }
        }
        case INCREAMENT_TIMER:{
            return {
                ...state,
                timer : state.timer+1,
            }
        }
            
    }
}
//지뢰 심기
const plantMine=(row,cell,mine)=>{
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
    return data;
}


const MineFind=()=> {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, timer, result, halted } = state;

    const value = useMemo(() => ({tableData,halted, dispatch}),[tableData,halted])
    //컨텍스트 API를 사용할때 provider에서 value값을 직접 넘겨주게 되면 리렌더링 될때 context도 새롭게 정의가 되어 하부 컴포넌트들도 리렌더링되어 효율성이 떨어진다.
    //그렇기 때문에 useMemo로 캐싱하여 Provider의 value가 유지 되도록 하며, 이 값은 tableData가 갱신될때만 바뀌도록 한다.

    useEffect(()=>{
        if(halted === false){
            const timer = setInterval(()=>{
                dispatch({type : INCREAMENT_TIMER});
            },1000)
            return ()=>{
                clearInterval(timer);
            }    
        }
    },[halted])

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div > 진행 시간 : {state.timer}</div>
            <Table/>
            <div > {state.result}</div>
        </TableContext.Provider>
    )
}

export default MineFind
