/**
 * create by nasa.wang
 */

import * as Actions from '../actions/homeActions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Result from '../views/result.jsx'

function mapProps(state) {
    return {
        name: state.LOTTERY.name,
        collect: state.LOTTERY.collect,
        user: state.LOTTERY.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapProps,mapDispatchToProps)(Result)
