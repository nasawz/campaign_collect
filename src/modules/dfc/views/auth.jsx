/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import Popup from 'cex/components/popup/popup.jsx'

const Auth = React.createClass({
    doClose(){
        this.setState({
            showSucc: false
        })
    },
    getInitialState() {
        return {
            showSucc: false
        }
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='DFCauthView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>

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
