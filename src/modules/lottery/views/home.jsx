/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

import LotteryTurntable from 'cex/components/lottery-turntable/lottery-turntable.jsx'
import Popup from 'cex/components/popup/popup.jsx'
import emitter from '../../common/emitter.js'

import {navigate} from 'react-mini-router'

const Home = React.createClass({
    clickHandler() {
        let self = this
        this.props.actions.lottery(this.props.collect.id, (err, collect) => {
            if (err) {
                return false
            }
            let space = 0
            if (collect.prize.name == '戴森空气净化器') {
                space = 7
            }
            if (collect.prize.name == 'Gopro') {
                space = 3
            }
            if (collect.prize.name == '1000元旅游卡') {
                space = 1
            }
            if (collect.prize.name == '300元礼品卡') {
                space = 5
            }
            if (collect.prize.name == '未中奖') {
                space = 8
            }
            this.setState({reward: space, time: 1})
        })
    },
    endHandler() {
        // this.setState({show: true})
        setTimeout(function() {
            navigate('/lottery/result')
        }, 2000);
    },
    getInitialState() {
        return {reward: 0, time: 3, show: false}
    },
    componentWillMount() {
        let {user, collect} = this.props
        if (user.userId != collect.ownerId) {
            emitter.emit('alert', '身份异常', 'fail')
        }
        if (!collect.contacts) {
            navigate('/lottery/contacts')
        }
    },
    render() {
        let {user, collect} = this.props
        let minHeight = window.innerHeight
        if (!collect.contacts) {
            return <div />
        }
        return (
            <div className='homeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container' style={{
                        marginTop:window.innerWidth>400?'120px':'88px',
                        justifyContent:'flex-start'
                    }}>
                    <LotteryTurntable circle={require('../../../img/circle.png')} pointer={require('../../../img/pointer.png')} time={this.state.time} onClick={this.clickHandler} onTransitionEnd={this.endHandler} reward={this.state.reward}>
                        <img className='lottery_txt' src={require('../../../img/lottery_txt.png')}/>
                    </LotteryTurntable>
                </div>
            </div>
        )
    }

})

export default Home
