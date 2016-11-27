/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

const Home = React.createClass({
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='DFChomeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img className='join' src={require('../../../img/dfc_join.png')} />
                    <img className='auth' src={require('../../../img/dfc_auth.png')} />
                </div>
            </div>
        )
    }

})

export default Home
