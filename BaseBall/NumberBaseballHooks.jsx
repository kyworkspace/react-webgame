import React, { memo, useRef, useState } from 'react'

const Try =memo((props)=>{

    const {tryInfo} = props;

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
})

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array =[];
    for(let i = 0 ; i < 4 ; i++){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseballHooks = memo(()=> {
    console.log("HOOKS")
    const [value, setvalue] = useState("");
    const [tries, settries] = useState([]);
    const [result, setResult] = useState("");
    const [answer, setAnswer] = useState(getNumbers());

    const inputRef = useRef(null);

    const onChangeInput = (e)=>{
        setvalue(e.target.value);
    }
    const onSubmitForm = (e)=>{
        e.preventDefault();
        if(value===answer.join('')){
            setResult("홈런")
            settries((prevState)=>{
                return  [...prevState,{try: value, result : '홈런' }]
            });
            setAnswer(getNumbers())
            setvalue('')
            settries([])
        }else{
            const answerArr = value.split('').map(item=>parseInt(item));
            let strike = 0;
            let ball = 0;
            if(tries.length>=9){
                setResult(`10번 넘게 틀려서 실패 ! 답은 ${answer.join(',')}였습니다.`)
                alert("게임을 다시 시작합니다.");
                setvalue('');
                setAnswer(getNumbers())
                settries([])
            }else{
                for(let i = 0 ; i <4 ; i++){
                    if(answerArr[i] === answer[i]){
                        strike+=1;
                    }else if(answer.includes(answerArr[i])){
                        ball+=1;
                    }
                }
                settries((prevState)=>{
                  return [...prevState,{try : value , result : `${strike} 스트라이크 ${ball} 볼 입니다.`}]
                })
                setvalue('')
            }
        }
    }

    return (
            <>
            <div>{result}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} maxLength={4} value ={value} onChange={onChangeInput}/>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((item,idx)=>(
                    <Try tryInfo={item} index={idx} key={`${idx+1}차 시도`}/>
                ))}
            </ul>
        </>
    )
})

export default NumberBaseballHooks
