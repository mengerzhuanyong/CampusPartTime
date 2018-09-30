/**
 * 校园空兼 - MinePoints
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
import ActionsManager from "../../config/manager/ActionsManager";
import {inject, observer} from "mobx-react";

@inject('loginStore', 'mineStore', 'systemStore')
@observer
export default class MinePoints extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1,2,3,4],
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
        let url = ServicesApi.my_point;
        let data = {
            page,
            page_size: this.pageSize,
        };

        let result = await mineStore.requestPointDetail(url, data);
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

    onShare = async () => {
        const {systemStore} = this.props;
        let {appShareParams} = systemStore;
        let url = ServicesApi.get_app_share;
        if (appShareParams !== '') {
            ActionsManager.showShareModule(appShareParams);
            return;
        }
        try {
            let result = await systemStore.getAppShareParams(url);
            if (result && result.code === 1) {
                // let params = {
                //     result.data,
                //     callBack: {() => this._onRefresh()},
                // };
                ActionsManager.showShareModule(result.data, () => this._onRefresh());
            } else {
                ToastManager.show(result.msg);
            }
        } catch (e) {
            console.log(e);
            ToastManager.show('error');
        }
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

    _onRefresh = (stopRefresh) => {
        this.page = 1;
        this.requestDataSource(this.page);
    };

    _onEndReached = (stopEndReached) => {
        this.page++;
        this.requestDataSource(this.page);
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />;
    };

    _renderHeaderComponent = () => {
        let {mineStore} = this.props;
        let {pointsInfo} = mineStore;
        return (
            <View style={styles.headerComponentView}>
                <ImageBackground
                    style={styles.contentTopView}
                    source={Images.img_bg_credits}
                    resizeMode={'cover'}
                >
                    <View style={[styles.contentTopItemView, styles.creditsInfoView]}>
                        <Text style={styles.creditsInfoTitle}>当前积分</Text>
                        <Text style={styles.creditsInfoValue}>{pointsInfo.points}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.navBtnView}>
                    <Button
                        title={'赚积分'}
                        onPress={this.onShare}
                        style={styles.btnView}
                        titleStyle={styles.btnNameStyle}
                    />
                    <Button
                        title={'积分商城'}
                        onPress={() => RouterHelper.navigate('积分商城', 'PointShop', {})}
                        style={styles.btnView}
                        titleStyle={styles.btnNameStyle}
                    />
                </View>
                <View style={styles.contentTitleView}>
                    <Text style={styles.contentTitle}>积分获取记录</Text>
                    <TouchableOpacity
                        style={styles.contentTitleRightView}
                        onPress={() => this._showPointsRules(pointsInfo.point_rules)}
                    >
                        <Text style={styles.contentDetail}>积分规则</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
            </View>
        );
    };

    _renderListItem = ({item, index}) => {
        return (
            <View style={styles.detailInfoItemView}>
                <Text style={styles.detailInfoItemTitle}>{item.name}</Text>
                <Text style={styles.detailInfoItemTime}>{item.date}</Text>
                <Text style={styles.detailInfoItemValue}>{item.value}</Text>
            </View>
        );
    };

    render() {
        let {loading, listData} = this.state;
        let {mineStore} = this.props;
        let {pointsInfo, pointsDetail} = mineStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '工分明细';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{backgroundColor: 'transparent'}}
                    // backgroundImage={Images.img_bg_nav_bar2}
                    // backgroundImage={null}
                />
                <View style={styles.content}>
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={false}
                        ref={this._captureRef}
                        data={pointsDetail}
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
        marginTop: CusTheme.isIPhoneX ? CusTheme.systemNavHeight - 24 : CusTheme.systemNavHeight,
    },
    horLine: {
        backgroundColor: '#ddd',
    },
    contentTopView: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        paddingTop: CusTheme.isIPhoneX ? ScaleSize(220) : ScaleSize(180),
        height: CusTheme.isIPhoneX ? ScaleSize(400) : ScaleSize(360),
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },
    creditsInfoValue: {
        color: '#fff',
        // fontWeight: '600',
        fontSize: FontSize(40),
    },
    creditsInfoTitle: {
        color: '#fff',
        marginBottom: 10,
        marginRight: 10,
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

    navBtnView: {
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    btnView: {
        width: 100,
        height: 35,
        borderRadius: 35,
        borderColor: '#ddd',
    },
    btnNameStyle: {
        color: '#555',
        fontSize: FontSize(13),
    },

    contentItemView: {
        // marginTop: 10,
    },
    contentTitleView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: FontSize(15),
    },
    contentTitleRightView: {
        marginRight: 15,
    },
    contentDetail: {
        color: CusTheme.themeColor,
        fontSize: FontSize(13),
    },
    detailInfoItemView: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    detailInfoItemTitle: {
        flex: 3,
        color: '#333',
        fontSize: FontSize(15),
    },
    detailInfoItemTime: {
        flex: 2,
        color: '#888',
        fontSize: FontSize(13),
    },
    detailInfoItemValue: {
        flex: 1,
        color: '#f80',
        fontSize: FontSize(13),
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
});