/**
 * 校园空兼 - MineSettingPassWord
 * https://menger.me
 * @大梦
 */


'use strict';

import React, { Component } from 'react'
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
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/common/NavigationBar'
import {ListRow, Button} from 'teaset'
import {HorizontalLine} from "../../component/common/commonLine";
import SendSMS from "../../component/common/SendSMS";
import InputRightButton from "../../component/common/InputRightButton";

export default class MineSettingPassWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            inputType: 'password',
            secureTextEntry: true,
        };
    }

    render() {
        let {mobile, password, inputType, secureTextEntry} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '修改密码';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <View style={styles.loginContent}>
                        <View style={styles.inputItemView}>
                            <TextInput
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                keyboardType={'numeric'}
                                secureTextEntry={secureTextEntry}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入6-12位数字和字母组合'}
                                placeholderTextColor={'#999'}
                                returnKeyType={'done'}
                                maxLength={12}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                            />
                            {password &&
                                <InputRightButton
                                    type = {inputType}
                                    submitFoo={() => {
                                        inputType = secureTextEntry ? 'text' : 'password';
                                        this.setState({
                                            inputType: inputType,
                                            secureTextEntry: !secureTextEntry,
                                        });
                                    }}
                                />
                            }
                        </View>
                        <HorizontalLine lineStyle={styles.horLine} />
                        <View style={styles.inputItemView}>
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
                                onChangeText={this._onChangeLogin}
                            />
                            <SendSMS
                                mobile={mobile}
                                type={'public'}
                                style={styles.getCodeView}
                                lineStyle={styles.getCodeLine}
                                titleStyle={styles.getCodeTitle}
                                {...this.props}
                            />
                        </View>
                    </View>
                    <Button
                        title={'重置密码'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                    />
                </View>
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
    },
    inputItem: {
        flex: 1,
        height: 50,
        color: '#555',
        marginLeft: 10,
    },
    getCodeView: {

    },
    getCodeTitle: {
        color: '#333',
    },
    getCodeLine: {
        height: 15,
        backgroundColor: '#333',
    },
    btnView: {
        margin: 30,
    },
    btnName: {},
});