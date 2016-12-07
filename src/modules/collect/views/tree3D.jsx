/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import NavigateMixin from '../../common/navigate-mixin.js'

import Popup from 'cex/components/popup/popup.jsx'
import QRCode from 'cex/components/qrcode/qrcode.jsx'

import GiftBar from './giftBar.jsx'
import ProgressBar from './progressBar.jsx'
import emitter from '../../common/emitter.js'
import JT from 'jstween'

const Tree3D = React.createClass({
    mixins: [NavigateMixin],
    goHome() {
        window.location.href = `index.html#/collect/home/${this.props.collect.openid}`
        // this.navTo([
        //     'collect', 'home', this.props.collect.openid
        // ], null, this.context.runType, '/#/')
    },
    goLottery() {
        // console.log('goLottery');
        window.location.href = `lottery.html?cid=${this.props.collect.id}`
    },
    getQuery(q) {
        var m = window.location.href.match(new RegExp('(\\?|#|&)' + q + '=([^&|^#]*)(#|&|$)'))
        return !m
            ? null
            : decodeURIComponent(m[2])
    },
    showPhoto(e) {
        console.log(e);
        let src = e.currentTarget.getAttribute('data-src')
        console.log(src);
        window.wx.previewImage({
            current: src,
            urls: [src]
        })
    },
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        // this.scene.rotate(0, 1, 0).updateT()

        this.angleX += (this.curMouseX - this.lastMouseX + this.lastAngleX - this.angleX) * 0.3
        this.angleY += (this.curMouseY - this.lastMouseY + this.lastAngleY - this.angleY) * 0.3
        this.angleY = Math.max(-30, Math.min(30, this.angleY))

        // this.scene.rotation(-this.angleY, this.angleX, 0).updateT()
        // this.s.camera.rotate(0, 0.3, 0).updateT()
        this.scene.rotation(0, this.angleX - 80, 0).updateT()
        // this.scene.rotation(0, this.angleX-220, 0).updateT()

        this.requestAnimationFrame(this.go)
    },
    mouseDownHandler(evt) {
        this.lastMouseX = evt.targetTouches[0].pageX
        this.lastMouseY = evt.targetTouches[0].pageY
        this.lastAngleX = this.angleX
        this.lastAngleY = this.angleY
        this.curMouseX = evt.targetTouches[0].pageX
        this.curMouseY = evt.targetTouches[0].pageY
        this.wrapperEl.addEventListener('mousemove', this.mouseMoveHandler)
        this.wrapperEl.addEventListener('touchmove', this.mouseMoveHandler)
    },
    mouseUpHandler() {
        // this.curMouseX = evt.targetTouches[0].pageX
        // this.curMouseY = evt.targetTouches[0].pageY
        this.wrapperEl.removeEventListener('mousemove', this.mouseMoveHandler)
        this.wrapperEl.removeEventListener('touchmove', this.mouseMoveHandler)
    },
    mouseMoveHandler(evt) {
        this.curMouseX = evt.targetTouches[0].pageX
        this.curMouseY = evt.targetTouches[0].pageY
    },
    doCloseInfo() {
        this.setState({
            showQr: false,
            showShare: false,
            showProductErshou: false,
            showProductLaoyou: false,
            showProductShebao: false,
            showProductQuanbu: false
        })
    },
    addHelps() {
        var el_help1 = this.wrapperEl.querySelector('.help1')
        var help1 = new C3D.Plane({el: el_help1})
        help1.name('help1').size(30).update()
        this.scene.addChild(help1)
        JT.set(el_help1, {transformStyle: "preserve-3d"});
        JT.fromTo(el_help1, 1.3, {
            x: 20,
            y: -70,
            z: 2,
            rotationY: 0,
            rotationZ: -10
        }, {
            x: 20,
            y: -70,
            z: 2,
            rotationY: 0,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_help2 = this.wrapperEl.querySelector('.help2')
        var help2 = new C3D.Plane({el: el_help2})
        help2.name('help2').size(30).update()
        this.scene.addChild(help2)
        JT.set(el_help2, {transformStyle: "preserve-3d"});
        JT.fromTo(el_help2, 1, {
            x: -12,
            y: -70,
            z: -40,
            rotationY: 90,
            rotationZ: -10
        }, {
            x: -12,
            y: -70,
            z: -40,
            rotationY: 90,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_help3 = this.wrapperEl.querySelector('.help3')
        var help3 = new C3D.Plane({el: el_help3})
        help3.name('help3').size(30).update()
        this.scene.addChild(help3)
        JT.set(el_help3, {transformStyle: "preserve-3d"});
        JT.fromTo(el_help3, 1.2, {
            x: -50,
            y: -70,
            z: -4,
            rotationY: 180,
            rotationZ: -10
        }, {
            x: -50,
            y: -70,
            z: -4,
            rotationY: 180,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_help4 = this.wrapperEl.querySelector('.help4')
        var help4 = new C3D.Plane({el: el_help4})
        help4.name('help4').size(30).update()
        this.scene.addChild(help4)
        JT.set(el_help4, {transformStyle: "preserve-3d"});
        JT.fromTo(el_help4, 1.1, {
            x: -16,
            y: -100,
            z: 30,
            rotationY: -90,
            rotationZ: -10
        }, {
            x: -16,
            y: -100,
            z: 30,
            rotationY: -90,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_help5 = this.wrapperEl.querySelector('.help5')
        var help5 = new C3D.Plane({el: el_help5})
        help5.name('help5').size(30).update()
        this.scene.addChild(help5)
        JT.set(el_help5, {transformStyle: "preserve-3d"});
        JT.fromTo(el_help5, 1.2, {
            x: -12,
            y: -140,
            z: -20,
            rotationY: 90,
            rotationZ: 10
        }, {
            x: -12,
            y: -140,
            z: -20,
            rotationY: 90,
            rotationZ: -10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });
    },
    addProducts() {
        var el_p1 = this.wrapperEl.querySelector('.product_1')
        var product_1 = new C3D.Plane({el: el_p1})
        product_1.name('product_1').size(30).update()
        // .rotation(0, 90, 0).position(4, -100, 30)
        this.scene.addChild(product_1)
        JT.set(el_p1, {transformStyle: "preserve-3d"});
        JT.fromTo(el_p1, 1.1, {
            x: -10,
            y: -65,
            z: 38,
            rotationY: 90,
            rotationZ: -10
        }, {
            x: -10,
            y: -65,
            z: 38,
            rotationY: 90,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_p2 = this.wrapperEl.querySelector('.product_2')
        var product_2 = new C3D.Plane({el: el_p2})
        product_2.name('product_2').size(30).update()
        // .rotation(0, 180, 0).position(30, -100, -4)
        this.scene.addChild(product_2)
        JT.set(el_p2, {transformStyle: "preserve-3d"});
        JT.fromTo(el_p2, 1.2, {
            x: 20,
            y: -120,
            z: -2,
            rotationY: 180,
            rotationZ: -10
        }, {
            x: 20,
            y: -120,
            z: -2,
            rotationY: 180,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_p3 = this.wrapperEl.querySelector('.product_3')
        var product_3 = new C3D.Plane({el: el_p3})
        product_3.name('product_3').size(30).update()
        // .rotation(0, -90, 0).position(-4, -100, -30)
        this.scene.addChild(product_3)
        JT.set(el_p3, {transformStyle: "preserve-3d"});
        JT.fromTo(el_p3, 1.1, {
            x: -16,
            y: -70,
            z: -40,
            rotationY: -90,
            rotationZ: -10
        }, {
            x: -16,
            y: -70,
            z: -40,
            rotationY: -90,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var el_p4 = this.wrapperEl.querySelector('.product_4')
        var product_4 = new C3D.Plane({el: el_p4})
        product_4.name('product_4').size(30).update()
        // .rotation(0, 0, 0).position(-30, -100, 4)
        this.scene.addChild(product_4)
        JT.set(el_p4, {transformStyle: "preserve-3d"});
        JT.fromTo(el_p4, 1.2, {
            x: -50,
            y: -70,
            z: 2,
            rotationY: 0,
            rotationZ: -10
        }, {
            x: -50,
            y: -70,
            z: 2,
            rotationY: 0,
            rotationZ: 10,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });
    },
    doShowErshoue() {
        this.setState({showProductErshou: true})
    },
    doShowLaoyou() {
        this.setState({showProductLaoyou: true});
    },
    doShowShebao() {
        this.setState({showProductShebao: true});
    },
    doShowQuanbu() {
        this.setState({showProductQuanbu: true});
    },
    doShowShare() {
        this.setState({showShare: true})
    },
    doShowQr() {
        this.setState({showQr: true})
    },
    getInitialState() {
        return {
            showQr: false,
            showShare: false,
            showProductErshou: false,
            showProductLaoyou: false,
            showProductShebao: false,
            showProductQuanbu: false,
            owner: (this.props.user.userId == this.props.collect.ownerId),
            // owner: false,
        }
    },
    componentWillMount() {
        let link = `${window.location.origin}${window.location.pathname}#/collect/tree?cid=${this.props.collect.id}`
        global.setWxLink(link)
        // console.log(this.props);
        // console.log(this.state);
    },
    componentDidMount() {
        let isLight = parseInt(this.props.collect.status) > 0
        let wrapperEl = ReactDOM.findDOMNode(this)
        this.wrapperEl = wrapperEl
        //创建场景
        var s = new C3D.Stage()
        this.s = s
        // s.camera.rotation(-10, 0, 0).updateT()
        s.size(window.innerWidth, window.innerHeight).material({image: require('../../../img/tree_bg.jpg'), size: '100% 100%'}).update()
        wrapperEl.appendChild(s.el)
        if (window.innerWidth > 370) {
            s.camera.position(0, -20, 0).updateT()
            s.fov = 330;
        } else if (window.innerWidth > 400) {} else {
            s.camera.position(0, -20, 0).updateT()
            s.fov = 350;
        }

        //创建场景
        var scene = C3D.create({
            type: 'sprite',
            position: [
                0, 0, -s.fov
            ],
            children: [
                {
                    type: 'plane',
                    el: wrapperEl.querySelector('.t1-a'),
                    name: 'p1',
                    size: [
                        100, 200
                    ],
                    position: [
                        0, -100, 0
                    ],
                    origin: [
                        '100%', '50%', '0px'
                    ],
                    // rotation: [0, 35, 0],
                }, {
                    type: 'plane',
                    el: wrapperEl.querySelector('.t2-a'),
                    name: 'p2',
                    size: [
                        100, 200
                    ],
                    position: [
                        0, -100, 0
                    ],
                    origin: [
                        '100%', '50%', '0px'
                    ],
                    rotation: [0, 90, 0]
                }, {
                    type: 'plane',
                    el: wrapperEl.querySelector('.t1-b'),
                    name: 'p1-b',
                    size: [
                        100, 200
                    ],
                    position: [
                        0, -100, 0
                    ],
                    origin: [
                        '0%', '50%', '0px'
                    ],
                    // rotation: [0, 35, 0]
                }, {
                    type: 'plane',
                    el: wrapperEl.querySelector('.t2-b'),
                    name: 'p2-b',
                    size: [
                        100, 200
                    ],
                    position: [
                        0, -100, 0
                    ],
                    origin: [
                        '0%', '50%', '0px'
                    ],
                    rotation: [0, 90, 0]
                }
            ]
        })
        this.scene = scene
        this.scene.rotation(0, -80, 0).updateT()
        s.addChild(scene)

        this.addProducts()
        this.addHelps()

        var star = new C3D.Plane({el: wrapperEl.querySelector('.star')})
        star.name('star').size(50).position(0, -215, -s.fov - 10).rotation(0, 0, 0).update()
        s.addChild(star)

        var star_light = new C3D.Plane({el: wrapperEl.querySelector('.star_light')})
        star_light.name('star_light').size(150).position(-3, -200, -s.fov + 8).rotation(0, 0, 0).update()
        s.addChild(star_light)

        JT.set(wrapperEl.querySelector('.star_light'), {transformStyle: "preserve-3d"});
        JT.fromTo(wrapperEl.querySelector('.star_light'), 1.3, {
            opacity: isLight
                ? 0.5
                : 0
        }, {
            opacity: isLight
                ? 1
                : 0,
            delay: 0,
            repeat: -1,
            yoyo: true,
            ease: JT.Quad.InOut
        });

        var l360 = new C3D.Plane({el: wrapperEl.querySelector('.l360')})
        l360.name('l360').size(100).position(0, 35, -s.fov).rotation(90, 0, 0).update()
        s.addChild(l360)

        // wrapperEl.addEventListener('mousedown', this.mouseDownHandler)
        wrapperEl.addEventListener('touchstart', this.mouseDownHandler)
        // wrapperEl.addEventListener('mouseup', this.mouseUpHandler)
        wrapperEl.addEventListener('touchend', this.mouseUpHandler)
        // wrapperEl.addEventListener('touchmove', this.mouseMoveHandler)
        this.isMoving = false
        this.lastMouseX = 0
        this.lastMouseY = 0
        this.curMouseX = 0
        this.curMouseY = 0
        this.lastAngleX = 0
        this.lastAngleY = 0
        this.angleX = 0
        this.angleY = 0

        window.onresize = function() {
            this.resize()
        }
        this.resize()
        this.requestAnimationFrame(this.go)

        setTimeout(function() {
            var xscroll_ershou = new window.XScroll({renderTo: '#popProduct_ershou', scrollbarX: false, lockX: true, lockY: false})
            xscroll_ershou.render()
            var xscroll_laoyou = new window.XScroll({renderTo: '#popProduct_laoyou', scrollbarX: false, lockX: true, lockY: false})
            xscroll_laoyou.render()
            var xscroll_shebao = new window.XScroll({renderTo: '#popProduct_shebao', scrollbarX: false, lockX: true, lockY: false})
            xscroll_shebao.render()
            var xscroll_quanbu = new window.XScroll({renderTo: '#popProduct_quanbu', scrollbarX: false, lockX: true, lockY: false})
            xscroll_quanbu.render()
            // emitter.emit('alert',(
            //     <div className='alertMessage'>
            //         <p>选择您喜欢的奖品装饰圣诞树，</p>
            //         <p>或上传您和好友的亲密合照，</p>
            //         <p>即有机会帮助好友赢取圣诞树上</p>
            //         <p>的奖品哦！</p>
            //     </div>
            // ) , 'text')
        }, 1000)

    },
    renderTreeBottom() {
        let step = this.props.collect.supports
            ? this.props.collect.supports.length
            : 0
        let isLight = parseInt(this.props.collect.status) > 0
        let friendSee = (
            <div className='treeBottom'>
                <ProgressBar step={step}/>
                <GiftBar {...this.props}/>
                <img onClick={this.goHome} className='btn_my_join' src={require('../../../img/btn_my_join.png')}/>
            </div>
        )
        let ownerSee = (
            <div className='treeBottom'>
                <ProgressBar step={step}/> {step == 0
                    ? <img className='tree_intor' src={require('../../../img/tree_intor.png')}/>
                    : ''}
                {step != 0 && step != 5
                    ? (
                        <div style={{
                            marginTop: '0px',
                            marginBottom: '0px'
                        }}>
                            <p>已经有<span style={{
                            color: 'red'
                        }}>{step}</span>位好友帮助您装饰啦！</p>
                            <p>想要拿走奖品，快快邀请好友帮忙吧！</p>
                        </div>
                    )
                    : ''}
                {(step == 5 && !isLight)
                    ? (
                        <div>
                            <p>您的<span style={{
                            color: 'red'
                        }}>5</span>位好友已帮助您完成装扮圣诞树！</p>
                            <p>马上点击“到店赢礼”，到经销店完成验证</p>
                            <p>就有机会抽取圣诞树上的奖品，快快行动吧～</p>
                        </div>
                    )
                    : ''}
                {isLight
                    ? (
                        <div style={{
                            marginTop: '0px',
                            marginBottom: '0px'
                        }}>
                            <p>哇哦～ 您的圣诞树已经点亮啦！</p>
                            <p>快点击“立即抽奖”拿走奖品吧！</p>
                        </div>
                    )
                    : ''}
                {step != 5
                    ? (<img onClick={this.doShowShare} className='btn_inv_friend' src={require('../../../img/btn_inv_friend.png')}/>)
                    : ''}
                {(step == 5 && !isLight)
                    ? (<img onClick={this.doShowQr} className='btn_go_4s' src={require('../../../img/btn_go_4s.png')}/>)
                    : ''}
                {isLight
                    ? (<img onClick={this.goLottery} className='btn_do_lottery' src={require('../../../img/btn_do_lottery.png')}/>)
                    : ''}
            </div>
        )
        if (this.state.owner) {
            return ownerSee
        } else {
            return friendSee
        }
    },
    render() {
        let {collect} = this.props
        console.log(collect);
        let isLight = parseInt(collect.status) > 0
        let minHeight = window.innerHeight
        let jt = require('../../../img/jt.png')
        let jp = require('../../../img/jp.png')
        let jj = require('../../../img/jj.png')
        let j1 = require('../../../img/j1.png')
        let j2 = require('../../../img/j2.png')
        let j3 = require('../../../img/j3.png')

        let gifts = []
        for (var i = 0; i < 5; i++) {
            let cls = `help help${i + 1}`
            if (collect.supports && collect.supports[i]) {
                if (collect.supports[i].tp.toString() == '1') {
                    gifts.push(
                        <div key={i} className={cls}><img src={j1}/></div>
                    )
                }
                if (collect.supports[i].tp.toString() == '2') {
                    gifts.push(
                        <div key={i} className={cls}><img src={j2}/></div>
                    )
                }
                if (collect.supports[i].tp.toString() == '3') {
                    gifts.push(
                        <div key={i} className={cls}><img src={j3}/></div>
                    )
                }
                if (collect.supports[i].tp.toString() == 'p') {
                    gifts.push(
                        <div onClick={this.showPhoto} data-src={collect.supports[i].photo} key={i} className={cls}>
                            <img src={jp}/>
                            <img className='sss' src={collect.supports[i].photo + '!sss'}/>
                        </div>
                    )
                }
                if (collect.supports[i].tp.toString() == 't') {
                    gifts.push(
                        <div key={i} className={cls}><img src={jt}/></div>
                    )
                }
            } else {
                gifts.push(
                    <div key={i} className={cls}><img src={jj}/></div>
                )
            }
        }

        return (
            <div className='treeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <img className="t1-a" src={require('../../../img/tree1_a.png')}/>
                <img className="t1-b" src={require('../../../img/tree1_b.png')}/>
                <img className="t2-a" src={require('../../../img/tree2_a.png')}/>
                <img className="t2-b" src={require('../../../img/tree2_b.png')}/>
                <img className="star" src={require('../../../img/star.png')}/>
                <img className="star_light" src={require('../../../img/star_light.png')}/>
                <img className="l360" src={require('../../../img/label_360.png')}/>
                <img onClick={this.doShowErshoue} className="product_1" src={require('../../../img/product_1.png')}/>
                <img onClick={this.doShowLaoyou} className="product_2" src={require('../../../img/product_2.png')}/>
                <img onClick={this.doShowShebao} className="product_3" src={require('../../../img/product_3.png')}/>
                <img onClick={this.doShowQuanbu} className="product_4" src={require('../../../img/product_4.png')}/> {gifts}
                {this.renderTreeBottom()}
                <Popup show={this.state.showQr} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-end'
                        }}>
                            <div className='popQr'>
                                <div className='close' onClick={this.doCloseInfo}></div>
                                <div className='container'>
                                    <QRCode size={80} value={`${window.location.origin + window.location.pathname.replace(/\/[^\/]*\.html$/g, '/')}dfc.html?cid=${collect.id}`}></QRCode>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
                <Popup show={this.state.showShare} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }} onClick={this.doCloseInfo}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end'
                        }}>
                            <img className='pop_share' src={require('../../../img/pop_share.png')}/>
                        </div>
                    </div>
                </Popup>
                <Popup show={this.state.showProductErshou} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-end'
                        }}>
                            <div className='popProduct popProduct_ershou' style={{
                                width: `${window.innerWidth}px`,
                                height: `${ 945 *window.innerWidth / 640}px`
                            }}>
                                <div className='close' onClick={this.doCloseInfo} style={{
                                    minHeight: `${ 70 *window.innerWidth / 640}px`
                                }}></div>
                                <div className='container' id='popProduct_ershou' style={{
                                    height: `${ 720 *window.innerWidth / 640}px`,
                                    width: `${ 560 *window.innerWidth / 640}px`
                                }}>
                                    <div className='xs-container'>
                                        <div className="xs-content">
                                            <img src={require('../../../img/intro_ershou.jpg')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
                <Popup show={this.state.showProductLaoyou} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-end'
                        }}>
                            <div className='popProduct popProduct_laoyou' style={{
                                width: `${window.innerWidth}px`,
                                height: `${ 945 *window.innerWidth / 640}px`
                            }}>
                                <div className='close' onClick={this.doCloseInfo} style={{
                                    minHeight: `${ 70 *window.innerWidth / 640}px`
                                }}></div>
                                <div className='container' id='popProduct_laoyou' style={{
                                    height: `${ 720 *window.innerWidth / 640}px`,
                                    width: `${ 560 *window.innerWidth / 640}px`
                                }}>
                                    <div className='xs-container'>
                                        <div className="xs-content">
                                            <img src={require('../../../img/intro_laoyou.jpg')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
                <Popup show={this.state.showProductShebao} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-end'
                        }}>
                            <div className='popProduct popProduct_shebao' style={{
                                width: `${window.innerWidth}px`,
                                height: `${ 945 *window.innerWidth / 640}px`
                            }}>
                                <div className='close' onClick={this.doCloseInfo} style={{
                                    minHeight: `${ 70 *window.innerWidth / 640}px`
                                }}></div>
                                <div className='container' id='popProduct_shebao' style={{
                                    height: `${ 720 *window.innerWidth / 640}px`,
                                    width: `${ 560 *window.innerWidth / 640}px`
                                }}>
                                    <div className='xs-container'>
                                        <div className="xs-content">
                                            <img src={require('../../../img/intro_shebao.jpg')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
                <Popup show={this.state.showProductQuanbu} closePopup={this.doCloseInfo}>
                    <div style={{
                        height: `${minHeight}px`
                    }}>
                        <div className='infoContainer' style={{
                            alignItems: 'flex-end'
                        }}>
                            <div className='popProduct popProduct_quanbu' style={{
                                width: `${window.innerWidth}px`,
                                height: `${ 945 *window.innerWidth / 640}px`
                            }}>
                                <div className='close' onClick={this.doCloseInfo} style={{
                                    minHeight: `${ 70 *window.innerWidth / 640}px`
                                }}></div>
                                <div className='container' id='popProduct_quanbu' style={{
                                    height: `${ 688 *window.innerWidth / 640}px`,
                                    width: `${ 560 *window.innerWidth / 640}px`
                                }}>
                                    <div className='xs-container'>
                                        <div className="xs-content">
                                            <img src={require('../../../img/intro_quanbu.jpg')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </div>
        )
    }
})

export default Tree3D
