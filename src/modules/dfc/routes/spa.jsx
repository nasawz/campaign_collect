/**
 * create by nasa.wang
 */
import React, {PropTypes} from 'react'
import {RouterMixin} from 'react-mini-router'

import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'
import Auth from '../containers/authContainer.js'
import Result from '../containers/resultContainer.js'

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
    render () {
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

export default Routes
