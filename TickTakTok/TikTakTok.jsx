import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';
const initalState={
    winner : '',
    turn : 'O',
    tableData : [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell:[-1,-1], //최근 선택한 셀 좌표
    draw : false
}
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_DRAW = 'SET_DRAW';
const reducer = (state,action)=>{
    switch(action.type){
        case SET_WINNER:
            return {
                ...state,
                winner : action.winner,
            };
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell :[action.row,action.cell] //클릭한 셀좌표 할당
            }
        }
        case CHANGE_TURN:{
            return {
                ...state,
                turn : state.turn==='O'?'X':'O',
            }
        }
        case SET_WINNER:{
            return {
                ...state,
                winner : action.winner
            }
        }
        case RESET_GAME:{
            return {
                ...state,
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell:[-1,-1],
            }
        }
        case SET_DRAW:{
            return {
                ...state,
                winner : '',
                draw : true,
            }
        }
        default:
            return state;
    }
}


const TikTakTok=()=>{
    const [state,dispatch] = useReducer(reducer,initalState);
    const {tableData,winner,turn,recentCell,draw} = state;
    
    useEffect(() => { //3개가 이어졌는지 확인
        const [row,cell] = recentCell
        if(row < 0){
            return;
        }
        let win = false;
        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){ //가로줄 검사
            console.log('??')
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){ //세로줄 검사
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){ //대각선 검사
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){ //대각선 검사
            win = true;
        }
        if(win){
            dispatch({type:SET_WINNER, winner : turn});
            dispatch({type : RESET_GAME})
        }else{
            //무승부 검사
            let all = true; //칸이 다 차있으면 무승부
            tableData.forEach((row)=>{
                row.forEach(cell=>{
                    if(!cell){
                        all = false; //칸이 안 차있는게 있으면 승부가 끝나지 않음
                    }
                })
            })
            if(all){
                dispatch({type : RESET_GAME})
                dispatch({type: SET_DRAW})
            }else{
                dispatch({type : CHANGE_TURN}) //무승부가 아니면 턴넘기기
            }
        }
        
    }, [recentCell])

    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER,winner:'O'})
    },[])
    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner &&<div>{winner}님의 승리</div>}
            {draw && <div>무승부 입니다.</div>}
        </>
    )

}

export default TikTakTok;