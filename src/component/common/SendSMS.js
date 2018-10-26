/**
 * 校园空兼 - SendSMS
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {PureComponent} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, Keyboard,
} from 'react-native'

import {VerticalLine} from './commonLine'
import {checkMobile} from "../../util/Tool";

export default class SendSMS extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 60,
            mobile: this.props.mobile,
            secureTextEntry: true,
            codeAlreadySend: false,
        };
        this.lastActionTime = 0;
    }

    static defaultProps = {
        type: 'public',
        mobile: '',
        style: null,
        titleStyle: null,
        lineStyle: null,
        dismiss: () => Keyboard.dismiss(),
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            mobile: nextProps.mobile
        })
    }

    componentWillUnmount() {
        // this.timerInterval && clearInterval(this.timerInterval);
    }

    getVerificationCode = async (mobile, type) => {
        // console.log(mobile);
        let {dismiss} = this.props;
        dismiss && dismiss();
        if (type === 'register') {
            type = 1;
        } else if (type === 'bind_mobile') {
            type = 3;
        } else {
            type = 2;
        }
        let url = ServicesApi.getVerificationCode;
        let data = {
            mobile,
            type,
        };
        if (checkMobile(mobile)) {
            let result = await Services.post(url, data, true);
            if (result.code === 1) {
                this.countDownTimer();
                ToastManager.show('验证码已发送，请注意查收！', 'center');
            } else {
                ToastManager.show(result.msg);
            }
        } else {
            AlertManager.show({
                title: '温馨提示',
                detail: '请检查手机号输入是否正确',
                actions: [
                    {title: '确定'},
                ]
            })
        }
    };

    // 验证码倒计时
    countDownTimer() {
        this.setState({
            codeAlreadySend: true,
            seconds: 60,
        });
        this.timerInterval = setInterval(() => {
            if (this.state.seconds === 0) {
                return clearInterval(this.timerInterval);
            }
            this.setState({
                seconds: this.state.seconds - 1
            });
        }, 1000);
    };

    render() {
        let {type, style, titleStyle, lineStyle,} = this.props;
        let {mobile, seconds, codeAlreadySend} = this.state;
        if (!codeAlreadySend) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>获取验证码</Text>
                </TouchableOpacity>
            );
        } else if (seconds === 0) {
            return (
                <TouchableOpacity
                    style={[styles.btnViewStyle, style]}
                    onPress={() => this.getVerificationCode(mobile, type)}
                >
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>重新获取</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={[styles.btnViewStyle, style]}>
                    <VerticalLine lineStyle={[styles.verLine, lineStyle]}/>
                    <Text style={[styles.titleStyle, titleStyle]}>剩余{seconds}秒</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    btnViewStyle: {
        // width: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleStyle: {
        color: '#fff',
        fontSize: FontSize(11),
    },
    verLine: {
        height: 15,
        marginRight: 10,
        backgroundColor: '#fff',
    },
});