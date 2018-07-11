/**
 * 校园空兼 - 
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import {createStackNavigator} from 'react-navigation'
import {configRoute} from './addToRouteStack'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import SplashScreen from 'react-native-splash-screen'

import TabNavigation from './TabNavigation'

import CommonWebPage from '../page/common/commonWebPage'

import Login from '../page/login/login'
import Register from '../page/login/register'
import RecoverPwd from '../page/login/recoverPwd'

import MineAccount from '../page/mine/mineAccount'
import MineIntegritySystem from '../page/mine/mineIntegritySystem'
import MinePoints from '../page/mine/minePoints'
import MineProfile from '../page/mine/mineProfile'
import MineWorkSpace from '../page/mine/mineWorkSpace'
import MineSettingPassWord from '../page/mine/mineSettingPassWord'

import MineCredits from '../page/account/mineCredits'
import MineWorkPoints from '../page/account/mineWorkPoints'
import MinePartTimeIncome from '../page/account/minePartTimeIncome'
import MineOrder from '../page/order/mineOrder'
import OrderDetail from '../page/order/orderDetail'

import CertificationIDCard from '../page/certification/certificationIDCard'
import CertificationMobile from '../page/certification/certificationMobile'
import CertificationStudent from '../page/certification/certificationStudent'
import EmergencyContact from '../page/certification/emergencyContact'

import Setting from '../page/system/setting'
import ShareApp from '../page/system/shareApp'
import SystemMessage from '../page/system/systemMessage'


import VideoPage from '../page/common/videoPage';
import Chat from '../page/common/chat';

const Nav = createStackNavigator(configRoute({
    Tab: {screen: TabNavigation},
    CommonWebPage: {screen: CommonWebPage},
    Login: {screen: Login},
    Register: {screen: Register},
    RecoverPwd: {screen: RecoverPwd},
    MineAccount: {screen: MineAccount},
    MineIntegritySystem: {screen: MineIntegritySystem},
    MinePoints: {screen: MinePoints},
    MineProfile: {screen: MineProfile},
    MineWorkSpace: {screen: MineWorkSpace},
    MineSettingPassWord: {screen: MineSettingPassWord},
    MineCredits: {screen: MineCredits},
    MineWorkPoints: {screen: MineWorkPoints},
    MinePartTimeIncome: {screen: MinePartTimeIncome},
    MineOrder: {screen: MineOrder},
    OrderDetail: {screen: OrderDetail},
    Setting: {screen: Setting},
    ShareApp: {screen: ShareApp},
    SystemMessage: {screen: SystemMessage},
    CertificationIDCard: {screen: CertificationIDCard},
    CertificationMobile: {screen: CertificationMobile},
    CertificationStudent: {screen: CertificationStudent},
    EmergencyContact: {screen: EmergencyContact},
    VideoPage: {screen: VideoPage},
    Chat: {screen: Chat},
}), {
    // initialRouteName: 'SystemMessage',
    initialRouteName: 'Tab',
    cardStyle: {
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor: Theme.pageBackgroundColor,
    },
    navigationOptions: {
        header: null,
        gesturesEnabled: true
    },
    transitionConfig: () => {
        return {
            screenInterpolator: (sceneProps) => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps)
            },
            // containerStyle: {
            //     backgroundColor: 'black',
            // }
        }
    }
});


class Navigation extends React.PureComponent {

    componentDidMount() {
        this.timer = setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Nav/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});


export default Navigation;