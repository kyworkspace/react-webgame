const path = require('path');
const webpack = require('webpack');

module.exports={
    mode : 'development',
    devtool : 'eval',// production 일때는 hidden-source-map
    resolve :{
        extensions : ['.js','.jsx']
    },

    entry:{
        app : './client'
    },
    module:{
        rules:[{
            test : /\.jsx?/, //js와 jsx에 이 규칙 적용
            loader : 'babel-loader',
            options :{
                presets:[
                    ['@babel/env',{
                        targets : {
                            browsers :[
                            '> 5% in KR' //한국에서 5프로 점유율을 가지고 있으면 지원
                            ,'last 2 chrome versions' //크롬의 이전 2버전 앞까지만 지원
                        ]},
                    }]
                    , '@babel/react'
                ],
                plugins:[]
            }
        }],
    },
    //확장 프로그램
    plugins :[
        new webpack.LoaderOptionsPlugin({debug:true}),
    ],

    output:{
        path : path.join(__dirname,'dist'),
        filename:'app.js'
    },

}