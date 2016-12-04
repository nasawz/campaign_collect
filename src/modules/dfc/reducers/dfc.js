/* eslint-disable indent */

/**
 * create by nasa.wang
 */

import ActionTypes from '../constants/actionTypes.js'

import merge from 'lodash/merge'

const initialState = {
    name: '',
    seller: null,
}

export default function DFC(state = initialState, action = null) {
    switch (action.type) {
        case ActionTypes.DFC_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}
