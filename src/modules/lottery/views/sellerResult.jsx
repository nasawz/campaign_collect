import React, {PropTypes} from 'react'
import HeadLogo from '../../common/head-logo.jsx'

const SellerResult = React.createClass({
    componentWillMount() {
        let link = `${window.location.origin}${window.location.pathname}#/collect/home`
        global.setWxLink(link)
    },
    render() {
        let minHeight = window.innerHeight
        return (
            <div className='resultView' style={{
                minHeight: `${minHeight}px`,
                background: `url('${require('../../../img/lottery_bg.jpg')}')`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }}>
                <HeadLogo/>
                <div className='container'>
                    <img src={require('../../../img/result_dfc_fail.png')}/>
                </div>
            </div>
        )
    }
})

export default SellerResult
