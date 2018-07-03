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
    TouchableOpacity,
} from 'react-native'

import {Button} from 'teaset'

import NavigationBar from '../../component/common/NavigationBar'
import Container from '../../component/common/Container'
import SendSMS from '../../component/common/sendSMS'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'

export default class RecoverPwd extends PureComponent {

    render() {
        return (
            <Container style={styles.container}>
                <Image source={Images.img_bg_login} style={Theme.containerBackgroundImage}/>
                <NavigationBar
                    title={'忘记密码'}
                    style={styles.navigationBarStyle}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <View style={styles.loginContent}>
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
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangeLogin}
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
                            secureTextEntry={true}
                            placeholderTextColor={'#fff'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={this._onChangeLogin}
                        />
                        <SendSMS
                            mobile={'mobile'}
                            type={'register'}
                            lineStyle={styles.verLine}
                            btnViewStyle={styles.getCodeView}
                            btnStyle={styles.getCodeCon}
                            {...this.props}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine}/>
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_lock} style={styles.inputIcon}/>
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
                    <HorizontalLine lineStyle={styles.horLine}/>
                    <View style={styles.inputItemView}>
                        <Image source={Images.icon_lock} style={styles.inputIcon}/>
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
                            onChangeText={this._onChangeLogin}
                        />
                    </View>
                    <HorizontalLine lineStyle={styles.horLine}/>
                    <Button
                        onPress={this._onPress}
                        style={[styles.btnItem, styles.registerBtnItem]}
                        titleStyle={[styles.btnItemTitle, styles.registerBtnItemTitle]}
                        title={'立即找回'}
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
        borderBottomWidth: Theme.minPixel,
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
        borderWidth: Theme.minPixel,
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
        color: Theme.themeColor,
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
