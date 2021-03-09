import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Ball from './Ball';

function getWinNumbers(){
    console.log('getWinNumbers');
    const cadidate = Array(45).fill().map((v,i)=>i+1);
    const shuffle=[];
    while(cadidate.length>0){
        shuffle.push(cadidate.splice(Math.floor(Math.random() * cadidate.length ),1)[0])
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0,6).sort((p,c)=>p-c);
    return [...winNumbers,bonusNumber];
}

function LottoHooks() {
    const lottoNumbers = useMemo(()=>getWinNumbers(),[]); 
    //두번째 인자가 바뀌지 않는한 재실행 되지 않음
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef([]);

    const onClickRedo = useCallback(()=>{
        console.log('onClickRedo');
        //console.log(winNumbers) //첫번째로 실행된 숫자를 기억함-> 처음에 등록된 로직만을 기억함, useCallback 안에서 쓰이는 state는 두번째 인자에도 넣어줘야 제대로 값을 받아올수 있음
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[])//<-[winNumbers]
    
    useEffect(()=>{
        console.log('useEffect')
        for(let i =0 ; i< winNumbers.length-1 ; i++){ //보너스 제외
            timeouts.current[i] = setTimeout(()=>{
                setWinBalls((prevWinBalls)=>{
                    return [...prevWinBalls , winNumbers[i]]
                })
            },(i+1)*1000)
        }
        timeouts.current[6] = setTimeout(()=>{ //보너스 공
            setBonus(winNumbers[6])
            setRedo(true);
        },7000)
        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            })
        }
    },[timeouts.current]) //빈배열이면 componentDidMount와 동일

    useEffect(() => {
        console.log("로또숫자를 생성합니다.")
    }, [winNumbers])

    return (
        <>
            <div>당첨숫자</div>
            <div id = "결과창">
                 {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number ={bonus}/>}
            {redo &&<button onClick={onClickRedo}>한번더</button>}
        </>
    )
}

export default LottoHooks