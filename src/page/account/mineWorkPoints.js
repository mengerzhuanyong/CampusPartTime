/**
 * 校园空兼 - MineWorkPoints
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
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'mineStore')
@observer
export default class MineWorkPoints extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1,2,3,4],
        };
        this.page = 1;
        this.pageSize = 10;
    }

    componentDidMount() {
        this.loadNetData(this.page);
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    loadNetData = async (page) => {
        const {mineStore} = this.props;
        let url = ServicesApi.my_work_point;
        let data = {
            page,
            sort: 2,
            position: 0,
            sort_column: 1,
            page_size: this.pageSize,
        };

        let result = await mineStore.requestWorkPoints(url, data);
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

    _onRefresh = (stopRefresh) => {
        this.page = 1;
        this.loadNetData(this.page);
    };

    _onEndReached = (stopEndReached) => {
        this.page++;
        this.loadNetData(this.page);
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${item.id}`
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderHeaderComponent = () => {
        const {mineStore} = this.props;
        let {myWorkPoints, myWorkPointsDetail} = mineStore;
        return (
            <View style={styles.headerComponentView}>
                <ImageBackground
                    style={styles.contentTopView}
                    source={Images.img_bg_mine}
                    resizeMode={'cover'}
                >
                    <View style={[styles.contentTopItemView, styles.creditsInfoView]}>
                        <Text style={styles.creditsInfoTitle}>需偿还工分</Text>
                        <Text style={styles.creditsInfoValue}>{myWorkPoints.debt || 0}</Text>
                    </View>
                    <View style={[styles.contentTopItemView, styles.userAccountView]}>
                        <View style={[styles.userAccountItemView]}>
                            <Text style={[styles.userAccountInfo, styles.userAccountInfoCur]}>{myWorkPoints.pay || 0}</Text>
                            <Text style={styles.userAccountInfo}>已偿还工分</Text>
                        </View>
                        <VerticalLine lineStyle={styles.verLine} />
                        <View style={[styles.userAccountItemView]}>
                            <Text style={[styles.userAccountInfo, styles.userAccountInfoCur]}>{myWorkPoints.total || 0}</Text>
                            <Text style={styles.userAccountInfo}>总偿还工分</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.contentTitleView}>
                    <Text style={styles.contentTitle}>工分明细</Text>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
            </View>
        );
    };

    _renderListItem = ({item, index}) => {
        console.log(item, index);
        return (
            <View style={styles.detailInfoItemView}>
                <View style={styles.detailInfoItemTopView}>
                    <Text style={styles.detailInfoItemTitle}>{item.job_name}</Text>
                </View>
                <View style={styles.detailInfoItemBotView}>
                    <Text style={styles.detailInfoItemTime}>{item.time}</Text>
                    <View style={styles.detailInfoItemBotRightView}>
                        <Text style={styles.detailInfoItemType}>{item.work_tips}：</Text>
                        <Text style={styles.detailInfoItemValue}>{item.point}</Text>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const {mineStore} = this.props;
        let {myWorkPoints, myWorkPointsDetail} = mineStore;
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '工分明细';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{backgroundColor: 'transparent'}}
                    backgroundImage={Images.img_bg_nav_bar}
                />
                <View style={styles.content}>
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={false}
                        ref={this._captureRef}
                        data={myWorkPointsDetail}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListHeaderComponent={this._renderHeaderComponent}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: CusTheme.systemNavHeight,
    },
    horLine: {
        backgroundColor: '#ddd',
    },
    contentTopView: {
        paddingTop: 74,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        height: __IOS__ ? ScaleSize(510) : ScaleSize(560),
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
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    detailInfoItemTopView: {},
    detailInfoItemTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    detailInfoItemBotView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailInfoItemTime: {
        color: '#888',
        fontSize: FontSize(13),
    },
    detailInfoItemBotRightView: {
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
});