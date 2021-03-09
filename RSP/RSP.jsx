import React, { Component } from 'react'

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

export default class RSP extends Component {
    state={
        result : '',
        score : 0,
        imgCoord : '0',
        buttonDisable : false
    }
    changeHand =()=>{
        const {imgCoord} = this.state; //JS는 비동기라서 클로저를 제대로 해줘야함
        if(imgCoord===rspCoord.바위){
            this.setState({
                imgCoord : rspCoord.가위
            })
        }else if(imgCoord===rspCoord.가위){
            this.setState({
                imgCoord : rspCoord.보
            })
        }else if(imgCoord === rspCoord.보){
            this.setState({
                imgCoord : rspCoord.바위
            })
        }
    }

    onClickBtn =(choice)=>()=>{
        clearInterval(this.interval);
        const {imgCoord} = this.state;
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        this.setState({
            buttonDisable : true
        })
        if(diff===0){
            this.setState({
                result : '비겼습니다!'
            })
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return {
                    result : '이겼습니다.',
                    score : prevState.score +1
                }
            })
        }else {
            this.setState((prevState)=>{
                return {
                    result : '졌습니다.',
                    score : prevState.score -1
                }
            })
        }
        setTimeout(()=>{
            //2초정도 기다렸다가 진행
            this.setState({
                buttonDisable : false
            })
            this.interval = setInterval(this.changeHand,100)
        },1000)
    }
    
    interval;

    componentDidMount(){ //#1 첫 렌더링 비동기 요청
        this.interval = setInterval(this.changeHand,100)
    }

    shouldComponentUpdate(){//#2
        return true
    }
    componentDidUpdate(){ //#3 업데이트

    }
    componentWillUnmount(){ //#4 제거되기 직전
        clearInterval(this.interval);
    }

    render() {
        const {result,score,imgCoord,buttonDisable} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')} disabled={buttonDisable} >바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')} disabled={buttonDisable}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')} disabled={buttonDisable}>보</button>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>

        )
    }
}
