/**
 * 校园空兼 - MineWithDraw
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
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView/index'
import ImageView from '../../component/common/ImageView'
import {inject, observer} from 'mobx-react'
import {Button, Carousel, ListRow} from 'teaset'
import FlatListView from '../../component/common/FlatListView'
import AreaContent from '../../component/common/AreaContent'
import Container from '../../component/common/Container';
import Countdown from '../../component/common/Countdown';
import {action} from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'


export default class MineWithDraw extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            type: '1',
            money: '',
            allMoney: '0',
            minMoney: '100',
        };
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    submitWithdraw = () => {

    };

    render(){
        let {type, money, allMoney, minMoney} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '余额提现';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.mineTopContainer}>
                        <View style={styles.contentTitleView}>
                            <Text style={styles.contentTitle}>请选择提现方式</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.horLine} />
                        <TouchableOpacity style={styles.accountInfoItem}>
                            <View style={styles.accountInfoItem}>
                                <Image source={Images.icon_wechat} style={styles.accountIcon}/>
                                <Text style={styles.accountTitle}>提现到微信</Text>
                            </View>
                            <View style={styles.selectBtnView}>
                                <Image source={Images.icon_select} style={styles.selectBtnIcon}/>
                            </View>
                        </TouchableOpacity>
                        <HorizontalLine lineStyle={styles.horLine} />
                        <TouchableOpacity style={styles.accountInfoItem}>
                            <View style={styles.accountInfoItem}>
                                <Image source={Images.icon_alipay} style={styles.accountIcon}/>
                                <Text style={styles.accountTitle}>提现到支付宝</Text>
                            </View>
                            <View style={styles.selectBtnView}>
                                <Image source={Images.icon_selected} style={styles.selectBtnIcon}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mineMiddleContainer}>
                        <Text style={styles.containerTitle}>提现金额</Text>
                        <View style={styles.containerContent}>
                            <Text style={styles.moneyIcon}>¥</Text>
                            <TextInput
                                value = {money}
                                style = {styles.inputItemCon}
                                placeholder = "输入提现金额"
                                placeholderTextColor = '#fff'
                                underlineColorAndroid = {'transparent'}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        money: text
                                    });
                                }}
                            />
                            {money !== '' && <TouchableOpacity
                                style = {Theme.inputBtnView}
                                onPress = {() => {
                                    this.setState({
                                        money: '',
                                    })
                                }}
                            >
                                <Image source={Images.icon_close} style={Theme.inputBtnIcon} />
                            </TouchableOpacity>}
                        </View>
                        <HorizontalLine lineStyle={styles.horLine} />
                        <View style={styles.containerBotView}>
                            <Text style={[styles.leftTitle, styles.containerTitle]}>可用余额 {parseFloat(allMoney).toFixed(2)}元</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    let status = parseFloat(allMoney).toFixed(2) - parseFloat(minMoney).toFixed(2);
                                    if (status >= 0) {
                                        this.setState({
                                            money: parseFloat(allMoney).toFixed(2)
                                        });
                                    } else {
                                        let msg = '余额不足' + minMoney + '元，无法提交申请';
                                        ToastManager.show(msg, 'center');
                                    }
                                }}
                            >
                                <Text style={styles.rightTitle}>全部提现</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        title={'提现'}
                        style={[Theme.btnView, styles.btnView]}
                        titleStyle={[Theme.btnName, styles.btnName]}
                    />
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8f9',
    },
    content: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f7f8f9',
    },
    horLine: {
        marginLeft: 20,
        marginVertical: 5,
    },

    mineTopContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    contentTitleView: {
        height: 45,
        justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    accountInfoItem: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    accountIcon: {
        marginRight: 10,
        width: ScaleSize(66),
        height: ScaleSize(66),
        resizeMode: 'contain',
    },
    accountTitle: {
        fontSize: 14,
        color: '#555',
    },
    accountInput: {
        flex: 1,
        fontSize: 14,
    },
    selectBtnView: {},
    selectBtnIcon: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        resizeMode: 'contain',
        tintColor: Theme.themeColor,
    },

    mineMiddleContainer: {
        padding: 15,
        backgroundColor: '#fff',
    },
    containerTitle: {
        color: '#666',
        fontSize: 15,
    },
    containerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f50',
    },
    moneyIcon: {
        fontSize: 25,
        color: '#333',
    },
    inputItemCon: {
        flex: 1,
        height: 60,
        fontSize: 30,
        color: '#333',
        marginLeft: 10,
        textAlignVertical: 'bottom',
    },

    containerBotView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    leftTitle: {},
    rightTitle: {
        color: Theme.themeColor,
    },
    btnView: {
        margin: 30,
    },
    btnName: {
    },
});