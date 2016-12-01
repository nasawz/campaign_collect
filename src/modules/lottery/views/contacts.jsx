/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

const Contacts = React.createClass({
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
                            <input type='text'/>
                        </div>
                        <div className='cell cell2'>
                            <label>
                                <span>*</span>手机号：
                            </label>
                            <input type='text'/>
                        </div>
                        <div className='cell cell3'>
                            <label>
                                身份证号：
                            </label>
                            <input type='text'/>
                        </div>
                        <div className='cell cell4'>
                            <label>
                                <span>*</span>地址：
                            </label>
                            <input type='text'/>
                        </div>
                        <img className='btn_go_lottery' src={require('../../../img/btn_go_lottery.png')}/>
                    </div>
                </div>
            </div>
        )
    }

})

export default Contacts
