/**
 * 校园空兼 - BindMobile
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
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView, Keyboard,
} from 'react-native'
import {observer, inject} from 'mobx-react'
import {Button} from 'teaset';
import NavigationBar from '../../component/navigation/NavigationBar'
import Container from '../../component/common/Container'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import SendSMS from "../../component/common/SendSMS";
import {checkMobile} from "../../util/Tool";

@inject('loginStore')
@observer
export default class BindMobile extends Component {

    constructor(props) {
        super(props);
        let {loginStore} = this.props;
        this.state = {
            agree: 0,
            mobile: '', // '15066886007',
            code: '', // '123123',
            openid: loginStore.openid,
            unionid: loginStore.unionid,
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        const timers = [this.timer];
        ClearTimer(timers)
    }

    loadNetData = async () => {
        let url = ServicesApi.protocol;
        try {
            let result = await Services.get(url, true);
            if (result.code === 1) {
                this.setState({
                    link: result.data,
                });
            }
        } catch (e) {
            ToastManager.show('error');
        }
    }

    _onNavigateBack = () => {
        RouterHelper.goBack();
    };

    _doRegister = async () => {
        const {loginStore} = this.props;
        let {agree, mobile, password, re_password, code, openid, unionid} = this.state;
        if (!checkMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        }
        if (code === '') {
            ToastManager.show('请输入验证码！');
            return;
        }
        let url = ServicesApi.bindMobile;
        let data = {mobile, code, openid, unionid};
        const result = await loginStore.doLogin(url, data);
        // console.log('result---->>', result);
        ToastManager.show(result.msg);
        if (result.code === 1) {
            this.timer = setTimeout(() => {
                RouterHelper.reset('', 'Tab');
            }, 1000);
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
        let {agree, link, mobile, password, re_password, code} = this.state;
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={CusTheme.containerBackgroundImage}/>
                <NavigationBar
                    title={'绑定手机号'}
                    style={styles.navigationBarStyle}
                    backgroundImage={null}
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
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入手机号'}
                                maxLength={11}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                clearButtonMode='while-editing'
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
                                placeholder={'请输入验证码'}
                                maxLength={6}
                                placeholderTextColor={'#fff'}
                                returnKeyType={'done'}
                                clearButtonMode='while-editing'
                                onChangeText={(text) => {
                                    this.setState({
                                        code: text
                                    })
                                }}
                            />
                            <SendSMS
                                type={'bind_mobile'}
                                mobile={mobile}
                                dismiss={() => Keyboard.dismiss()}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <Button
                            onPress={this._doRegister}
                            style={[styles.btnItem, styles.registerBtnItem]}
                            titleStyle={[styles.btnItemTitle, styles.registerBtnItemTitle]}
                            title={'立即绑定'}
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
        borderBottomWidth: CusTheme.minPixel,
        borderBottomColor: '#fff',
        backgroundColor: 'transparent',
    },
    horLine: {
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
