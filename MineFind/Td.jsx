import React, { useContext } from 'react'
import { CODE, TableContext } from './MineFind'

const getTdStyle=(code)=>{
    switch(code){
        case CODE.MINE:
        case CODE.NORMAL:
            return {
                background : '#444'
            };
        case CODE.OPEND:
            return {
                background : 'white'
            };
        // case CODE.MINE:
        //     return {
        //         background : '#444'
        //     };
        // case CODE.FLAG:
        //     return {
        //         background : '#444'
        //     };
        // case CODE.FLAG_MINE:
        //     return {
        //         background : '#444'
        //     };
        // case CODE.CLICKED_MINE:
        //     return {
        //         background : '#444'
        //     };
        // case CODE.QUESTION:
        //     return {
        //         background : '#444'
        //     };
        // case CODE.QUESTION_MINE:
        //     return {
        //         background : '#444'
        //     };
        default :
            return {
                background : 'white'
            }
    }
}

const getTdText =(code)=>{
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X'
        default: ''
            break;
    }
}

const Td = ({rowIndex,cellIndex}) => {
    const {tableData} = useContext(TableContext);
    return (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    )
}

export default Td