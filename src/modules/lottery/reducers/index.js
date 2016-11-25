/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import LOTTERY from './lottery.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        LOTTERY,
        ...asyncReducers
    })
}
