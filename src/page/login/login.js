/**
 * 校园空兼 - Login
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native'

import {observer, inject} from 'mobx-react'
import {Button} from 'teaset'

import NavigationBar from '../../component/common/NavigationBar'
import Container from '../../component/common/Container'

import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import {checkMobile} from "../../util/Tool";

@inject('loginStore')
@observer
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.inputData = {
            mobile: '15066886007',
            password: '123123',
        }
    }

    _onChangeUserName = (text) => {
        this.inputData['mobile'] = text;
    };
    _onChangePassword = (text) => {
        this.inputData['password'] = text;
    };

    _doLogin = async () => {
        const {loginStore} = this.props;
        const mobile = this.inputData['mobile'];
        const password = this.inputData['password'];
        if (!checkMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        } else if (password === '') {
            ToastManager.show('您输入的密码错误，请检查后重新输入！');
            return;
        }
        let url = ServicesApi.login;
        let data = {mobile, password};
        const result = await loginStore.doLogin(url, data);
        // console.log('result---->>', result);
        if (result.code === 1) {
            RouterHelper.reset('', 'Tab');
        } else {
            ToastManager.show(result.msg);
        }
    };

    _guestLogin = () => {
        // RouterHelper.reset('', 'Tab');
        RouterHelper.navigate('Tab');
    };

    _onNavigateRecoverPwd = () => {
        RouterHelper.navigate('RecoverPwd');
    };

    _onNavigateRegister = () => {
        RouterHelper.navigate('Register');
    };

    render() {
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={CusTheme.containerBackgroundImage}/>
                <NavigationBar
                    title={'登录'}
                    leftView={null}
                    backgroundImage={null}
                    style={styles.navigationBarStyle}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <View style={styles.loginContent}>
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_user_sign} style={styles.inputIcon}/>
                        <TextInput
                            maxLength={11}
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入手机号'}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangeUserName}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.verLine}/>
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_lock} style={styles.inputIcon}/>
                        <TextInput
                            // maxLength={12}
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            // keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入密码'}
                            secureTextEntry={true}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangePassword}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.verLine}/>
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
        color: CusTheme.themeColor,
        fontSize: FontSize(14),
    },
    signBtnItemTitle: {
        color: '#fff',
    },
    registerBtnItemTitle: {},
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
