import React, { useState,useRef } from 'react';

const WordRelay=()=>{
    const [word, setword] = useState("비엔나")
    const [value, setvalue] = useState('')
    const [result, setresult] = useState('')

    const inputRef = useRef(null);

    const onSubmitForm=(e)=>{
        e.preventDefault();
        if(word[word.length-1]=== value[0]){
            setword(value);
            setresult('딩동댕')

        }else{
            setresult('떙')
        }
        setvalue('');
        inputRef.current.focus();
    }
    const onChangeInput=(e)=>{
        setvalue(e.target.value)
    }
    return (
    <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} value={value} onChange={onChangeInput}/>
            <button type="submit">입력!!!</button>
        </form>
        <div>{result}</div>
    </>
    )
}

export default WordRelay;

// class WordRelay extends Component {
//     state={
//         word : "비엔나",
//         value : '',
//         result : '',
//     }

//     onSubmitForm=(e)=>{
//         e.preventDefault();
//         if(this.state.word[this.state.word.length-1]=== this.state.value[0]){
//             this.setState({
//                 result : '딩동댕',
//                 word : this.state.value
//         })

//         }else{
//             this.setState({result : '떙'})
//         }
//         this.setState({value:''})
//         this.input.focus();
//     }
//     onChangeInput=(e)=>{
//         this.setState({value:e.target.value})
//     }
//     input;
//     inputRef = (c)=>{this.input = c;};

//     render() {
//         return (
//         <>
//             <div>{this.state.word}</div>
//             <form onSubmit={this.onSubmitForm}>
//                 <input ref={this.inputRef} value={this.state.value} onChange={this.onChangeInput}/>
//                 <button type="submit">입력!!</button>
//             </form>
//             <div>{this.state.result}</div>
//         </>
//         )
//     }
// }

// export default WordRelay;