/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import emitter from '../../common/emitter.js'
import {navigate,replaceNavigate} from 'react-mini-router'

const Contacts = React.createClass({
    componentWillMount() {
        let {user, collect} = this.props
        if (user.userId != collect.ownerId) {
            emitter.emit('alert', '身份异常', 'fail')
        }
    },
    doSend() {
        let {collect} = this.props
        let username = ReactDOM.findDOMNode(this.refs.username).value
        let phone = ReactDOM.findDOMNode(this.refs.phone).value
        let idcard = ReactDOM.findDOMNode(this.refs.idcard).value
        let address = ReactDOM.findDOMNode(this.refs.address).value
        if (username == '') {
            emitter.emit('alert', '请填写姓名！', 'text')
            return false
        }
        if (phone == '') {
            emitter.emit('alert', '请填写手机号！', 'text')
            return false
        }
        if (address == '') {
            emitter.emit('alert', '请填写地址！', 'text')
            return false
        }
        var regex = /^1\d{10}$/;
        if (phone != '' && !regex.test(phone)) {
            emitter.emit('alert', '请输入正确的手机号！', 'text')
            return false
        }
        let data = {
            username: username,
            phone: phone,
            address: address,
            idcard: idcard
        }
        this.props.actions.contacts(collect.id, data, (err, collect) => {
            if (collect) {
                replaceNavigate('/lottery/home')
            }
        })
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='contactsView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <div className='contacts_form'>
                        <div className='cell cell1'>
                            <label>
                                <span>*</span>姓名：
                            </label>
                            <input ref='username' type='text'/>
                        </div>
                        <div className='cell cell2'>
                            <label>
                                <span>*</span>手机号：
                            </label>
                            <input ref='phone' type='text'/>
                        </div>
                        <div className='cell cell3'>
                            <label>
                                身份证号：
                            </label>
                            <input ref='idcard' type='text'/>
                        </div>
                        <div className='cell cell4'>
                            <label>
                                <span>*</span>邮寄地址：
                            </label>
                            <input ref='address' type='text'/>
                        </div>
                        <img onClick={this.doSend} className='btn_go_lottery' src={require('../../../img/btn_go_lottery.png')}/>
                    </div>
                </div>
            </div>
        )
    }

})

export default Contacts
