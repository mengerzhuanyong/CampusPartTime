/**
 * 校园空兼 - Register
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
    TouchableOpacity,
} from 'react-native'
import {observer, inject} from 'mobx-react'
import { Button } from 'teaset';
import NavigationBar from '../../component/common/NavigationBar'
import Container from '../../component/common/Container'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import SendSMS from "../../component/common/SendSMS";
import {checkMobile} from "../../util/Tool";

@inject('loginStore')
@observer
export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agree: 0,
        };
        this.inputData = {
            mobile: '15066886007',
            password: '123123',
            re_password: '123123',
            code: '123123',
        }
    }

    _onNavigateBack = () => {
        RouterHelper.goBack();
    };

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    _doRegister = async () => {
        const {loginStore} = this.props;
        let {agree} = this.state;
        let {mobile, password, re_password, code} = this.inputData;
        if (!checkMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        }
        if (password === '') {
            ToastManager.show('您输入的密码错误，请检查后重新输入！');
            return;
        }
        if (re_password === '') {
            ToastManager.show('您输入的密码错误，请检查后重新输入！');
            return;
        }
        if (re_password !== password) {
            ToastManager.show('两次输入的密码不一致，请检查后重新输入！');
            return;
        }
        if (code === '') {
            ToastManager.show('请输入验证码！');
            return;
        }
        if (agree === 0) {
            ToastManager.show('请先阅读并同意用户协议');
            return;
        }
        let url = ServicesApi.register;
        let data = {mobile, password, re_password, code, agree};
        const result = await loginStore.doLogin(url, data);
        // console.log('result---->>', result);
        if (result.code === 1) {
            RouterHelper.reset('Tab');
        } else {
            ToastManager.show(result.msg);
        }
    };

    pushAgreeProtocol = () => {
        let {agree} = this.state;
        agree = agree === 1 ? 0 : 1;
        this.setState({
            agree
        });
    };

    render() {
        let {agree} = this.state;
        let {mobile, password, re_password, code} = this.inputData;
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={CusTheme.containerBackgroundImage} />
                <NavigationBar
                    title={'注册'}
                    style={styles.navigationBarStyle}
                    backgroundImage={null}
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
                            onChangeText={(text) => this.inputData['mobile'] = text}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine} />
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_mobile_cur} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入验证码'}
                            secureTextEntry={true}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={(text) => this.inputData['code'] = text}
                        />
                        <SendSMS
                            type={'register'}
                            mobile={this.inputData['mobile']}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine} />
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
                            onChangeText={(text) => this.inputData['password'] = text}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine} />
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_lock} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            keyboardType={'numeric'}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请再次确认您的密码'}
                            secureTextEntry={true}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={(text) => this.inputData['re_password'] = text}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine} />
                        <TouchableOpacity
                            style={styles.protocolView}
                            onPress={this.pushAgreeProtocol}
                        >
                            <Image source={agree === 1 ? Images.icon_checked : Images.icon_check} style={styles.iconCheck} />
                            <Text style={styles.protocolTitle}>我以阅读并同意</Text>
                            <TouchableOpacity
                                style={styles.protocolIconView}
                                onPress={() => this.onPushToNextPage('用户协议', 'CommonWebPage')}
                            >
                                <Text style={styles.protocolCon}>《校园空兼用户协议》</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    <Button
                        onPress={this._doRegister}
                        style={[styles.btnItem, styles.registerBtnItem]}
                        titleStyle={[styles.btnItemTitle, styles.registerBtnItemTitle]}
                        title={'立即注册'}
                    />
                    <Button
                        onPress={this._onNavigateBack}
                        style={[styles.btnItem, styles.signBtnItem]}
                        titleStyle={[styles.btnItemTitle, styles.signBtnItemTitle]}
                        title={'已有账号，立即登录 >>'}
                    />
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
        borderBottomWidth: CusTheme.minPixel,
        borderBottomColor: '#fff',
        backgroundColor: 'transparent',
    },
    horLine: {
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
        borderWidth: CusTheme.minPixel,
        borderColor: '#fff',
    },
    signBtnItem: {
        // height: 30,
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    registerBtnItem: {
        marginTop: 30,
    },
    btnItemTitle: {
        color: CusTheme.themeColor,
        fontSize: FontSize(14),
    },
    signBtnItemTitle: {
        color: '#fff',
        fontSize: FontSize(12),
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
    protocolView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    protocolIconView: {
        marginRight: 15,
    },
    iconCheck: {
        marginRight: 10,
        tintColor: '#ff0',
        width: ScaleSize(30),
        height: ScaleSize(30),
    },
    protocolTitle: {
        color: '#fff',
        fontSize: FontSize(12),
    },
    protocolCon: {
        color: '#ff0',
        fontSize: FontSize(12),
    },
});
