/**
 * create by nasa.wang
 */
import React from 'react'
import Toast from 'cex/components/toast/toast.jsx'
import Loading from 'cex/components/loading/loading.jsx'
import ActionSheet from 'cex/components/actionsheet/actionsheet.jsx'
import Dialog from 'cex/components/dialog/dialog.jsx'
import Confirm from 'cex/components/confirm/confirm.jsx'

import emitter from './emitter.js'
import request from 'superagent'
import variable from './variable.js'
import {parseError} from './parse-error.js'
import {getTenantAndLoginType} from './tenant-logintype.js'

import ReactDOM from 'react-dom'
import classNames from 'classnames'

const Container = React.createClass({
    //忽略不需要认证的地址
    chkIngorePath() {
        let ignorePaths = ['/login']
        let isIngore = false
        let currPath = window.location.href
        ignorePaths.forEach((item) => {
            if (currPath.indexOf(item) > 0) {
                isIngore = true
                return
            }
        })
        return isIngore
    },
    goLogin() {
        let self = this
        setTimeout(function() {
            let isIngore = self.chkIngorePath()
            if (!isIngore) {
                let _tts = getTenantAndLoginType(window.location.href)
                let tenant = _tts[1]
                let loginType = _tts[0]
                let path = encodeURIComponent(window.location.href)
                let goPath = `${window.location.origin}/-${loginType}-/-${tenant}-/login-${loginType}.html?path=${path}`
                window.location.href = goPath
            }
        }, 1000)
    },
    touch() {
        let req = request.get('/api/' + variable.api_version + '/userinfo')
        req.timeout(10000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                this.goLogin()
            } else {
                this.setState({user: res.body})

            }
        })
    },
    clickSheet(key) {
        if (this.actionSheetFun) {
            this.actionSheetFun(key)
        }
    },
    componentWillMount() {
        let isIngore = this.chkIngorePath()
        if (!isIngore) {
            // this.touch()
        }
        let self = this
        emitter.addListener('alert', (message, type) => {
            self.setState({alertShow: true, alertMessage: message, toastType: type})
        })
        emitter.addListener('confirm', (title,content,cancel,confirm, fun) => {
            this.onConfirmFun = fun
            self.setState({confirmShow: true,
                        confirmTitle:title,
                        confirmContent:content,
                        confirmCancelBtn:cancel,
                        confirmConfirmBtn:confirm})
        })
        emitter.addListener('loading', (message, show) => {
            self.setState({loadShow: show, loadMessage: message})
        })
        emitter.addListener('actionsheet', (acMenus, fun) => {
            this.actionSheetFun = fun
            self.setState({acShow: true, acMenus: acMenus})
        })
        emitter.addListener('getuser', (fun) => {
            fun(this.state.user)
        })
    },
    wxScrollSolve(scrollWrapObj) {
        if (scrollWrapObj == "" || scrollWrapObj == undefined || scrollWrapObj == null) {
            return
        }
        var overscroll = function(el) {
            el.addEventListener('touchstart', function() {
                var top = el.scrollTop,
                    totalScroll = el.scrollHeight,
                    currentScroll = top + el.offsetHeight;
                if (top === 0) {
                    el.scrollTop = 1;
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1;
                }
            });
            el.addEventListener('touchmove', function(evt) {
                if (el.offsetHeight < el.scrollHeight)
                    evt._isScroller = true;
                }
            )
        };
        overscroll(scrollWrapObj);/*document.querySelector('.MainCon')*/
        document.body.addEventListener('touchmove', function(evt) {
            if (!evt._isScroller) {
                evt.preventDefault();
            }
        });
    },
    componentDidMount() {
        this.actionSheetFun = null
        this.onConfirmFun = null
        let wrapperEl = ReactDOM.findDOMNode(this)
        this.wxScrollSolve(wrapperEl)
    },
    closeToast() {
        this.setState({alertShow: false})
    },
    closelSheet() {
        this.actionSheetFun = null
        this.setState({acShow: false})
    },
    cancelHandler() {
        this.onConfirmFun = null
        this.setState({
            confirmShow: false
        })
    },
    confirmHandler(){
        if (this.onConfirmFun) {
            this.onConfirmFun()
        }
        this.onConfirmFun = null
        this.setState({
            confirmShow: false
        })
    },
    getInitialState() {
        return {
            alertShow: false,
            alertMessage: '',
            toastType: 'fail',

            loadShow: false,
            loadMessage: '',

            acShow: false,
            acMenus: {},
            user: null,

            confirmTitle:'',
            confirmContent:'',
            confirmCancelBtn:'',
            confirmConfirmBtn:'',
            confirmShow:false
        }
    },

    render() {
        let children = null
        // let isIngore = this.chkIngorePath()
        // if (this.state.user || isIngore === true) {
        //     children = this.props.children
        // }
        children = this.props.children
        let {
            alertShow,
            alertMessage,
            toastType,
            loadShow,
            loadMessage,
            acShow,
            acMenus,
            confirmShow,
            confirmTitle,
            confirmContent,
            confirmCancelBtn,
            confirmConfirmBtn
        } = this.state

        let classes = {
            'cex-Container': true,
            'plus': window.innerWidth > 370
        }
        return (
            <div className={classNames(classes)}>
                {children}
                <Toast show={alertShow} type={toastType} closeToast={this.closeToast}>{alertMessage}
                </Toast>
                <Dialog show={confirmShow}>
                    <Confirm
                        title={confirmTitle}
                        content={confirmContent}
                        cancelBtn={confirmCancelBtn}
                        confirmBtn={confirmConfirmBtn}
                        onCancel={this.cancelHandler}
                        onConfirm={this.confirmHandler} />
                </Dialog>
                <Loading show={loadShow} text={loadMessage}/>
                <ActionSheet show={acShow} menus={acMenus} clickSheet={this.clickSheet} closeSheet={this.closelSheet} showCancel/>
            </div>
        )
    }
})
export default Container
