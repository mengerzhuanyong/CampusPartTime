/**
 * 校园空兼 - WorkDetail
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
import WorkPunchCard from "./workPunchCard";


export default class WorkDetail extends Component {

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
                    // rightView={this.renderHeaderRightView()}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView,]}>
                        <View style={[styles.contentTitleView, styles.orderGoodsInfoView]}>
                            <Text style={styles.orderGoodsTitle}>花海地产新盘传单派发</Text>
                            <View style={[styles.jobInfoTagItemView, styles.jobInfoTagIconView]}>
                                <Image source={Images.icon_hot} style={[styles.jobInfoTagIcon]} />
                            </View>
                        </View>
                        <Text style={styles.orderGoodsPrices}>0.8工分/h</Text>
                        <Text style={styles.orderGoodsNum}>报名人数：7/20</Text>
                    </View>

                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                           <Text style={styles.contentTitle}>职位描述</Text>
                        </View>
                        <View style={styles.orderUserInfoCon}>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>【入职要求】</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>形象好、气质佳、阳光开朗、男女不限！</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>【入职要求】</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>形象好、气质佳、阳光开朗、男女不限！</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>【入职要求】</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>形象好、气质佳、阳光开朗、男女不限！</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>工作时间</Text>
                        </View>
                        <Text style={styles.orderStatusInfoItem}>交易状态：等待收货</Text>
                        <Text style={styles.orderStatusInfoItem}>下单时间：2018.04.23</Text>
                        <Text style={styles.orderStatusInfoItem}>还需偿还工分：675</Text>
                    </View>
                </ScrollView>
                <Button
                    title={'报名'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={() => RouterHelper.navigate('选择时间', 'WorkSignUpStepOne')}
                />
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
        // height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
        lineHeight: FontSize(25),
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
        color: '#333',
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderGoodsNum: {
        marginTop: 8,
        fontSize: FontSize(13),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
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
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},


    jobInfoTagsView: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CusTheme.minPixel,
    },
    jobInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    jobInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    jobInfoTagIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },

    orderUserInfoConItem: {
        marginTop: 10,
    },
    orderUserInfoConItemTitle: {
        color: '#333',
        marginBottom: 5,
        fontSize: FontSize(15),
    },
    orderUserInfoConItemValue: {
        color: '#666',
        fontSize: FontSize(13),
        lineHeight: FontSize(20),
    },
});