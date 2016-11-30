/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import NavigateMixin from '../../common/navigate-mixin.js'

const Home = React.createClass({
    mixins: [
        NavigateMixin
    ],
    goJoin() {
        window.location.href='index.html'
        // let _querys = null
        // this.goHref('index',['collect','home'], _querys)
    },
    goAuth() {
        this.navTo([
            'dfc', 'auth'
        ], null, this.context.runType, '/#/')
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='DFChomeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img onClick={this.goJoin} className='join' src={require('../../../img/dfc_join.png')}/>
                    <img onClick={this.goAuth} className='auth' src={require('../../../img/dfc_auth.png')}/>
                </div>
            </div>
        )
    }

})

export default Home
