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

export default function LOTTERY(state = initialState, action = null) {
    switch (action.type) {
        case ActionTypes.LOTTERY_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}
