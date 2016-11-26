/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'

const Tree = React.createClass({
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
        this.scene.rotation(0, this.angleX, 0).updateT()
        // this.s.camera.rotate(0, 0.3, 0).updateT()

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
    componentDidMount() {
        // alert('111')
        let wrapperEl = ReactDOM.findDOMNode(this)
        this.wrapperEl = wrapperEl
        //创建场景
        var s = new C3D.Stage()
        this.s = s
        s.camera.position(0, -50, 0).updateT()
        // s.camera.rotation(-10, 0, 0).updateT()
        s.size(window.innerWidth, window.innerHeight).material({image: require('../../../img/tree_bg.jpg'), size: '100% 100%'}).update()
        wrapperEl.appendChild(s.el)

        // var sky = C3D.create({
        //     type: 'sprite',
        //     position: [
        //         0, 0, -s.fov
        //     ],
        //     children: [
        //         {
        //             type: 'plane',
        //             // el: wrapperEl.querySelector('.sky'),
        //             name: 'p3',
        //             size: [1000],
        //             position: [
        //                 0, -500, -300
        //             ],
        //             rotation: [
        //                 0, 0, 0
        //             ],
        //             material: [
        //                 {
        //                     // color: C3D.getRandomColor()
        //                     image: require('../../../img/treeBG.jpg')
        //                 }
        //             ]
        //         }
        //     ]
        // })
        //
        // s.addChild(sky)
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
                    rotation: [0, 35, 0]
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
                    rotation: [0, -55, 0]
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
                    rotation: [0, 35, 0]
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
                    rotation: [0, -55, 0]
                },
                // , {
                //     type: 'plane',
                //     name: 'p3',
                //     size: [3000],
                //     position: [
                //         0, 0, 0
                //     ],
                //     rotation: [
                //         90, 0, 0
                //     ],
                //     material: [
                //         {
                //             color: C3D.getRandomColor()
                //         }
                //     ]
                // }
                // , {
                //     type: 'plane',
                //     name: 'p3',
                //     size: [100],
                //     position: [
                //         0, 100, 0
                //     ],
                //     rotation: [
                //         0, 45, 0
                //     ],
                //     material: [
                //         {
                //             color: C3D.getRandomColor()
                //         }
                //     ]
                // }, {
                //     type: 'plane',
                //     name: 'p4',
                //     size: [100],
                //     position: [
                //         0, -100, 0
                //     ],
                //     rotation: [
                //         0, -45, 0
                //     ],
                //     material: [
                //         {
                //             color: C3D.getRandomColor()
                //         }
                //     ]
                // }
            ]
        })
        this.scene = scene
        s.addChild(scene)
        console.log(scene.p1);

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
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='treeView' style={{
                minHeight: `${minHeight}px`
            }}>
            <HeadLogo />
                <img className="t1-a" src={require('../../../img/tree1_a.png')}/>
                <img className="t1-b" src={require('../../../img/tree1_b.png')}/>
                <img className="t2-a" src={require('../../../img/tree2_a.png')}/>
                <img className="t2-b" src={require('../../../img/tree2_b.png')}/>
            </div>
        )
    }
})

export default Tree
