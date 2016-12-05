/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

const Result = React.createClass({
    componentWillMount() {
        // console.log(this.props.collect);
    },
    render() {
        let minHeight = window.innerHeight
        let result_user_0 = require('../../../img/result_user_0.png')
        let result_user_end = require('../../../img/result_user_end.png')
        let result_user_1 = require('../../../img/result_user_1.png')
        let result_user_2 = require('../../../img/result_user_2.png')
        let result_user_3 = require('../../../img/result_user_3.png')
        let result_user_t_1 = require('../../../img/result_user_t_1.png')
        let result_user_t_2 = require('../../../img/result_user_t_2.png')
        let code = this.props.collect.prize.code
        let result = eval(`result_user_${code}`)
        return (
            <div className='resultView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img src={result}/>
                </div>
            </div>
        )
    }

})

export default Result
