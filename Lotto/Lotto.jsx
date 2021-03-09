import React, { Component } from 'react'
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

export default class Lotto extends Component {

    state = {
        winNumbers : getWinNumbers(),
        winBalls:[],
        bonus : null, //보너스 번호
        redo : false,
    };

    timeouts=[];

    onClickRedo=()=>{
        this.setState({
            winNumbers : getWinNumbers(),
            winBalls:[],
            bonus : null, //보너스 번호
            redo : false,
        });
        this.timeouts=[];
    }

    runTimeouts = ()=>{
        const {winNumbers} = this.state;
        for(let i =0 ; i< this.state.winNumbers.length-1 ; i++){ //보너스 제외
            this.timeouts[i] = setTimeout(()=>{
                this.setState((prevState)=>{
                    return{
                        winBalls : [...prevState.winBalls , winNumbers[i]]
                    }
                })
            },(i+1)*1000)
        }

        this.timeouts[6] = setTimeout(()=>{ //보너스 공
            this.setState({
                bonus : winNumbers[6],
                redo : true,
            })
        },7000)
    }

    componentDidUpdate(prevProps,prevState){
        //prevState 랑 this.State랑 비교 하면 됨
        if(this.state.winBalls.length === 0){
            this.runTimeouts()
        }
    }

    componentDidMount(){
        this.runTimeouts()
    }

    componentWillUnmount(){
        //setTimeOut 정리
        this.timeouts.forEach((t)=>{
            clearTimeout(t);
        })
    }

    render() {
        const {winNumbers,bonus,winBalls,redo} = this.state;
        return (
            <>
                <div>당첨숫자</div>
                <div id = "결과창">
                    {winBalls.map((v=><Ball key={v} number={v}/>))}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number ={bonus}/>}
                {redo &&<button onClick={ this.onClickRedo}>한번더</button>}
                
            </>
        )
    }
}
