/**
 * 校园空兼 - OrderDetail
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
import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'

import MineOrderList from './mineOrderList'

export default class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1, 2, 3, 4],
        };
    }

    render() {
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '订单详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                        <View style={styles.orderGoodsPicView}>
                            <Image source={Images.img_goods1} style={styles.orderGoodsPic}/>
                        </View>
                        <View style={styles.orderGoodsTitleView}>
                            <Text style={styles.orderGoodsTitle}>苹果iPhone X 64G 黑色</Text>
                            <Text style={styles.orderGoodsPrices}>2200工分</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={styles.orderUserInfoCon}>
                            <Text style={[styles.orderUserName, styles.orderUserInfoText]}>收货人：张三</Text>
                            <Text style={[styles.orderUserPhone, styles.orderUserInfoText]}>13234536789</Text>
                        </View>
                        <Text style={[styles.orderUserAddress, styles.orderUserInfoText]}>山东省青岛市黄岛区新安街道前湾港路579号 山东科技大学北区宿舍区六号楼102</Text>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <Text style={styles.orderStatusInfoItem}>交易状态：等待收货</Text>
                        <Text style={styles.orderStatusInfoItem}>下单时间：2018.04.23</Text>
                        <Text style={styles.orderStatusInfoItem}>还需偿还工分：675</Text>
                    </View>
                    <Button
                        title={'申请退换货'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={() => RouterHelper.navigate('', 'Work')}
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

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    orderGoodsInfoView: {
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
        color: '#333',
        fontSize: FontSize(15),
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