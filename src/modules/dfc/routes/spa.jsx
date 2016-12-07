/**
 * create by nasa.wang
 */
import React, {PropTypes} from 'react'
import {RouterMixin} from 'react-mini-router'

import * as Actions from '../actions/homeActions.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'
import Auth from '../containers/authContainer.js'
import Result from '../containers/resultContainer.js'

import {getQuery} from 'cex/helpers/url-processing.js'
import {setItem, getItem} from 'cex/helpers/localstorage-processing.js'
import {encode64, decode64} from 'cex/helpers/base64.js'
import {_stringify, _parse} from 'cex/helpers/common.js'

const Routes = React.createClass({
    mixins: [RouterMixin],
    childContextTypes: {
        runType: PropTypes.string.isRequired
    },
    getChildContext: function() {
        return {
            runType: 'spa'
        }
    },
    routes: {
        '/home': 'home',
        '/auth': 'auth',
        '/result': 'result',
    },
    componentWillMount() {
        if (getItem('collect_user')) {
            let user = _parse(decode64(getItem('collect_user')))
            this.props.actions.setUser(user)
        } else {
            let openid = getQuery('openid')
            let access_token = getQuery('access_token')
            if (openid && access_token) {
                this.props.actions.auth(openid, access_token, (err, user) => {
                    user = encode64(_stringify(user))
                    setItem('collect_user', user)
                })
            } else {
                var callback = encodeURIComponent(window.location.href)
                window.location.href = `http://auth.vkeve.com?callback=${callback}&client=toyota`
            }
        }
    },
    render () {
        if (!this.props.user) {
            return <Container><div /></Container>
        }
        return (
            <Container>
                { this.renderCurrentRoute() }
            </Container>
        )
    },
    home(params) {
        return <div><Home params={params} /></div>
    },
    auth(params) {
        return <div><Auth params={params} /></div>
    },
    result(params) {
        return <div><Result params={params} /></div>
    },
    notFound(path) {
        if (path == '/') {
            return <div />
        }else{
            return <div className="not-found">Page Not Found: {path}</div>
        }
    }
})

function mapProps(state) {
    return {name: state.DFC.name, user: state.DFC.user, collect: state.DFC.collect}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapProps, mapDispatchToProps)(Routes)
