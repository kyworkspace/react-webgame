import React, { memo, useCallback, useContext, useMemo } from 'react'
import { CODE, OPEN_CELL, TableContext, FLAG_CELL, NORMALIZE_CELL, QUESTION_CELL,CLICK_MINE } from './MineFind'

const getTdStyle=(code)=>{
    switch(code){
        case CODE.MINE:
        case CODE.NORMAL:
            return {
                background : '#444'
            };
        case CODE.CLICKED_MINE:
        case CODE.OPEND:
            return {
                background : 'white'
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background : 'red'
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background : 'yellow'
            };
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
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!'
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?'
        default: 
            return code||'';//0 인경우 표시 안되게
    }
}

const Td = memo(({rowIndex,cellIndex}) => {
    
    const {tableData, dispatch,halted} = useContext(TableContext);
    const onClickTd = useCallback(
        () => {
            if(halted){
                return;
            }
            switch (tableData[rowIndex][cellIndex]) {
                case CODE.OPEND:
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    return;
                case CODE.NORMAL:
                    dispatch({type : OPEN_CELL,row : rowIndex, cell : cellIndex})        
                    break;
                case CODE.MINE:
                    dispatch({type : CLICK_MINE, row:rowIndex, cell : cellIndex})
                    break;
                default:
                    break;
            }
            
        },
        [tableData[rowIndex][cellIndex],halted],
    )
    const onRightClickTd = useCallback(
        (e) => {
          e.preventDefault(); //기본 메뉴 안뜨도록 하는 기능
          if(halted){
            return;
        }
          switch (tableData[rowIndex][cellIndex]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    dispatch({type:FLAG_CELL, row: rowIndex, cell: cellIndex});
                    break;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    dispatch({type : QUESTION_CELL , row:rowIndex, cell:cellIndex})
                    break;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION :
                    dispatch({type : NORMALIZE_CELL , row : rowIndex, cell : cellIndex})
                    break;
              default:
                  break;
          }
        },
        [tableData[rowIndex][cellIndex],halted],
    )
    // return useMemo(() => (
    //     <td
    //         style={getTdStyle(tableData[rowIndex][cellIndex])}
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd} //우클릭
    //     >
    //         {getTdText(tableData[rowIndex][cellIndex])}
    //     </td>
    // ), [tableData[rowIndex][cellIndex]])
    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>
    
})

const RealTd =memo(({onClickTd, onRightClickTd, data})=>{
    return (
        <td
            style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd} //우클릭
        >
            {getTdText(data)}
        </td>
    )
})

export default Td