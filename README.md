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
