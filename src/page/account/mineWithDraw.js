/**
 * 校园空兼 - MineWithDraw
 * https://menger.me
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
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, KeyboardAvoidingView,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
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
import {checkFloat} from "../../util/Tool";


@inject('loginStore', 'mineStore')
@observer
export default class MineWithDraw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            money: '',
            allMoney: '0',
            minMoney: '100',
            alipayAccount: '',
            alipayName: '',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        let timers = [this.timer];
        ClearTimer(timers);
    }

    onSelectPaymentMethod = (type) => {
        this.setState({type});
    };

    onSubmitWithdraw = async () => {
        const {mineStore} = this.props;
        let {type, money, alipayAccount, alipayName} = this.state;
        let url = ServicesApi.mineAccountWithdraw;
        let data = {
            type,
            money,
            alipay_account: alipayAccount,
            alipay_name: alipayName,
        };

        if (type === 2 && alipayAccount === '') {
            ToastManager.show('请输入支付宝账号');
            return;
        }
        if (type === 2 && alipayName === '') {
            ToastManager.show('请输入支付宝账户姓名');
            return;
        }
        if (money === '' || !checkFloat(money)) {
            ToastManager.show('提现金额输入有误，请重新输入');
            return;
        }

        if (mineStore.dataSource.is_wechat_status === 1 && type === 1) {
            const params = {
                title: '温馨提示',
                detail: '提现到微信，需要预先绑定微信',
                actions: [
                    {
                        title: '取消',
                        onPress: () => {
                        },
                    },
                    {
                        title: '立即绑定',
                        onPress: () => RouterHelper.navigate('我的资料', 'MineProfile'),
                    }
                ]
            };
            AlertManager.show(params);
            return;
        }
        try {
            let result = await mineStore.onSubmitWithdraw(url, data);
            ToastManager.show(result.msg);
            if (result && result.code === 1) {
                let _url = ServicesApi.mine;
                let _data = await mineStore.requestDataSource(_url);
                this.timer = setTimeout(() => {
                    RouterHelper.goBack();
                }, 600);
            }
        } catch (e) {
            console.log(e);
            ToastManager.show('error');
        }

    };

    renderAccountView = (type) => {
        if (type === 1) {
            return null;
        }
        return (
            <View style={styles.mineTopContainer}>
                <View style={styles.contentTitleView}>
                    <Text style={styles.contentTitle}>账户信息</Text>
                </View>
                <HorizontalLine lineStyle={styles.horLine}/>
                <View style={styles.accountInfoItem}>
                    <TextInput
                        style={[styles.inputItemCon, styles.accountInput]}
                        placeholder="请输入支付宝账号"
                        placeholderTextColor='#888'
                        underlineColorAndroid={'transparent'}
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            this.setState({
                                alipayAccount: text
                            })
                        }}
                    />
                </View>
                <HorizontalLine lineStyle={styles.horLine}/>
                <View style={styles.accountInfoItem}>
                    <TextInput
                        style={[styles.inputItemCon, styles.accountInput]}
                        placeholder="请输入账户姓名"
                        placeholderTextColor='#888'
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => {
                            this.setState({
                                alipayName: text
                            })
                        }}
                    />
                </View>
            </View>
        );
    };

    render() {
        let {mineStore} = this.props;
        let {dataSource} = mineStore;
        let {type, money, allMoney, minMoney} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '余额提现';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.scrollContent}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={styles.mineTopContainer}>
                            <View style={styles.contentTitleView}>
                                <Text style={styles.contentTitle}>请选择提现方式</Text>
                            </View>
                            <HorizontalLine lineStyle={styles.horLine}/>
                            <TouchableOpacity
                                style={styles.accountInfoItem}
                                onPress={() => this.onSelectPaymentMethod(1)}
                            >
                                <View style={styles.accountInfoItem}>
                                    <Image source={Images.icon_wechat} style={styles.accountIcon}/>
                                    <Text style={styles.accountTitle}>提现到微信</Text>
                                </View>
                                <View style={styles.selectBtnView}>
                                    <Image source={type === 1 ? Images.icon_selected : Images.icon_select}
                                           style={styles.selectBtnIcon}/>
                                </View>
                            </TouchableOpacity>
                            <HorizontalLine lineStyle={styles.horLine}/>
                            <TouchableOpacity
                                style={styles.accountInfoItem}
                                onPress={() => this.onSelectPaymentMethod(2)}
                            >
                                <View style={styles.accountInfoItem}>
                                    <Image source={Images.icon_alipay} style={styles.accountIcon}/>
                                    <Text style={styles.accountTitle}>提现到支付宝</Text>
                                </View>
                                <View style={styles.selectBtnView}>
                                    <Image source={type === 2 ? Images.icon_selected : Images.icon_select}
                                           style={styles.selectBtnIcon}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {this.renderAccountView(type)}
                        <View style={styles.mineMiddleContainer}>
                            <Text style={styles.containerTitle}>提现金额</Text>
                            <View style={styles.containerContent}>
                                <Text style={styles.moneyIcon}>¥</Text>
                                <TextInput
                                    value={money}
                                    style={styles.inputItemCon}
                                    placeholder="输入提现金额"
                                    placeholderTextColor='#fff'
                                    underlineColorAndroid={'transparent'}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => {
                                        this.setState({
                                            money: text
                                        });
                                    }}
                                />
                                {money !== '' && <TouchableOpacity
                                    style={CusTheme.inputBtnView}
                                    onPress={() => {
                                        this.setState({
                                            money: '',
                                        })
                                    }}
                                >
                                    <Image source={Images.icon_close} style={CusTheme.inputBtnIcon}/>
                                </TouchableOpacity>}
                            </View>
                            <HorizontalLine lineStyle={styles.horLine}/>
                            <View style={styles.containerBotView}>
                                <Text
                                    style={[styles.leftTitle, styles.containerTitle]}>可用余额 {parseFloat(dataSource.balance).toFixed(2)}元</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        let status = parseFloat(dataSource.balance).toFixed(2) - parseFloat(minMoney).toFixed(2);
                                        if (status >= 0) {
                                            this.setState({
                                                money: parseFloat(dataSource.balance).toFixed(2)
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
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={this.onSubmitWithdraw}
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
        backgroundColor: '#f7f8f9',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
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
        tintColor: CusTheme.themeColor,
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
        color: CusTheme.themeColor,
    },
    btnView: {
        margin: 30,
    },
    btnName: {},
});