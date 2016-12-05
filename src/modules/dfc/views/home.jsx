/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import HeadLogo from '../../common/head-logo.jsx'
import NavigateMixin from '../../common/navigate-mixin.js'

import {setItem, getItem} from 'cex/helpers/localstorage-processing.js'
import {encode64, decode64} from 'cex/helpers/base64.js'
import {_stringify, _parse} from 'cex/helpers/common.js'

import emitter from '../../common/emitter.js'

const Home = React.createClass({
    mixins: [NavigateMixin],
    getQuery(q) {
        var m = window.location.href.match(new RegExp('(\\?|#|&)' + q + '=([^&|^#]*)(#|&|$)'))
        return !m
            ? null
            : decodeURIComponent(m[2])
    },
    goJoin() {
        window.location.href = 'index.html'
        // let _querys = null
        // this.goHref('index',['collect','home'], _querys)
    },
    goAuth() {
        this.navTo([
            'dfc', 'auth'
        ], null, this.context.runType, '/#/')
    },
    componentWillMount() {
        let self = this
        this.cid = this.getQuery('cid')
        this.seller = getItem('collect_seller')
            ? _parse(decode64(getItem('collect_seller')))
            : null
        if (this.seller && this.cid) {
            console.log(this.seller);
            console.log(this.cid);
            emitter.emit('loading', '', true)
            this.props.actions.permit(this.cid, this.seller.code, (err, collect) => {
                emitter.emit('loading', '', false)
                console.log(err, collect);
                if (collect) {
                    self.navTo([
                        'dfc', 'result'
                    ], null, this.context.runType, '/#/')
                }
            })
        }
    },
    render() {
        let minHeight = window.innerHeight

        return (
            <div className='DFChomeView' style={{
                minHeight: `${minHeight}px`
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img onClick={this.goJoin} className='join' src={require('../../../img/dfc_join.png')}/>
                    <img onClick={this.goAuth} className='auth' src={require('../../../img/dfc_auth.png')}/>
                </div>
            </div>
        )
    }

})

export default Home
