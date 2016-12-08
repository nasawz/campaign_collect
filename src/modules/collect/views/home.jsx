/**
 * create by nasa.wang
 */
import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import emitter from '../../common/emitter.js'
import NavigateMixin from '../../common/navigate-mixin.js'

import {setItem, getItem} from 'cex/helpers/localstorage-processing.js'
import {encode64, decode64} from 'cex/helpers/base64.js'
import {_stringify, _parse} from 'cex/helpers/common.js'

import Popup from 'cex/components/popup/popup.jsx'

const Home = React.createClass({
    mixins: [NavigateMixin],
    doShowInfo() {
        this.setState({showInfo: true});
    },
    doShowFollow() {
        this.setState({showFollow: true});
    },
    doShowSeller() {
        this.setState({showSeller: true});
    },
    doJoin() {
        if (this.props.isSeller) {
            this.doShowSeller()
        } else {
            let channel = this.props.params.channel
            // emitter.emit('loading', '参与中...', true)
            this.props.actions.join(channel, (err, collect) => {
                // emitter.emit('loading', '参与中...', false)
                if (collect) {
                    this.navTo([
                        'collect', 'tree'
                    ], {
                        cid: collect.id
                    }, this.context.runType, '/#/')
                }
            })
        }
    },
    doCloseInfo() {
        this.setState({showInfo: false, showFollow: false, showSeller: false});
    },
    getDefaultProps: function() {
        return {
            isSeller: getItem('collect_seller')
                ? true
                : false
        }
    },
    getInitialState: function() {
        return {showInfo: false, showFollow: false, showSeller: true};
    },
    componentWillMount() {
        let link = `${window.location.origin}${window.location.pathname}#/collect/home`
        global.setWxLink(link)
    },
    componentDidMount() {
        let w = 572
        let h = 445

        var sprite = new window.TiledImage(require('../../../img/kv_anim.png'), 3, 1);
        sprite.changeRow(0);
        sprite.changeColumnInterval(0, 2);
        var ctx = document.getElementById("canvas").getContext("2d");
        tick();
        function tick() {
            ctx.clearRect(0, 0, w, h);
            sprite.tick(ctx, 572 / 2, 445 / 2);
            window.requestAnimationFrame(tick);
        }
    },
    render() {
        let minHeight = window.innerHeight
        let w = 572
        let h = 445
        return (
            <div className='homeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <div className='kv kvbg'>
                        <canvas className='kv' ref='kv' width={w} height={h} id="canvas"></canvas>
                    </div>

                    <div className='btns'>
                        <img onClick={this.doJoin} className='btnJoin' src={require('../../../img/btn_join.png')}/>
                        <img onClick={this.doShowInfo} className='btnInfo' src={require('../../../img/btn_info.png')}/>
                    </div>
                    <Popup show={this.state.showInfo} closePopup={this.doCloseInfo}>
                        <div style={{
                            height: `${minHeight}px`
                        }}>
                            <div className='infoContainer'>
                                <div className='activityInfoBg'>
                                    <img onClick={this.doCloseInfo} className='btnBack' src={require('../../../img/btn_back.png')}/>
                                </div>
                            </div>
                        </div>
                    </Popup>
                    <Popup show={this.state.showFollow} closePopup={this.doCloseInfo}>
                        <div style={{
                            height: `${minHeight}px`
                        }}>
                            <div className='infoContainer'>
                                <div className='pop01 popFollow'>
                                    <div className='close' onClick={this.doCloseInfo}></div>
                                    <div className='container'>
                                        <img className='pop_follow' src={require('../../../img/pop_follow.png')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                    <Popup show={this.state.showSeller} closePopup={this.doCloseInfo}>
                        <div style={{
                            height: `${minHeight}px`
                        }}>
                            <div className='infoContainer'>
                                <div className='pop01'>
                                    <div className='close' onClick={this.doCloseInfo}></div>
                                    <div className='container'>
                                        <img className='pop_seller' src={require('../../../img/pop_seller.png')}/>
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

export default Home
