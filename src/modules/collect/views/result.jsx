/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

const Result = React.createClass({
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='resultView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img src={require('../../../img/result_user_1.png')} />
                </div>
            </div>
        )
    }

})

export default Result
