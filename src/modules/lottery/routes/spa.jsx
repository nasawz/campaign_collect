/**
 * create by nasa.wang
 */
import React, { PropTypes } from 'react'
import { RouterMixin } from 'react-mini-router'

import * as Actions from '../actions/homeActions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'
import Contacts from '../containers/contactsContainer.js'
import Result from '../containers/resultContainer.js'
import SellerResult from '../views/sellerResult.jsx'

import { getQuery } from 'cex/helpers/url-processing.js'
import { setItem, getItem } from 'cex/helpers/localstorage-processing.js'
import { encode64, decode64 } from 'cex/helpers/base64.js'
import { _stringify, _parse } from 'cex/helpers/common.js'

import { navigate } from 'react-mini-router'

import Music from '../../../components/Music/Music.jsx'

const Routes = React.createClass({
    mixins: [RouterMixin],
    getQuery(q) {
        var m = window.location.href.match(new RegExp('(\\?|#|&)' + q + '=([^&|^#]*)(#|&|$)'))
        return !m
            ? null
            : decodeURIComponent(m[2])
    },
    childContextTypes: {
        runType: PropTypes.string.isRequired
    },
    getChildContext: function () {
        return { runType: 'spa' }
    },
    routes: {
        '/home': 'home',
        '/contacts': 'contacts',
        '/result': 'result'
    },
    componentWillMount() {
        if (getItem('collect_user')) {
            let user = _parse(decode64(getItem('collect_user')))
            this.props.actions.setUser(user)
        } else {
            let openid = getQuery('openid')
            let access_token = getQuery('access_token')
            // let access_token = 'aaaaa'
            if (openid && access_token) {
                this.props.actions.auth(openid, access_token, (err, user) => {
                    user = encode64(_stringify(user))
                    setItem('collect_user', user)
                })
            } else {
                // var callback = encodeURIComponent(window.location.href)
                // window.location.href = `http://auth.vkeve.com?callback=${callback}&client=klz`
                let callback = encodeURIComponent(window.location.href)
                window.location.href = 'http://cod.baleina.cn?callback=' + callback + '&client=klz'
            }
        }

        this.cid = this.getQuery('cid')
        if (this.cid) {
            this.props.actions.getCollect(this.cid, (err, collect) => {
                if (!collect.contacts) {
                    navigate('/lottery/contacts')
                }
            })
        }
        this.seller = getItem('collect_seller')
            ? _parse(decode64(getItem('collect_seller')))
            : null
    },
    render() {
        if (!this.props.user) {
            return <Container><div /></Container>
        }
        if (!this.props.collect) {
            return <Container><div /></Container>
        }
        if (this.props.user.user.seller) {
            return <Container><SellerResult /></Container>
        }
        if (this.seller) {
            return <Container><SellerResult /></Container>
        }
        return (
            <Container>
                <Music />
                {this.renderCurrentRoute()}
            </Container>
        )
    },
    home(params) {
        return <div><Home params={params} /></div>
    },
    contacts(params) {
        return <div><Contacts params={params} /></div>
    },
    result(params) {
        return <div><Result params={params} /></div>
    },
    notFound(path) {
        if (path == '/') {
            return <div />
        } else {
            return <div className="not-found">Page Not Found: {path}</div>
        }
    }
})

function mapProps(state) {
    return { name: state.LOTTERY.name, user: state.LOTTERY.user, collect: state.LOTTERY.collect }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapProps, mapDispatchToProps)(Routes)
