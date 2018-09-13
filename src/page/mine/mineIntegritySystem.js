/**
 * 校园空兼 - MineIntegritySystem
 * https://menger.me
 * @大梦
 */


'use strict';

import React, { Component } from 'react'
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
import { observer, inject } from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import MineOrderList from '../order/mineOrderList'
import {HorizontalLine, VerticalLine} from "../../component/common/commonLine";
export default class MineIntegritySystem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _showPointsRules = () => {
        const params = {
            title: '积分规则',
            detail: '1、分享至微信好友可获得10积分。',
            showClose: true,
            style: styles.alertContainer,
            actionStyle: styles.actionStyle,
            // actions: [
            //     { title: '确定', titleStyle: styles.titleStyleCur, btnStyle: [styles.btnStyle, styles.btnStyleCur], onPress: () => alert('确定') },
            //     { title: '取消', titleStyle: styles.titleStyle, btnStyle: styles.btnStyle, onPress: () => alert('取消') },
            // ]
        };
        AlertManager.show(params);
    };

    render() {
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '诚信体系';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{backgroundColor: 'transparent'}}
                    backgroundImage={null}
                />
                <View style={styles.content}>
                    <ImageBackground
                        style={styles.contentTopView}
                        source={Images.img_bg_mine}
                        resizeMode={'cover'}
                    >
                        <View style={[styles.contentTopItemView, styles.creditsInfoView]}>
                            <Text style={styles.creditsInfoTitle}>我的诚信分</Text>
                            <Text style={styles.creditsInfoValue}>9999</Text>
                            <TouchableOpacity
                                style={styles.creditsInfoRulesView}
                                onPress={this._showPointsRules}
                            >
                                <Text style={styles.creditsInfoRules}>积分原则条例 ></Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <SegmentedControlTab
                        values={['诚信分明细', '诚信分额度对应表']}
                        tabStyle={styles.tab}
                        activeTabStyle={styles.activeTabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                        tabsContainerStyle={styles.tabContainer}
                        onTabPress={(index) => {
                            // console.log(index);
                        }}
                    />
                    <View style={styles.pointsTableContent}>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableTitle}>积分</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableTitle}>兑换额度</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                    </View>
                    <View style={styles.pointsTableContent}>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableTitle}>操作</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableTitle}>时间</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableTitle}>明细</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>2018.07.10</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>2018.07.10</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                            <Text style={styles.tableContext}>500</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>2018.07.10</Text>
                            <VerticalLine lineStyle={styles.tableVerLine}/>
                            <Text style={styles.tableContext}>1500</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    content: {
        marginTop: CusTheme.isIPhoneX ? CusTheme.systemNavHeight - 24 : CusTheme.systemNavHeight,
    },
    contentTopView: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        paddingTop: CusTheme.isIPhoneX ? ScaleSize(220) : ScaleSize(180),
        height: CusTheme.isIPhoneX ? ScaleSize(400) : ScaleSize(360),
    },
    creditsInfoView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // backgroundColor: '#123',
    },
    creditsInfoValue: {
        color: '#fff',
        marginHorizontal: 10,
        fontSize: FontSize(40),
    },
    creditsInfoTitle: {
        color: '#fff',
        marginBottom: 10,
        fontSize: FontSize(12),
    },
    creditsInfoRulesView: {
        // marginLeft: 20,
    },
    creditsInfoRules: {
        color: '#ff0',
        marginBottom: 10,
        fontSize: FontSize(12),
    },

    tabContainer: {
        borderWidth: 0,
        height: ScaleSize(90),
        borderRadius: ScaleSize(45),
        marginVertical: ScaleSize(30),
        marginHorizontal: ScaleSize(30),
    },
    tab: {
        borderWidth: 0,
    },
    activeTabStyle: {
        backgroundColor: CusTheme.themeColor,
    },
    tabTextStyle: {
        color: '#999',
        borderWidth: 0,
        fontSize: FontSize(15),
    },
    activeTabTextStyle: {},


    segmentedView: {
    },
    segmentedBar: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        height: ScaleSize(90),
    },
    sheetActiveTitle: {
        color: CusTheme.themeColor,
        fontSize: FontSize(14),
    },
    sheetTitle: {
        color: '#999',
        fontSize: FontSize(14),
    },
    navBarItemView: {
        width: SCREEN_WIDTH,
        backgroundColor: '#123',
    },

    // 弹窗区
    alertContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: SCREEN_WIDTH - 50,
        // backgroundColor: '#123'
    },
    actionStyle: {
        height: 0,
        borderWidth: 0,
        borderColor: '#fff',
        paddingHorizontal: 30,
    },
    btnStyle: {
        margin: 10,
        borderRadius: 3,
        borderColor: '#ddd',
        borderWidth: CusTheme.minPixel,
    },
    btnStyleCur: {
        backgroundColor: CusTheme.themeColor,
    },
    titleStyle: {
        color: '#333',
    },
    titleStyleCur: {
        color: '#fff',
    },

    // 表格区
    pointsTableContent: {
        borderRadius: 5,
        marginVertical: 15,
        marginHorizontal: 15,
        backgroundColor: '#0fb99520',
    },
    tableItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tableTitleView: {},
    tableTitle: {
        flex: 1,
        color: '#333',
        textAlign: 'center',
        fontSize: FontSize(14),
    },
    tableVerLine: {
        height: 40,
        backgroundColor: '#ffffff50',
    },
    tableHorLine: {
        backgroundColor: '#ffffff50',
    },
    tableContext: {
        flex: 1,
        color: '#666',
        textAlign: 'center',
        fontSize: FontSize(12),
    },
});