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
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, name: name})
        request.get('./')
    })
}

export function auth(openid, access_token, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, loading: true})
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
                dispatch({type: ActionTypes.COLLECT_SAY_HELLO, user: res.body, loading: false})
                access_token = res.body.id
                cb(null, res.body)
            }
        })
    })
}

export function setUser(user) {
    return (dispatch => {
        access_token = user.id
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, user: user, loading: false})
    })
}

export function join(channel, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/join?access_token=${access_token}`
        let req = request.post(url)
        req.type('form')
        req.send({channel: channel, activityId: variable.activityId})
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                cb(err, null)
            } else {
                dispatch({type: ActionTypes.COLLECT_SAY_HELLO, collect: res.body, loading: false})
                cb(null, res.body)
            }
        })
    })
}

export function getCollect(cid, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/${cid}?access_token=${access_token}`
        let req = request.get(url)
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                if(cb)cb(err, null)
            } else {
                dispatch({type: ActionTypes.COLLECT_SAY_HELLO, collect: res.body, loading: false})
                if(cb)cb(null, res.body)
            }
        })
    })
}

export function support(cid,data, cb) {
    return (dispatch => {
        dispatch({type: ActionTypes.COLLECT_SAY_HELLO, loading: true})
        let url = `/${variable.end_point}/collects/support?access_token=${access_token}`
        let req = request.post(url)
        req.type('form')
        req.send({cid: cid, data: data})
        req.timeout(100000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                if(cb)cb(err, res)
            } else {
                dispatch({type: ActionTypes.COLLECT_SAY_HELLO, collect: res.body, loading: false})
                if(cb)cb(null, res.body)
            }
        })
    })
}
