/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import Popup from 'cex/components/popup/popup.jsx'
import emitter from '../../common/emitter.js'

import {setItem, getItem} from 'cex/helpers/localstorage-processing.js'
import {encode64, decode64} from 'cex/helpers/base64.js'
import {_stringify, _parse} from 'cex/helpers/common.js'

const Auth = React.createClass({
    doCertification() {
        let code = ReactDOM.findDOMNode(this.refs.code).value
        if (code != '') {
            this.props.actions.certification(code, (err, seller) => {
                seller = encode64(_stringify(seller))
                setItem('collect_seller', seller)
                // seller = getItem('collect_seller')
                // console.log(_parse(decode64(seller)));
                this.setState({showSucc: true})
            })
        } else {
            emitter.emit('alert', '请输入经销商编码', 'fail')
        }
    },
    doClose() {
        this.setState({showSucc: false})
    },
    getInitialState() {
        return {showSucc: false}
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='DFCauthView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <div className='auth_form'>
                        <div className='cell'>
                            <label>经销商编码（DLR Code）：</label>
                            <input ref='code' type='text'/>
                        </div>
                        <img onClick={this.doCertification} className='btn_submit' src={require('../../../img/btn_submit.png')}/>
                    </div>
                    <Popup show={this.state.showSucc} closePopup={this.doClose}>
                        <div style={{
                            height: `${minHeight}px`
                        }}>
                            <div className='infoContainer'>
                                <div className='pop01'>
                                    <div className='close' onClick={this.doClose}></div>
                                    <div className='container'>
                                        <img className='pop_dfc_succ' src={require('../../../img/pop_dfc_succ.png')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        )
    }

})

export default Auth
