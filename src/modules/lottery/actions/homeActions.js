/**
 * create by nasa.wang
 */
import ActionTypes from '../constants/actionTypes.js'
import request from 'superagent'
import variable from '../../common/variable.js'
import {parseError} from '../../common/parse-error.js'

let access_token = ''

export function sayHello(name) {
    return (dispatch => {
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, name: name})
        request.get('./')
    })
}

export function auth(openid, access_token, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/users/auth`
        let req = request.post(url)
        req.type('form')
        req.send({openid: openid, access_token: access_token, tenantId: variable.tenantId})
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                cb(err, null)
            } else {
                dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, user: res.body, loading: false})
                access_token = res.body.id
                cb(null, res.body)
            }
        })
    })
}

export function setUser(user) {
    return (dispatch => {
        access_token = user.id
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, user: user, loading: false})
    })
}

export function getCollect(cid, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/${cid}?access_token=${access_token}`
        let req = request.get(url)
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                if (cb)
                    cb(err, null)
            } else {
                dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, collect: res.body, loading: false})
                if (cb)
                    cb(null, res.body)
            }
        })
    })
}

export function contacts(cid, data, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/contacts?access_token=${access_token}`
        let req = request.post(url)
        req.type('form')
        req.send({cid: cid, data: data})
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                if (cb)
                    cb(err, null)
            } else {
                dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, collect: res.body, loading: false})
                if (cb)
                    cb(null, res.body)
            }
        })
    })
}

export function lottery(cid, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/lottery?access_token=${access_token}`
        let req = request.post(url)
        req.type('form')
        req.send({cid: cid, aid: variable.activityId})
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                if (cb)
                    cb(err, null)
            } else {
                dispatch({type: ActionTypes.LOTTERY_SAY_HELLO, collect: res.body, loading: false})
                if (cb)
                    cb(null, res.body)
            }
        })
    })
}
