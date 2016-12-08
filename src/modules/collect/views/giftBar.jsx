import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'

import emitter from '../../common/emitter.js'
import Upload2Upyun from '../../common/Upload2Upyun.js'
import Variable from '../../common/variable.js'

import indexOf from 'lodash/indexOf'

import '../style/giftBar.less'

const GiftBar = React.createClass({
    doUpload(selectImgsObj) {
        let self = this
        emitter.emit('loading', '', true)
        let imgs = []
        let forms = []
        for (var s in selectImgsObj) {
            imgs.push(selectImgsObj[s])
        }
        imgs.map((item) => {
            forms.push(item.formData)
        })
        emitter.emit('loading', '开始上传图片', true)
        let upload2Upyun = new Upload2Upyun(null, forms)
        upload2Upyun.configUpalod({form_api_secret: Variable.form_api_secret, bucket: Variable.bucket})
        let image_arr = []
        let imageInfo_arr = []
        upload2Upyun.upload(function(err, images) {
            // if (err) console.error(err);
            // console.log('图片信息：');

            images.map((item) => {
                image_arr.push(item.absUrl)
                imageInfo_arr.push({width: item['image-width'], height: item['image-height']})
            })
            // self.createBlog(image_arr, imageInfo_arr, obj)
            emitter.emit('loading', '', false)
            // console.log(image_arr);
            let data = {
                tp: 'p',
                photo: image_arr[0]
            }
            self.doSend(data)
        }, function(currProgress, totalProgress) {
            emitter.emit('loading', '进度: ' + currProgress + '%', true)
        })
    },
    handelSelectFile(e) {
        let self = this
        let file = e.target.files[0]
        let imageType = /image.*/
        if (!file.type.match(imageType)) {
            return 0
        }
        window.lrz(file, {
            width: 640,
            height: 1136
        }).then(function(rst) {
            let selectImgsObj = {
                'p': rst
            }
            self.doUpload(selectImgsObj)
        }).catch(function() {}).always(function() {})

    },
    componentWillMount() {
        let currOpenid = this.props.user.user.openid
        let support_ids = []
        if (this.props.collect.supports) {
            this.props.collect.supports.map((item) => {
                support_ids.push(item.openid)
            })
        }
        let isSupported = indexOf(support_ids, currOpenid) > -1
        if (isSupported) {
            if (this.props.collect.supports && this.props.collect.supports.length == 5) {
                emitter.emit('alert', (
                    <div>
                        <p>您的好友已经去经销店拿奖啦！</p>
                        <p>您也快来参加活动吧！</p>
                    </div>
                ), 'text')
            } else {
                emitter.emit('alert', (
                    <div>
                        <p>您已帮助过好友装饰圣诞树啦，</p>
                        <p>您也快来参加活动吧！
                        </p>
                    </div>
                ), 'text')
            }
        } else {
            if (this.props.collect.supports && this.props.collect.supports.length == 5) {
                emitter.emit('alert', (
                    <div>
                        <p>您的好友已经去经销店拿奖啦！</p>
                        <p>您也快来参加活动吧！</p>
                    </div>
                ), 'text')
            } else {
                window.toastTime = 7000
                emitter.emit('alert', (
                    <div>
                        <p style={{
                            textAlign: 'left',
                            marginTop: '4px',
                            marginBottom: '4px'
                        }}>选择您喜欢的奖品装饰圣诞树，</p>
                        <p style={{
                            textAlign: 'left',
                            marginTop: '4px',
                            marginBottom: '4px'
                        }}>或上传您和好友的亲密合照，</p>
                        <p style={{
                            textAlign: 'left',
                            marginTop: '4px',
                            marginBottom: '4px'
                        }}>即有机会帮助好友赢取圣诞树上</p>
                        <p style={{
                            textAlign: 'left',
                            marginTop: '4px',
                            marginBottom: '4px'
                        }}>的奖品哦！</p>
                    </div>
                ), 'text')
            }
        }

    },
    sendPhoto() {
        let currOpenid = this.props.user.user.openid
        let support_ids = []
        if (this.props.collect.supports) {
            this.props.collect.supports.map((item) => {
                support_ids.push(item.openid)
            })
        }
        let isSupported = indexOf(support_ids, currOpenid) > -1
        if (isSupported) {
            emitter.emit('alert', (
                <div>
                    <p>您已帮助过好友装饰圣诞树啦，</p>
                    <p>您也快来参加活动吧！
                    </p>
                </div>
            ), 'text')
            return
        }

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

        let tp = e.target.getAttribute('data-tp')
        // TODO: 只能送一次
        let currOpenid = this.props.user.user.openid
        let support_ids = []
        if (this.props.collect.supports) {
            this.props.collect.supports.map((item) => {
                support_ids.push(item.openid)
            })
        }
        let isSupported = indexOf(support_ids, currOpenid) > -1
        if (isSupported) {
            emitter.emit('alert', (
                <div>
                    <p>您已帮助过好友装饰圣诞树啦，</p>
                    <p>您也快来参加活动吧！
                    </p>
                </div>
            ), 'text')
            return
        }
        let self = this
        let data = {
            tp: tp
        }
        emitter.emit('confirm', '助力好友', (
            <div>
                <p>您确定要用这个礼物</p>
                <p>帮您的好友装饰圣诞树吗？</p>
            </div>
        ), '我再想想', '装饰圣诞树', function() {
            self.doSend(data)
        })
    },
    doSend(data) {
        let cid = this.props.collect.id
        this.props.actions.support(cid, data, function(err, collect) {
            if (err) {
                if (collect.body.error.message == '好友已经达成条件了') {
                    emitter.emit('alert', (
                        <div>
                            <p>您的好友已经去经销店拿奖啦！</p>
                            <p>您也快来参加活动吧！</p>
                        </div>
                    ), 'text')
                } else {
                    emitter.emit('alert', (
                        <div>
                            <p>您已帮助过好友装饰圣诞树啦，</p>
                            <p>您也快来参加活动吧！
                            </p>
                        </div>
                    ), 'text')
                }
                // TODO: 只能送一次
            } else {
                if (collect.supports.length == 5) {
                    emitter.emit('alert', (
                        <div>
                            <p>您的好友已经去经销店拿奖啦！</p>
                            <p>您也快来参加活动吧！</p>
                        </div>
                    ), 'text')
                } else {
                    emitter.emit('alert', (
                        <div>
                            <p>装饰成功！</p>
                            <p>快转动圣诞树找找您的奖品装饰在哪里吧！</p>
                        </div>
                    ), 'text')
                }
            }
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
                    height: '0px',
                    opacity: 0
                }} onChange={this.handelSelectFile}/>
            </div>
        )
    }
})

export default GiftBar
