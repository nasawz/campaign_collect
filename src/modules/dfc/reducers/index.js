/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import DFC from './dfc.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        DFC,
        ...asyncReducers
    })
}
