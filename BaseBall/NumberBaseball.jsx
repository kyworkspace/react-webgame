import React, { createRef, PureComponent } from 'react';
import Try from './Try';


function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array =[];
    for(let i = 0 ; i < 4 ; i++){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends PureComponent {

    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : []
    };

    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.value===this.state.answer.join('')){
            this.setState((prevState)=>{
                return {
                    result : '홈런',
                tries : [...prevState.tries,{try: this.state.value, result : '홈런' }]
                }
            })
            this.setState({
                value : '',
                answer : getNumbers(),
                tries:[]
            })
            this.inputRef.current.focus();
        }else{
            const answerArr = this.state.value.split('').map(item=>parseInt(item));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length>=9){
                this.setState({
                    result : `10번 넘게 틀려서 실패 ! 답은 ${this.state.answer.join(',')}였습니다.`
                })
                alert("게임을 다시 시작합니다.");
                this.setState({
                    value : '',
                    answer : getNumbers(),
                    tries:[]
                })
            }else{
                for(let i = 0 ; i <4 ; i++){
                    if(answerArr[i] === this.state.answer[i]){
                        strike+=1;
                    }else if(this.state.answer.includes(answerArr[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState)=>{
                    return {
                        tries : [...prevState.tries,{try : this.state.value , result : `${strike} 스트라이크 ${ball} 볼 입니다.`}],
                        value : '',
                    }
                    
                })
            }
            this.inputRef.current.focus();
        }
    }
    onChangeInput=(e)=>{        
        this.setState({value : e.target.value})
    }

    inputRef = createRef(); 
    render() {
        return (
            <>
                <div>{this.state.result}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref = {this.inputRef}maxLength={4} value ={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((item,idx)=>(
                        <Try tryInfo={item} index={idx} key={`${idx+1}차 시도`}/>
                    ))}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;