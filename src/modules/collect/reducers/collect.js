/* eslint-disable indent */

/**
 * create by nasa.wang
 */

import ActionTypes from '../constants/actionTypes.js'

import merge from 'lodash/merge'

const initialState = {
    name: '',
    user: null,
    collect: null,
}

export default function COLLECT(state = initialState, action = null) {
    switch (action.type) {
        case ActionTypes.COLLECT_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}
