/**
 * 校园空兼 - Index
 * https://menger.me
 * @大梦
 */

'use strict';
import React from 'react'
import { View, StyleSheet, NetInfo } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


// import AAA from "./page/work/work"
// import AAA from "./page/home/home"
// import AAA from "./page/mine/mine"
import AAA from "./page/shop/shop"

// import AAA from './page/common/commonWebPage'

// import AAA from './page/login/login'
// import AAA from './page/login/register'
// import AAA from './page/login/recoverPwd'

// import AAA from './page/work/autoGetWork'
// import AAA from './page/work/workSignUpStepOne'
// import AAA from './page/work/workSignUpStepTwo'
// import AAA from './page/work/workSignUpStepThree'
// import AAA from './page/work/workSignUpStepFour'

// import AAA from './page/mine/mineAccount'
// import AAA from './page/mine/mineIntegritySystem'
// import AAA from './page/mine/minePoints'
// import AAA from './page/mine/mineProfile'
// import AAA from './page/mine/mineWorkSpace'
// import AAA from './page/mine/mineSettingPassWord'

// import AAA from './page/account/mineCredits'
// import AAA from './page/account/mineWorkPoints'
// import AAA from './page/account/minePartTimeIncome'
// import AAA from './page/account/mineRepayment'
// import AAA from './page/account/mineWithDraw'

// import AAA from './page/order/mineOrder'
// import AAA from './page/order/orderDetail'

// import AAA from './page/certification/certificationIDCard'
// import AAA from './page/certification/certificationMobile'
// import AAA from './page/certification/certificationStudent'
// import AAA from './page/certification/emergencyContact'

// import AAA from "./page/work/mineWorkDetail"
// import AAA from "./page/work/workAbnormalAppeal"

// import AAA from './page/system/setting'
// import AAA from './page/system/shareApp'
// import AAA from './page/system/systemMessage'


// import AAA from './page/common/videoPage'
// import AAA from './page/common/chat'
// import AAA from "./page/work/workPunchCard"
// import AAA from "./page/common/search"
// import AAA from "./page/shop/goodsList"
// import AAA from "./page/shop/goodsDetail"
// import AAA from "./page/work/workDetail"

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    componentWillUnmount() {
        
    };

    render() {
        return (
            <View style={styles.container} >
                <AAA />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f60',
    }
});