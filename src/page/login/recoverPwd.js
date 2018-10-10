/**
 * 校园空兼 - RecoverPwd
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
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'

import {observer, inject} from 'mobx-react'
import {Button} from 'teaset'

import NavigationBar from '../../component/navigation/NavigationBar'
import Container from '../../component/common/Container'
import SendSMS from '../../component/common/SendSMS'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import {checkMobile} from "../../util/Tool";

@inject('loginStore')
@observer
export default class RecoverPwd extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mobile: '', // '15066886007',
            code: '', // '123123',
            password: '', // '123123',
            re_password: '', // '123123',
        };
    }

    componentWillUnmount() {
        const timers = [this.timer];
        ClearTimer(timers)
    }

    onSubmitFoo = async () => {
        const {loginStore} = this.props;
        const {mobile, code, password, re_password} = this.state;
        if (!checkMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        }
        if (code === '') {
            ToastManager.show('请输入手机验证码');
            return;
        }
        if (password === '') {
            ToastManager.show('请输入新密码');
            return;
        }
        if (re_password === '') {
            ToastManager.show('请再次输入密码');
            return;
        }
        let url = ServicesApi.retrievePassword;
        let data = {mobile, code, password, re_password};
        const result = await loginStore.recoverPassword(url, data);
        // console.log('result---->>', result);
        ToastManager.show(result.msg);
        if (result.code === 1) {
            this.timer = setTimeout(() => {
                RouterHelper.reset('', 'Tab');
            }, 1000);
        }
    };


    render() {
        let {mobile} = this.state;
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={CusTheme.containerBackgroundImage}/>
                <NavigationBar
                    title={'忘记密码'}
                    style={styles.navigationBarStyle}
                    backgroundImage={null}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <KeyboardAvoidingView style={styles.loginContent}>
                    <ScrollView style={styles.loginContent}>
                        <View style={styles.inputItemView}>
                            <Image source={Images.icon_user_sign} style={styles.inputIcon}/>
                            <TextInput
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入手机号'}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                maxLength={11}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({mobile: text})}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={styles.inputItemView}>
                            <Image source={Images.icon_mobile_cur} style={styles.inputIcon}/>
                            <TextInput
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入验证码'}
                                maxLength={6}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({code: text})}
                            />
                            <SendSMS
                                mobile={mobile}
                                type={'public'}
                                style={styles.getCodeView}
                                lineStyle={styles.verLine}
                                titleStyle={styles.getCodeCon}
                                {...this.props}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={styles.inputItemView}>
                            <Image source={Images.icon_lock} style={styles.inputIcon}/>
                            <TextInput
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入密码'}
                                secureTextEntry={true}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={styles.inputItemView}>
                            <Image source={Images.icon_lock} style={styles.inputIcon}/>
                            <TextInput
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请再次确认您的密码'}
                                secureTextEntry={true}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => this.setState({re_password: text})}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <Button
                            onPress={this.onSubmitFoo}
                            style={[styles.btnItem, styles.registerBtnItem]}
                            titleStyle={[styles.btnItemTitle, styles.registerBtnItemTitle]}
                            title={'立即找回'}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
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
