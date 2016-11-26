/**
 * create by nasa.wang
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

import Popup from 'cex/components/popup/popup.jsx'

const Home = React.createClass({
    doShowInfo() {
        this.setState({showInfo: true});
    },
    doCloseInfo() {
        this.setState({showInfo: false});
    },
    getInitialState: function() {
        return {showInfo: false};
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='homeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img className='kv' src={require('../../../img/main_kv_1.png')}/>
                    <div className='btns'>
                        <img className='btnJoin' src={require('../../../img/btn_join.png')}/>
                        <img onClick={ this.doShowInfo } className='btnInfo' src={require('../../../img/btn_info.png')}/>
                    </div>
                    <Popup show={this.state.showInfo} closePopup={this.doCloseInfo}>
                        <div style={{
                            height: `${minHeight}px`
                        }}>
                            <div className='infoContainer'>
                                <div className='activityInfoBg'>
                                    <img onClick={ this.doCloseInfo } className='btnBack' src={require('../../../img/btn_back.png')}/>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        )
    }

})

export default Home
