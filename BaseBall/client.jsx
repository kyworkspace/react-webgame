// const React = require('react');
// const ReactDom = require('react-dom');
// const WordRelay = require('./WordRelay')
import React from 'react'
import ReactDom,{render} from 'react-dom'
import NumberBaseball from './NumberBaseball'
import NumberBaseballHooks from './NumberBaseballHooks'

render(<NumberBaseball/>,document.querySelector("#root"))