/**
 * 校园空兼 - Login
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native'

import { Button } from 'teaset';
import NavigationBar from '../../component/common/NavigationBar'
import Container from '../../component/common/Container';
import SegmentedView from '../../component/segmentedView'
import LRComponent from './LRComponent'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'

export default class Login extends PureComponent {

    _guestLogin = () => {
        // RouteHelper.reset('Tab');
        RouteHelper.navigate('Tab');
    };

    _onNavigateRecoverPwd = () => {
        RouteHelper.navigate('RecoverPwd');
    };

    _onNavigateRegister = () => {
        RouteHelper.navigate('Register');
    };

    _doLogin = () => {
        RouteHelper.navigate('Tab');
    };

    render() {
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={Theme.containerBackgroundImage} />
                <NavigationBar
                    title={'登录'}
                    style={styles.navigationBarStyle}
                    leftView={null}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <View style={styles.loginContent}>
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_user_sign} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入手机号'}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangeLogin}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.verLine} />
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_lock} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入密码'}
                            secureTextEntry={true}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangeLogin}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.verLine} />
                    <Button
                        onPress={this._doLogin}
                        style={[styles.btnItem, styles.signBtnItem]}
                        titleStyle={[styles.btnItemTitle, styles.signBtnItemTitle]}
                        title={'登录'}
                    />
                    <Button
                        onPress={this._onNavigateRegister}
                        style={[styles.btnItem, styles.registerBtnItem]}
                        titleStyle={[styles.btnItemTitle, styles.registerBtnItemTitle]}
                        title={'注册'}
                    />
                    <View style={styles.otherBtnView}>
                        <Text
                            style={styles.otherBtnItem}
                            onPress={this._guestLogin}
                        >游客登录</Text>
                        <Text
                            style={styles.otherBtnItem}
                            onPress={this._onNavigateRecoverPwd}
                        >忘记密码？</Text>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navigationBarStyle: {
        backgroundColor: 'transparent',
    },
    verLine: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loginContent: {
        padding: 20,
        marginTop: ScaleSize(80),
    },
    inputItemView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputIcon: {
        tintColor: '#fff',
        width: ScaleSize(35),
        height: ScaleSize(35),
        resizeMode: 'contain',
    },
    inputItem: {
        flex: 1,
        height: 50,
        color: '#fff',
        marginLeft: 10,
    },
    btnItem: {
        height: 50,
        borderRadius: 25,
        borderColor: '#fff',
    },
    signBtnItem: {
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    registerBtnItem: {},
    btnItemTitle: {
        color: Theme.themeColor,
        fontSize: FontSize(14),
    },
    signBtnItemTitle: {
        color: '#fff',
    },
    registerBtnItemTitle: {
    },
    otherBtnView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    otherBtnItem: {
        color: '#fff',
        fontSize: FontSize(11),
    },
});
