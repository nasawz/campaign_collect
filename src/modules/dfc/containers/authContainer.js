/**
 * create by nasa.wang
 */

import * as Actions from '../actions/homeActions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Auth from '../views/auth.jsx'

function mapProps(state) {
    return {
        name: state.DFC.name,
        seller: state.DFC.seller,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapProps,mapDispatchToProps)(Auth)
