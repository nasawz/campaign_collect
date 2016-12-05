import React, {PropTypes} from 'react'
import HeadLogo from '../../common/head-logo.jsx'
import merge from 'lodash/merge'

const SellerResult = React.createClass({
    render() {
        let {collect} = this.props
        let minHeight = window.innerHeight
        let bg = require('../../../img/lottery_bg.jpg')
        if (collect.prize.code.toString() == '1') {
            bg = require('../../../img/lottery_1.jpg')
        }
        if (collect.prize.code.toString() == '2') {
            bg = require('../../../img/lottery_2.jpg')
        }
        if (collect.prize.code.toString() == '3') {
            bg = require('../../../img/lottery_3.jpg')
        }
        if (collect.prize.code.toString() == 't_1') {
            bg = require('../../../img/lottery_t.jpg')
        }
        let _style = {
            minHeight: `${minHeight}px`,
            background: `url('${bg}')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        }
        return (
            <div className='resultView' style={_style}>
                <HeadLogo/>
                <div className='container'>
                    {collect.prize.code == 'end'
                        ? (<img src={require('../../../img/result_user_0.png')}/>)
                        : ''}
                </div>
            </div>
        )
    }
})

export default SellerResult
