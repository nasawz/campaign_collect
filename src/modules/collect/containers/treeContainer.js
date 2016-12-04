/**
 * create by nasa.wang
 */

import * as Actions from '../actions/homeActions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Tree from '../views/tree.jsx'

function mapProps(state) {
    return {
        name: state.COLLECT.name,
        user: state.COLLECT.user,
        collect: state.COLLECT.collect,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapProps,mapDispatchToProps)(Tree)
