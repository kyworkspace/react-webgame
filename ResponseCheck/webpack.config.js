const path = require("path"); 
//일단 외워둘것, node에서 경로 조작이 쉽도록 해주는것
const webpack = require('webpack')
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports={
    name : 'word-relay-setting', //웹팩 설정 이름
    mode : 'development',//실서비스에서는 production으로 바꿀것
    devtool : 'eval', //빠르게?

    resolve : {
        extensions :['.js','.jsx'] //웹팩이 알아서 파일의 종류를 구분할 수 있도록 함
    },

    entry : {
        app:['./client']
    },//입력

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
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-syntax-class-properties',
                    'react-refresh/babel', //바벨이 핫리로딩 설정도 추가해줌
            ]
            }
        }],
    },//엔트리에 모듈을 적용해서 아웃풋으로 뺀다
    //확장 프로그램
    plugins :[
        new webpack.LoaderOptionsPlugin({debug:true}),
        new RefreshWebpackPlugin(), //플러그인 장착
    ],

    output : {
        path : path.join(__dirname, 'dist'), //(현재폴더,폴더명)
        filename : 'app.js',
        publicPath : '/dist/'
    },//출력

    devServer : { //변경점을 감지해서 경로에 있는 저장 결과물을 수정해줌 
        publicPath : '/dist/',
        hot : true,
    }

}