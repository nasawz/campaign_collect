import React, { PropTypes } from 'react'
import '../style/progressBar.less'

const ProgressBar = React.createClass({
    render () {
        let tp1=require('../../../img/progress_bar_1.png')
        return (
            <img className='progressBar' src={tp1} />
        )
    }
})

export default ProgressBar
