/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import COLLECT from './collect.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        COLLECT,
        ...asyncReducers
    })
}
