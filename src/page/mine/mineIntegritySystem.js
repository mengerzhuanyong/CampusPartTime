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
import FlatListView from "../../component/common/FlatListView";
import {Button} from "teaset";

@inject('loginStore', 'mineStore')
@observer
export default class MineIntegritySystem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
        };
        this.page = 1;
        this.pageSize = 10;
    }

    componentDidMount() {
        this.requestDataSource(this.page);
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    requestDataSource = async (page) => {
        const {mineStore} = this.props;
        let url = ServicesApi.credit_system;
        let data = {
            page,
            page_size: this.pageSize,
        };

        let result = await mineStore.requestCreditDetail(url, data);
        let endStatus = false;
        if (result && result.code === 1) {
            endStatus = result.data.list_data.length < data.page_size;
        } else {
            endStatus = true;
        }
        this.setState({
            ready: true
        });
        this.flatListRef && this.flatListRef.stopRefresh();
        this.flatListRef && this.flatListRef.stopEndReached({allLoad: endStatus});
    };

    _showPointsRules = (data = []) => {
        let context = data.map((item, index) => {
            return (
                <Text key={item.id} style={styles.alertContext}>{item.value}</Text>
            );
        });
        let content = <View style={styles.alertContent}>{context}</View>;
        console.log(content);
        const params = {
            title: '积分规则',
            detail: content,
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

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    // 上拉加载
    _onEndReached = () => {
        this.timer1 = setTimeout(() => {

            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatListRef.stopEndReached({ allLoad: this.page === 2 });
            this.page++;
        }, 500);
    };

    // 下拉刷新
    _onRefresh = () => {
        this.timer2 = setTimeout(() => {
            // 调用停止刷新
            this.flatListRef.stopRefresh()
        }, 500);
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.tableHorLine}/>;
    };

    _renderHeaderComponent = () => {
        return (
            <View style={[styles.tableItemView, styles.tableTitleView]} />
        );
    };

    _renderListItem = ({item, index}) => {
        return (
            <View style={[styles.tableItemView, styles.tableTitleView]}>
                <Text style={[styles.tableContext, styles.tableName]} numberOfLines={2}>{item.name}</Text>
                <VerticalLine lineStyle={styles.tableVerLine}/>
                <Text style={[styles.tableContext, styles.tableDate]}>{item.date}</Text>
                <VerticalLine lineStyle={styles.tableVerLine}/>
                <Text style={[styles.tableContext, styles.tableValue]}>{item.value}</Text>
            </View>
        );
    };

    render() {
        let {activeTabIndex} = this.state;
        let {mineStore} = this.props;
        let {creditInfo, creditDetail} = mineStore;
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
                            <Text style={styles.creditsInfoValue}>{creditInfo.credit_point}</Text>
                            <TouchableOpacity
                                style={styles.creditsInfoRulesView}
                                onPress={() => this._showPointsRules(creditInfo.point_rules)}
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
                            console.log(index);
                            this.setState({
                                activeTabIndex: index
                            });
                        }}
                    />
                    {activeTabIndex === 1 ?
                        <View style={styles.pointsTableContent}>
                            <View style={[styles.tableItemView, styles.tableTitleView]}>
                                <Text style={styles.tableTitle}>积分</Text>
                                <VerticalLine lineStyle={styles.tableVerLine}/>
                                <Text style={styles.tableTitle}>兑换额度</Text>
                            </View>
                            {creditInfo.credit_exchange && creditInfo.credit_exchange.map((item, index) => {
                                return (
                                    <View
                                        key={item.id}
                                        style={styles.itemView}
                                    >
                                        <HorizontalLine lineStyle={styles.tableHorLine}/>
                                        <View style={[styles.tableItemView, styles.tableTitleView]}>
                                            <Text style={styles.tableContext}>{item.point}</Text>
                                            <VerticalLine lineStyle={styles.tableVerLine}/>
                                            <Text style={styles.tableContext}>{item.quota}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        :
                        <View style={styles.pointsTableContent}>
                            <View style={[styles.tableItemView, styles.tableTitleView]}>
                                <Text style={[styles.tableTitle, styles.tableName]}>操作</Text>
                                <VerticalLine lineStyle={styles.tableVerLine}/>
                                <Text style={[styles.tableTitle, styles.tableDate]}>时间</Text>
                                <VerticalLine lineStyle={styles.tableVerLine}/>
                                <Text style={[styles.tableTitle, styles.tableValue]}>明细</Text>
                            </View>
                            <FlatListView
                                style={styles.listContent}
                                initialRefresh={false}
                                ref={this._captureRef}
                                data={creditDetail}
                                renderItem={this._renderListItem}
                                keyExtractor={this._keyExtractor}
                                onEndReached={this._onEndReached}
                                onRefresh={this._onRefresh}
                                ItemSeparatorComponent={this._renderSeparator}
                                // ListHeaderComponent={this._renderHeaderComponent}
                            />
                        </View>
                    }
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
    alertContent: {
        marginTop: 15,
        minHeight: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertContext: {
        // flex: 1,
        color: '#333',
        fontSize: FontSize(12),
        lineHeight: FontSize(18),
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
    tableName: {
        flex: 2,
    },
    tableDate: {
        flex: 1.5,
    },
    tableValue: {
        flex: 1,
    },
});