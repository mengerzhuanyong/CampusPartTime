/**
 * 校园空兼 - MineWorkDetail
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import WorkPunchCard from "./workPunchCard";

@inject('loginStore', 'mineStore', 'workStore')
@observer
export default class MineWorkDetail extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            listData: [1, 2, 3, 4],
            item: params && params.item ? params.item : {
                job_info: {},
                user_info: {},
            },
        };
    }
    
    componentDidMount() {
        this.requestOrderDetail();
    }

    requestOrderDetail = async () => {
        const {workStore} = this.props;
        let {item} = this.state;
        let url = ServicesApi.work_bench_job_details;
        let data = {
            id: item.id,
        };
        let result = await workStore.requestWorkBenchDetail(url, data);
    };



    confirmPickUpOrder = (item) => {
        const params = {
            title: '温馨提示',
            detail: '您确认收到货物了吗',
            actions: [
                {
                    title: '取消',
                    onPress: () => {},
                },
                {
                    title: '确定',
                    onPress: () => this.submitPickUpOrder(item),
                }
            ]
        };
        AlertManager.show(params);
    }

    submitPickUpOrder = async (item) => {
        const {workStore} = this.props;
        let url = ServicesApi.receipt;
        let data = {
            type: item.type,
            order_id: item.id,
        };
        let result = await workStore.submitPickUpOrder(url, data);
        if (result && result.code === 1) {
            this.requestOrderDetail();
        }
    }

    renderHeaderRightView = () => {
        return (
            <TouchableOpacity
                style={[CusTheme.headerButtonView, styles.headerRightView]}
                onPress={() => RouterHelper.navigate('异常申诉', 'WorkAbnormalAppeal', {})}
            >
                <Text style={CusTheme.headerBtnName}>异常申诉</Text>
            </TouchableOpacity>
        )
    };

    render() {
        let {loading, item} = this.state;
        const {workStore} = this.props;
        let {workBenchDetail} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '工作详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    rightView={this.renderHeaderRightView()}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                        <Text style={styles.orderGoodsTitle}>工作状态：</Text>
                        <Text style={styles.orderGoodsTitle}>{workBenchDetail.sign_status_text}</Text>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                           <Text style={styles.contentTitle}>【个人信息】</Text>
                        </View>
                        <View style={styles.goodsUserInfoCon}>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>姓名：</Text>
                                <Text style={[styles.goodsUserInfoText]}>{workBenchDetail.user_info.username}</Text>
                            </View>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>学校：</Text>
                                <Text style={[styles.goodsUserInfoText]}>{workBenchDetail.user_info.school}</Text>
                            </View>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>年级：</Text>
                                <Text style={[styles.goodsUserInfoText]}>{workBenchDetail.user_info.grade}</Text>
                            </View>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>电话：</Text>
                                <Text style={[styles.goodsUserInfoText]}>{workBenchDetail.user_info.mobile}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>【工作信息】</Text>
                        </View>
                        <Text style={styles.orderStatusInfoItem}>工作名称：{workBenchDetail.job_info.name}</Text>
                        <Text style={styles.orderStatusInfoItem}>工作时间：{workBenchDetail.job_info.work_time}</Text>
                        <Text style={styles.orderStatusInfoItem}>工作人员电话：{workBenchDetail.job_info.server_mobile}</Text>
                        <Text style={styles.orderStatusInfoItem}>工作地点：{workBenchDetail.job_info.address}</Text>
                    </View>
                    <Button
                        title={'打卡'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={() => RouterHelper.navigate('打卡', 'WorkPunchCard')}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerRightView: {
        top: -22,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    contentTitleView: {
        height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
    },
    orderGoodsInfoView: {
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(280),
    },
    orderGoodsPic: {
        width: ScaleSize(280),
        height: ScaleSize(230),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(230),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        fontSize: FontSize(16),
        color: CusTheme.themeColor,
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    goodsUserInfoCon: {
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsUserInfoConItem: {
        marginTop: 10,
        width: (SCREEN_WIDTH - 30) / 2,
        flexDirection: 'row',
        // alignItems: 'center',
    },
    goodsUserInfoTitle: {
        // flex: 1,
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    goodsUserInfoText: {
        flex: 1,
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    orderUserName: {},
    orderUserPhone: {},
    orderUserAddress: {},
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(25),
    },

    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
});