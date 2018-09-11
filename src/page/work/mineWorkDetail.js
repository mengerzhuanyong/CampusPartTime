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


export default class MineWorkDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1, 2, 3, 4],
        };
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
        let {loading, listData} = this.state;
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
                        <Text style={styles.orderGoodsTitle}>正在进行中。。。</Text>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                           <Text style={styles.contentTitle}>【工作信息】</Text>
                        </View>
                        <View style={styles.orderUserInfoCon}>
                            <Text style={[styles.orderUserName, styles.orderUserInfoText]}>收货人：张三</Text>
                            <Text style={[styles.orderUserPhone, styles.orderUserInfoText]}>13234536789</Text>
                        </View>
                        <Text style={[styles.orderUserAddress, styles.orderUserInfoText]}>山东省青岛市黄岛区新安街道前湾港路579号 山东科技大学北区宿舍区六号楼102</Text>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>【工作信息】</Text>
                        </View>
                        <Text style={styles.orderStatusInfoItem}>交易状态：等待收货</Text>
                        <Text style={styles.orderStatusInfoItem}>下单时间：2018.04.23</Text>
                        <Text style={styles.orderStatusInfoItem}>还需偿还工分：675</Text>
                    </View>
                    <Button
                        title={'打卡'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={() => RouterHelper.navigate('', 'WorkPunchCard')}
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