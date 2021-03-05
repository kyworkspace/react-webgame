import React,{useState,useRef} from 'react'

function Gugudan(){
    const [First,setFirst] = React.useState(Math.ceil(Math.random()*9))
    const [Second,setSecond] = React.useState(Math.ceil(Math.random()*9))
    const [value,setValue] = React.useState("")
    const [Result,setResult] = React.useState("")
    
    const onChange=(e)=>{
        setValue(e.target.value)
    }
    const inputRef = React.useRef();

    const onSubmitResult =(e)=>{
        e.preventDefault();

        if(parseInt(value)===(First * Second)){
            setValue('');
            setResult((prevResult)=>{return `${First} * ${Second} = ${value} 정답`})
            setFirst(Math.ceil(Math.random()*9))
            setSecond(Math.ceil(Math.random()*9))
            inputRef.current.focus()

        }else{
            setValue('');
            setResult(`땡`)
            setFirst(Math.ceil(Math.random()*9))
            setSecond(Math.ceil(Math.random()*9))
            inputRef.current.focus()
        }
    }

    return (
            <div> 
                <div> {First} 곱하기 {Second} 는?</div>
                <form onSubmit={onSubmitResult}>
                    <input ref={inputRef}type="number" onChange={onChange} value={value}/>
                    <button type="submit">입력</button>
                </form>
                <div>
                    {Result}
                </div>
            </div>
    )
}
export default Gugudan

