import React, { PropTypes } from 'react'
import '../style/progressBar.less'

const ProgressBar = React.createClass({
    getDefaultProps: function() {
        return {
            step:1
        };
    },
    render () {
        if (this.props.step==0) {
            return <div />
        }
        let tp1=require('../../../img/progress_bar_1.png')
        let tp2=require('../../../img/progress_bar_2.png')
        let tp3=require('../../../img/progress_bar_3.png')
        let tp4=require('../../../img/progress_bar_4.png')
        let tp5=require('../../../img/progress_bar_5.png')

        let tp = eval('tp'+this.props.step)
        return (
            <img className='progressBar' src={tp} />
        )
    }
})

export default ProgressBar
