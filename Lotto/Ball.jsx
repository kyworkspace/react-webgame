import React, { memo, PureComponent } from 'react';

const Ball=memo(({number})=>{
    let background;
        if(number <= 10){
            background="red";
        }else if(number<=20){
            background="orange";
        }else if(number<=30){
            background="yellow";
        }else if(number<=40){
            background="blue";
        }else{
            background="green";
        }

    return (
        <div className="ball" style={{background}}>
                {number}
            </div>
    )
})



// class Ball extends PureComponent {
//     render() {
//         let background;
//         const {number} = this.props;
//         if(number <= 10){
//             background="red";
//         }else if(number<=20){
//             background="orange";
//         }else if(number<=30){
//             background="yellow";
//         }else if(number<=40){
//             background="blue";
//         }else{
//             background="green";
//         }

//         return (
//             <div className="ball" style={{background}}>
//                 {number}
//             </div>
//         );
//     }
// }

export default Ball;