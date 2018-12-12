/**
 * 校园空兼 - Login
 * http://menger.me
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
    KeyboardAvoidingView, ScrollView
} from 'react-native'

import {observer, inject} from 'mobx-react'
import {Button} from 'teaset'

import NavigationBar from '../../component/navigation/NavigationBar'
import Container from '../../component/common/Container'

import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import {checkMobile} from "../../util/Tool";
import ExtendsLogin from "../../component/login/extendsLogin";
import JShareModule from "jshare-react-native";

@inject('loginStore')
@observer
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.inputData = {
            mobile: '', // '15066886007',
            password: '', // '123123',
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
        RouterHelper.navigate('', 'Tab');
    };

    _onNavigateRecoverPwd = () => {
        RouterHelper.navigate('', 'RecoverPwd');
    };

    _onNavigateRegister = () => {
        RouterHelper.navigate('', 'Register');
    };

    checkWeChatInstalled = () => {
        let url = ServicesApi.loginWeChat;
        let param = {
            platform: "wechat_session"
        };
        this.extendsLogin(param, url);
        // JShareModule.isClientValid(param, (isInstalled) => {
        //     if (isInstalled) {
        //     } else {
        //         ToastManager.show('您当前没有安装微信，请您安装微信之后再试');
        //     }
        // });
    };

    checkQQInstalled = () => {
        let url = ServicesApi.loginQQ;
        let param = {
            platform: "qq"
        };
        JShareModule.isQQInstalled((isInstalled) => {
            if (isInstalled) {
                this.extendsLogin(param, url);
            } else {
                ToastManager.show('您当前没有安装QQ，请您安装微信之后再试');
            }
        });
    };

    extendsLogin = async (param, url) => {
        // console.log(param, url);
        // this.onPushToBindPhone();
        const {loginStore} = this.props;
        JShareModule.getSocialUserInfo(param, async (map) => {
            try {
                const result = await loginStore.doExtendsLogin(url, map);
                if (result.code === 1) {
                    if (result.data.mobile === '') {
                        this.onPushToBindPhone(result.data);
                    } else {
                        RouterHelper.reset('', 'Tab');
                    }
                } else {
                    ToastManager.show(result.msg);
                }
            } catch (e) {
                ToastManager.show('error');
            }
            // console.log(param, url, map);
            // Services.post(url, map)
            //     .then(result => {
            //         // // consoleLog('微信登录', result);
            //         // return;
            //         if (result.data.mobile !== '') {
            //             // this.saveToLocalStorage(result.data);
            //             // this.onPushToTabNavScreen();
            //         } else {
            //             // this.onPushToNextPage('绑定手机号', 'BindPhone', {user: result.data});
            //         }
            //     })
            //     .catch(error => {
            //         // ToastManager.show('error',)
            //     })
        }, (errorCode) => {
            // console.log(errorCode);
            this.cleanAuthWithPlatform(param);
        });
    };

    onPushToBindPhone = (user) => {
        this.timer2 = setTimeout(() => {
            RouterHelper.navigate('绑定手机号', 'BindMobile', {user});
            // RouterHelper.reset('绑定手机号', 'BindMobile', {user});
        }, 200);
    };

    cleanAuthWithPlatform = (param) => {
        JShareModule.cancelAuthWithPlatform(param, (code) => {
            // console.log(code);
        }, (errorCode) => {
            // console.log(errorCode);
        });
    };

    render() {
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={CusTheme.containerBackgroundImage}/>
                <NavigationBar
                    title={'登录'}
                    renderLeftAction={null}
                    backgroundImage={null}
                    style={styles.navigationBarStyle}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.loginContent}
                        keyboardShouldPersistTaps={'handled'}
                    >
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
                            {/*<Text
                            style={styles.otherBtnItem}
                            onPress={this._guestLogin}
                        >游客登录</Text>*/}
                            <Text
                                style={styles.otherBtnItem}
                                onPress={this._onNavigateRecoverPwd}
                            >忘记密码？</Text>
                        </View>
                        <ExtendsLogin
                            style={styles.extendsLoginView}
                            weChatLogin = {() => this.checkWeChatInstalled()}
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
    content: {
        flex: 1,
    },
    navigationBarStyle: {
        backgroundColor: 'transparent',
    },
    verLine: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loginContent: {
        flex: 1,
        padding: 20,
        paddingTop: ScaleSize(140),
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
        justifyContent: 'flex-end',
        // justifyContent: 'space-between',
    },
    otherBtnItem: {
        color: '#fff',
        // width: FontSize(11),
        fontSize: FontSize(11),
    },
    extendsLoginView: {
        marginBottom: 60,
    },
});
