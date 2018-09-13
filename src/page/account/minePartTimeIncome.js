/**
 * 校园空兼 - MinePartTimeIncome
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
} from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import {Button, Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import FlatListView from '../../component/common/FlatListView'

export default class MinePartTimeIncome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        };
        this.page = 1;
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    // 上拉加载
    _onEndReached = () => {
        this.timer1 = setTimeout(() => {
            let dataTemp = this.state.listData;
            let allLoad = false;
            //模拟数据加载完毕,即page > 0,
            if (this.page < 2) {
                this.setState({ data: dataTemp.concat(this.state.listData) });
            }
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
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderEmptyComponent = () => {
        return (
            <View style={CusTheme.emptyComponentView}>
                <Image
                    style={CusTheme.listEmptyTipsImg}
                    source={Images.img_bg_empty_account}
                />
                <Text style={CusTheme.emptyText}>您还没有过兼职哦, 快去看看有哪些兼职吧</Text>
                <Button
                    title={'去看看'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={() => RouterHelper.navigate('', 'Work')}
                />
            </View>
        );
    };

    _renderListItem = (info) => {
        return (
            <View style={styles.detailInfoItemView}>
                <View style={styles.detailInfoItemTopView}>
                    <Text style={styles.detailInfoItemTitle}>花海地产新盘传单派发</Text>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
                <View style={styles.detailInfoItemMidView}>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>起止时间：</Text>
                        <Text style={styles.detailInfoItemTime}>2018-07-10 - 2018-07-20</Text>
                    </View>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>工作地点：</Text>
                        <Text style={styles.detailInfoItemTime}>黄岛区花海地产售楼处</Text>
                    </View>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
                <View style={styles.detailInfoItemBotView}>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>工作收益：</Text>
                        <Text style={styles.detailInfoItemValue}>20工分</Text>
                    </View>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>总收益：</Text>
                        <Text style={styles.detailInfoItemValue}>20工分</Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '兼职收入明细';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={false}
                        ref={this._captureRef}
                        data={this.state.listData}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                        ListEmptyComponent={this._renderEmptyComponent}
                    />
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
        flex: 1,
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 60,
    },
    horLine: {
        marginVertical: 10,
        backgroundColor: '#eee',
    },
    contentTopView: {
        paddingTop: ScaleSize(150),
        width: SCREEN_WIDTH,
        alignItems: 'center',
        height: ScaleSize(510),
    },
    creditsDialView: {
        alignItems: 'center',
        height: ScaleSize(430),
        width: SCREEN_WIDTH * 0.8,
        // backgroundColor: '#123'
    },
    creditsDialHandView: {
        height: ScaleSize(330),
    },
    creditsDialHand: {
        height: ScaleSize(310),
        resizeMode: 'contain',
    },
    creditsInfoView: {
        marginTop: 10,
    },
    creditsInfoValue: {
        color: '#fff',
        // fontWeight: '600',
        fontSize: FontSize(50),
    },
    creditsInfoTitle: {
        color: '#fff',
        fontSize: FontSize(15),
    },
    contentTopItemView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatarView: {
        // marginTop: 60,
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        overflow: 'hidden',
        backgroundColor: '#f50'
    },
    userAvatar: {
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        resizeMode: 'cover',
    },
    userInfoView: {
        marginVertical: ScaleSize(30),
    },
    userName: {
        color: '#fff',
        fontSize: FontSize(16),
    },
    studentInfoView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    studentInfoText: {
        color: '#fff',
        marginHorizontal: 5,
        fontSize: FontSize(14),
    },
    userAccountView: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    userAccountItemView: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    verLine: {
        height: 20,
        marginHorizontal: 40,
    },
    userAccountInfo: {
        color: '#fff',
        fontSize: FontSize(13),
    },
    userAccountInfoCur: {
        fontWeight: '600',
        fontSize: FontSize(18),
    },

    contentItemView: {
        // marginTop: 10,
    },
    contentTitleView: {
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: FontSize(15),
    },
    detailInfoItemView: {
        borderRadius: 3,
        marginBottom: 10,
        paddingVertical: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    detailInfoItemTopView: {},
    detailInfoItemTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    detailInfoItemMidView: {},
    detailInfoItemBotView: {
        // marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailInfoItemTime: {
        color: '#888',
        fontSize: FontSize(13),
    },
    detailInfoItemTextView: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailInfoItemType: {
        color: '#333',
        fontSize: FontSize(13),
    },
    detailInfoItemValue: {
        color: '#f00',
        fontSize: FontSize(13),
    },

    emptyComponentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listEmptyTipsImg: {
        marginTop: ScaleSize(40),
        resizeMode: 'contain',
        width: SCREEN_WIDTH / 1.5,
    },
    emptyText: {
        color: '#333',
        fontSize: FontSize(14),
    },
    btnView: {
        height: 45,
        marginTop: 20,
        borderWidth: 0,
        width: SCREEN_WIDTH / 2,
        backgroundColor: CusTheme.themeColor,
    },
    btnName: {
        color: '#fff',
    },
});