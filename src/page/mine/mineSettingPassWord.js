/**
 * 校园空兼 - MineSettingPassWord
 * http://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Linking,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
import {ListRow, Button} from 'teaset'
import {HorizontalLine} from "../../component/common/commonLine";
import SendSMS from "../../component/common/SendSMS";
import InputRightButton from "../../component/common/InputRightButton";
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'mineStore')
@observer
export default class MineSettingPassWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputType: 'password',
            secureTextEntry: true,
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
        // if (!CheckMobile(mobile)) {
        //     ToastManager.show('您输入的手机号错误，请检查后重新输入！');
        //     return;
        // }
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
        if (re_password !== password) {
            ToastManager.show('两次输入密码不一致，请重新输入');
            return;
        }
        let url = ServicesApi.retrievePassword;
        let data = {mobile, code, password, re_password};
        const result = await loginStore.recoverPassword(url, data);
        // console.log('result---->>', result);
        ToastManager.show(result.msg);
        if (result.code === 1) {
            this.timer = setTimeout(() => {
                loginStore.cleanUserInfo();
                RouterHelper.reset('', 'Login');
            }, 1000);
        }
    };


    render() {
        let {loginStore} = this.props;
        let {userInfo} = loginStore;
        let {mobile, password, inputType, secureTextEntry} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '修改密码';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.content}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={styles.loginContent}>
                            <View style={styles.inputItemView}>
                                <Image source={Images.icon_user_sign} style={styles.inputIcon}/>
                                <TextInput
                                    defaultValue={userInfo.mobile}
                                    style={styles.inputItem}
                                    ref={v => this.input = v}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入手机号'}
                                    placeholderTextColor={'#999'}
                                    returnKeyType={'done'}
                                    maxLength={11}
                                    editable={false}
                                    onChangeText={(text) => {
                                        this.setState({
                                            mobile: text
                                        })
                                    }}
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
                                    placeholder={'请输入6位验证码'}
                                    placeholderTextColor={'#999'}
                                    returnKeyType={'done'}
                                    maxLength={6}
                                    clearButtonMode='while-editing'
                                    onChangeText={(text) => {
                                        this.setState({
                                            code: text
                                        })
                                    }}
                                />
                                <SendSMS
                                    mobile={userInfo.mobile}
                                    type={'public'}
                                    style={styles.getCodeView}
                                    lineStyle={styles.getCodeLine}
                                    titleStyle={styles.getCodeTitle}
                                    dismiss={() => Keyboard.dismiss()}
                                    {...this.props}
                                />
                            </View>
                            <HorizontalLine lineStyle={styles.horLine}/>
                            <View style={styles.inputItemView}>
                                <Image source={Images.icon_lock} style={styles.inputIcon}/>
                                <TextInput
                                    style={styles.inputItem}
                                    ref={v => this.input = v}
                                    secureTextEntry={secureTextEntry}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入密码'}
                                    placeholderTextColor={'#999'}
                                    returnKeyType={'done'}
                                    maxLength={12}
                                    onChangeText={(text) => {
                                        this.setState({
                                            password: text
                                        })
                                    }}
                                />
                                {password ?
                                    <InputRightButton
                                        type={inputType}
                                        submitFoo={() => {
                                            inputType = secureTextEntry ? 'text' : 'password';
                                            this.setState({
                                                inputType: inputType,
                                                secureTextEntry: !secureTextEntry,
                                            });
                                        }}
                                    />
                                    : null
                                }
                            </View>
                            <HorizontalLine lineStyle={styles.horLine}/>
                            <View style={styles.inputItemView}>
                                <Image source={Images.icon_lock} style={styles.inputIcon}/>
                                <TextInput
                                    style={styles.inputItem}
                                    ref={v => this.input = v}
                                    secureTextEntry={secureTextEntry}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请再次输入密码'}
                                    placeholderTextColor={'#999'}
                                    returnKeyType={'done'}
                                    maxLength={12}
                                    onChangeText={(text) => {
                                        this.setState({
                                            re_password: text
                                        })
                                    }}
                                />
                                {password ?
                                    <InputRightButton
                                        type={inputType}
                                        submitFoo={() => {
                                            inputType = secureTextEntry ? 'text' : 'password';
                                            this.setState({
                                                inputType: inputType,
                                                secureTextEntry: !secureTextEntry,
                                            });
                                        }}
                                    />
                                    : null
                                }
                            </View>

                        </View>
                        <Button
                            title={'立即修改'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={this.onSubmitFoo}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    loginContent: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    inputItemView: {
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: '#123',
    },
    inputItem: {
        flex: 1,
        height: 50,
        color: '#555',
        marginLeft: 10,
    },
    inputIcon: {
        tintColor: '#888',
        width: ScaleSize(35),
        height: ScaleSize(35),
        resizeMode: 'contain',
        // backgroundColor: '#f60',
    },
    getCodeView: {},
    getCodeTitle: {
        color: '#555',
    },
    getCodeLine: {
        height: 15,
        backgroundColor: '#555',
    },
    btnView: {
        margin: 30,
    },
    btnName: {},
});