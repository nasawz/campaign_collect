import React, {PropTypes} from 'react'
import emitter from '../../common/emitter.js'
import ReactDOM from 'react-dom'

import indexOf from 'lodash/indexOf'

import '../style/giftBar.less'

const GiftBar = React.createClass({
    componentWillMount() {
        let currOpenid = this.props.user.user.openid
        let support_ids = []
        this.props.collect.supports.map((item) => {
            support_ids.push(item.openid)
        })
        let isSupported = indexOf(support_ids, currOpenid) > -1
        if (isSupported) {
            emitter.emit('alert', (
                <div>
                    <p>您已帮助过好友装饰圣诞树啦，</p>
                    <p>您也快来参加活动吧！
                    </p>
                </div>
            ), 'text')
        }
    },
    sendPhoto() {
        let self = this
        emitter.emit('confirm', '助力好友', (
            <div>
                <p>您确定要用上传一张合影</p>
                <p>帮您的好友装饰圣诞树吗？</p>
            </div>
        ), '我再想想', '上传合影', function() {
            let uploadfile = ReactDOM.findDOMNode(self.refs.uploadfile)
            uploadfile.click()
        })
    },
    sendGift(e) {
        let self = this
        let tp = e.target.getAttribute('data-tp')
        let data = {
            tp: tp
        }
        let cid = this.props.collect.id
        emitter.emit('confirm', '助力好友', (
            <div>
                <p>您确定要用这个礼物</p>
                <p>帮您的好友装饰圣诞树吗？</p>
            </div>
        ), '我再想想', '装饰圣诞树', function() {
            self.props.actions.support(cid, data, function(err, collect) {
                if (err) {
                    emitter.emit('alert', (
                        <div>
                            <p>您已帮助过好友装饰圣诞树啦，</p>
                            <p>您也快来参加活动吧！
                            </p>
                        </div>
                    ), 'text')
                } else {
                    emitter.emit('alert', (
                        <div>
                            <p>已成功帮助好友装饰圣诞树，</p>
                            <p>您也快来参加活动吧！</p>
                        </div>
                    ), 'text')
                }
            })
            // console.log('装饰');
        })
    },
    render() {
        return (
            <div>
                <div className='giftBar'>
                    <img data-tp='t' onClick={this.sendGift} className='gifts_t' src={require('../../../img/gifts_t.png')}/>
                    <img data-tp='1' onClick={this.sendGift} className='gifts_1' src={require('../../../img/gifts_1.png')}/>
                    <img data-tp='2' onClick={this.sendGift} className='gifts_2' src={require('../../../img/gifts_2.png')}/>
                    <img data-tp='3' onClick={this.sendGift} className='gifts_3' src={require('../../../img/gifts_3.png')}/>
                    <img onClick={this.sendPhoto} className='gifts_photo' src={require('../../../img/gifts_photo.png')}/>
                </div>
                <input ref='uploadfile' type='file' style={{
                    width: '0px',
                    height: '0px'
                }}/>
            </div>
        )
    }
})

export default GiftBar
