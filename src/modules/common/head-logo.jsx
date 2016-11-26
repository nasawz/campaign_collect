import React, { PropTypes } from 'react'

const HeadLogo = React.createClass({
    render () {
        return (
            <div className='head-logo'>
                <img src={require('../../img/logo_toyota.png')} />
                <img src={require('../../img/logo_lexus.png')} />
            </div>
        )
    }
})

export default HeadLogo
