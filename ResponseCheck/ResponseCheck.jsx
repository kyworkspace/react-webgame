import React, { Component } from 'react';

class ResponseCheck extends Component {
    state={
        state : 'waiting',
        message : '클릭해서 시작하세요',
        result : [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen=()=>{
        const {state, message, result} = this.state;
        if(state==='waiting'){
            this.setState({
                state : 'ready',
                message : "초록색이 되면 클릭하세요"
            })
            this.timeout = setTimeout(()=>{
                this.setState({
                    state : 'now',
                    message : "지금 클릭"
                })
                this.startTime = new Date();
            },Math.floor(Math.random()*1000)+2000); // 2초 ~ 3초
        }else if(state === 'ready'){
            this.setState({
                state : 'waiting',
                message : '성급하게 눌렀음, 초록색이 된후에 눌러주세요'
            })
            clearTimeout(this.timeout);

        }else if(state === 'now'){ //반응속도
            this.endTime = new Date();

            this.setState((prevState)=>{
                return {
                    state : 'waiting',
                    result : [...prevState.result, this.endTime - this.startTime],
                    message : '클릭해서 시작하세요' 
                }
            });
            
        }
    }
    onClickReset=()=>{
        this.setState({
            result : [],
        })
    }


    render() {
        const {message,result} = this.state;
        return (
            <>
                <div 
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {
                    result.length > 0
                    ?
                    <>
                    <div>평균 시간 {result.reduce((a,c)=>a+c)/result.length}ms</div>
                    <button onClick={this.onClickReset}>리셋</button>
                    </>
                    :<div>기록이 없습니다.</div>
                }
                
            </>
        );
    }
}

export default ResponseCheck;