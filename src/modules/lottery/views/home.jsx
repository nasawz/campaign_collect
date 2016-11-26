/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

import LotteryTurntable from 'cex/components/lottery-turntable/lottery-turntable.jsx'
import Popup from 'cex/components/popup/popup.jsx'

const Home = React.createClass({
    clickHandler() {
        // 随机一、二、三等奖
        let arr = [0, 1, 2, 3]
        let rdm = arr[Math.floor(Math.random() * arr.length)]
        let nodrawArr = [4, 5, 6, 7, 8]
        // 未中奖时，随机5个角度
        if (rdm == 0) {
            rdm = nodrawArr[Math.floor(Math.random() * nodrawArr.length)]
        }
        let time = this.state.time - 1
        this.setState({reward: rdm, time: time})
    },
    endHandler() {
        this.setState({show: true})
    },
    getInitialState() {
        return {reward: 0, time: 3, show: false}
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='homeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <LotteryTurntable circle={require('../../../img/circle.png')} pointer={require('../../../img/pointer.png')} time={this.state.time} onClick={this.clickHandler} onTransitionEnd={this.endHandler} reward={this.state.reward}>
                        <img className='lottery_txt' src={require('../../../img/lottery_txt.png')}/>
                    </LotteryTurntable>
                </div>
            </div>
        )
    }

})

export default Home
