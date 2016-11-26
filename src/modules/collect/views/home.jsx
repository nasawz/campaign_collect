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
            sprite.tick(ctx, 572/2, 445/2);
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

                    <canvas className='kv' ref='kv' width={w} height={h} id="canvas"></canvas>

                    <div className='btns'>
                        <img className='btnJoin' src={require('../../../img/btn_join.png')}/>
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
                </div>
            </div>
        )
    }

})

export default Home
