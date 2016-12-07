/**
 * create by nasa.wang
 */

import React from 'react'
import Tree3D from './tree3D.jsx'
import Result from './result.jsx'

const Tree = React.createClass({
    getQuery(q) {
        var m = window.location.href.match(new RegExp('(\\?|#|&)' + q + '=([^&|^#]*)(#|&|$)'))
        return !m
            ? null
            : decodeURIComponent(m[2])
    },
    componentWillMount() {
        this.cid = this.getQuery('cid')
        if (!this.props.collect) {
            this.props.actions.getCollect(this.cid,null)
        }
    },
    render() {
        if (!this.props.collect) {
            return <div />
        }else{
            if(this.props.collect.status == '3' && this.props.user.userId == this.props.collect.ownerId){
                return <Result {...this.props} />
            }else{
                return <Tree3D {...this.props} />
            }

        }
    }
})

export default Tree
