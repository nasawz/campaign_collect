/**
 * create by nasa.wang
 */
import ActionTypes from '../constants/actionTypes.js'
import request from 'superagent'
import variable from '../../common/variable.js'
import {
    parseError
} from '../../common/parse-error.js'

export function sayHello(name) {
    return (dispatch => {
        dispatch({
            type: ActionTypes.DFC_SAY_HELLO,
            name: name
        })
        request.get('./')
    })
}

export function certification(code,cb) {
    return (dispatch => {
        dispatch({
            type: ActionTypes.DFC_SAY_HELLO,
            loading: true
        })
        let url = `/${variable.end_point}/sellers/certification`
        let req = request.post(url)
        req.type('form')
        req.send({code:code})
        req.timeout(10000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                cb(err,null)
            } else {
                dispatch({
                    type: ActionTypes.DFC_SAY_HELLO,
                    seller: res.body,
                    loading: false
                })
                cb(null,res.body)
            }
        })
    })
}
