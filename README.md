### 리액트 웹게임
- 구구단
- 끝말잇기
 - Hooks
- 숫자야구
- 가위바위보
 - Hooks
 - useEffect
- Lotto
    - useMemo : 복잡한 함수 결과값을 기억
    - useCallback : 함수 자체를 기억
    - useRef : 일반 값을 기억
    ```
    ComponentDidUpdate -> Hooks
    const something = useRef(false)
    useEffect(()=>{
        if(!something.current){
            return; or something.current = true;
        }else{
            // callback or something to do
        }

    },[바뀌는값])
    ```
- 틱택토
    - useReducer : 기본적인 리덕스 작업을 가능토록
    - 비동기 작업으로 진행되는 구조
    - 동기적인 반응을 하기 위해서는 useEffect를 사용하여야 한다.
    - 반복문이 들어가는 컴포넌트는 React.memo를 쓰면 좋다.
    - useMemo를 사용하여 컴포넌트 자체를 기억 시킬수도 있다. <Tr> 부분

- 지뢰 찾기
    - createContext, useContext 사용
    - Context Provider의 value는 잦은 리렌더링을 방지(캐싱) 하기 위해 useMemo를 이용한다.
    - Provider를 사용하여 하위 컴포넌트에서 Context state를 사용할수 있도록 한다.
    - memo를 할때는 하위 컴포넌트도 memo가 적용되어 있어야 한다.
    - contextAPI를 쓰면 state가 바뀔때마다 리렌더링으로 동작함
    - 컴포넌트가 재호출 되더라도 실질적인 렌더링을 막을수 있도록 useMemo를 render에 적용한다.
    - useMemo를 사용하기 싫은 경우 컴포넌트를 쪼개는 방법도 가능하다.
    ```
        ...
        return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>
        })
        const RealTd =memo(({onClickTd, onRightClickTd, data})=>{
            return (
                <td
                    style={getTdStyle(data)}
                    onClick={onClickTd}
                    onContextMenu={onRightClickTd}
                >
                    {getTdText(data)}
                </td>
            )
        })
    ```
