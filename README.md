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