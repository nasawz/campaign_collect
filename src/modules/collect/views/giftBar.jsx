import React, { PropTypes } from 'react'

import '../style/giftBar.less'

const GiftBar = React.createClass({
    render () {
        return (
            <div className='giftBar'>
                <img className='gifts_t' src={require('../../../img/gifts_t.png')} />
                <img className='gifts_1' src={require('../../../img/gifts_1.png')} />
                <img className='gifts_2' src={require('../../../img/gifts_2.png')} />
                <img className='gifts_3' src={require('../../../img/gifts_3.png')} />
                <img className='gifts_photo' src={require('../../../img/gifts_photo.png')} />
            </div>
        )
    }
})

export default GiftBar
