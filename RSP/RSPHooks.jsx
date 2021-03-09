import React, { useEffect, useRef, useState } from 'react'

const rspCoord = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px'
}
const scores= {
    바위 : 0,
    가위 : 1,
    보 : -1,
}
const computerChoice=(imgCoord)=>{
    return Object.entries(rspCoord).find(x=>x[1]===imgCoord)[0]
}
function RSPHooks() {
    const [result , setResult] = useState('')
    const [score , setScore] = useState(0)
    const [imgCoord , setImgCoord] = useState('0')
    const [buttonDisable , setButtonDisable] = useState(false)

    const interval = useRef();

    const changeHand =()=>{
        if(imgCoord===rspCoord.바위){
            setImgCoord(rspCoord.가위)
        }else if(imgCoord===rspCoord.가위){
            setImgCoord(rspCoord.보)
        }else if(imgCoord === rspCoord.보){
            setImgCoord(rspCoord.바위)
        }
    }
    const onClickBtn =(choice)=>()=>{
        clearInterval(interval.current);
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        setButtonDisable(true)
        if(diff===0){
            setResult('비겼습니다.')
        }else if([-1,2].includes(diff)){
            setResult('이겼습니다.')
            setScore((prevScore)=>{
                return prevScore+1;
            })
        }else {
            setResult('졌습니다.')
            setScore((prevScore)=>{
                return prevScore-1;
            })
        }
        setTimeout(()=>{
            //2초정도 기다렸다가 진행
            setButtonDisable(false)
            interval.current = setInterval(changeHand,100)
        },1000)
    }
    useEffect(()=>{
        interval.current = setInterval(changeHand,100)
        return ()=>{ clearInterval(interval.current);}
    },[imgCoord])
    

    return (
        <>
            <div id="computer" style={{background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')} disabled={buttonDisable} >바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')} disabled={buttonDisable}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')} disabled={buttonDisable}>보</button>
                <div>{result}</div>
                <div>현재 {score}점</div>
        </>
    )
}

export default RSPHooks