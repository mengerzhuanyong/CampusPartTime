/**
 * 校园空兼 - Index
 * https://menger.me
 * @大梦
 */

'use strict';
import React from 'react'
import { View, StyleSheet, NetInfo, PermissionsAndroid, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import DeviceInfo from 'react-native-device-info'
import JPushModule from 'jpush-react-native'
import JShareModule from 'jshare-react-native'
import XPay from 'react-native-puti-pay'
import {Geolocation} from 'react-native-baidu-map'
import Navigation from './router/Navigation'
import { getDeviceInfo } from './util/Tool'
import { observer, inject } from 'mobx-react'

@inject('appStore', 'loginStore')
@observer
export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._initSetting(); // 初始化设置，先调用
        this._handleLoginState(); // 处理登陆状态
        this._addNetworkListener(); // 网络状态
        this._receiveDeviceInfo(); // 设备信息
        this._handlePushListener(); // 通知
    }

    componentWillUnmount() {
        this._removeNetworkListener();
        this._removePushListener();
        this._clearTimer();
    };

    _initSetting = () => {
        if (__IOS__) {
            // 启动极光分享 ios需要
            JShareModule.setup();
        } else {
            // 仅仅在安卓调用
            JPushModule.initPush();
            JPushModule.notifyJSDidLoad(resultCode => {
                if (resultCode === 0) {
                }
            });
        }
        // debug模式
        JShareModule.setDebug({ enable: __DEV__ });
        //设置微信ID
        XPay.setWxId(Constant.WECHAT_APPID);
        //设置支付宝URL Schemes
        XPay.setAlipayScheme(Constant.ALIPAY_SCHME);
    };

    _handleLoginState = async () => {
        const {loginStore} = this.props;
        const {token} = loginStore.userInfo;
        const localRes = await StorageManager.load(Constant.USER_INFO_KEY);
        if (localRes.code === 1) {
            if (localRes.data.token === undefined || localRes.data.token === '') {
                // 未登录
                this.timer1 = setTimeout(() => {
                    RouterHelper.reset('', 'Login');
                    // SplashScreen.hide();
                }, 600);
            } else {
                // 已经登录
                // console.log(localRes);
                loginStore.saveUserInfo(localRes.data);
                this.timer2 = setTimeout(() => {
                    RouterHelper.reset('', 'Tab');
                    // RouterHelper.reset('', 'MineWorkDetail');
                    // SplashScreen.hide();
                }, 600);
            }
        } else {
            // 第一次安装app
            this.timer3 = setTimeout(() => {
            //     RouterHelper.reset('', 'Login');
                // SplashScreen.hide();
            }, 600);
        }
    };

    _addNetworkListener = () => {
        const { appStore } = this.props;
        NetInfo.addEventListener('connectionChange', ({ type, effectiveType }) => {
            // console.log('connectionInfo-->', type, effectiveType);
            appStore.changeNetworkState(type);
        });
    };

    _removeNetworkListener = () => {
        NetInfo.removeEventListener('connectionChange', () => { });
    };

    _receiveDeviceInfo = async () => {
        const {appStore} = this.props;
        const info = getDeviceInfo();
        // const ip = await DeviceInfo.getIPAddress() ios上不可用，有可能是私有方法
        const batteryLevel = await DeviceInfo.getBatteryLevel(); // 电池的电量，模拟器返回-1
        appStore.setDeviceInfo({...info, batteryLevel});
        // console.log(info, batteryLevel);
    };

    _handlePushListener = () => {
        JPushModule.addReceiveCustomMsgListener(map => {
            // 自定义消息
            // console.log('extras: ' + map.extras);
        });

        JPushModule.addReceiveNotificationListener(map => {
            // 接收推送事件     并且点击推送（ios9及以下）需要判断系统版本
            // console.log('alertContent: ', map.alertContent);
            // console.log('extras: ', map.extras);
        });

        JPushModule.addReceiveOpenNotificationListener(map => {
            // 点击推送事件，iOS10及以上
            // console.log('Opening notification!');
            // console.log('map.extra: ' + map.extras);
        });

        JPushModule.addGetRegistrationIdListener(registrationId => {
            // 设备注册成功
            // console.log('Device register succeed, registrationId ' + registrationId);
        });
    };

    _removePushListener = () => {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener();
        JPushModule.removeGetRegistrationIdListener();
        JPushModule.clearAllNotifications();
    };

    _clearTimer = () => {
        let timers = [this.timer1, this.timer2, this.timer3];
        ClearTimer(timers);
    };

    render() {
        return (
            <View style={styles.container} >
                <Navigation />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});