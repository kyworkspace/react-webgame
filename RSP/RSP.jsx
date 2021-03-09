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

export default class RSP extends Component {
    state={
        result : '',
        score : 0,
        imgCoord : '0'
    }

    onClickBtn =(choice)=>{
        clearInterval(this.interval);
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
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
    }
    
    interval;

    componentDidMount(){ //#1 첫 렌더링 비동기 요청
        
        this.interval = setInterval(()=>{
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
        },1000)
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
        const {result,score,imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                
            </>
        )
    }
}
