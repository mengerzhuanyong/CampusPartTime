/**
 * 校园空兼 - SystemMessage
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
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView/index'
import ImageView from '../../component/common/ImageView'
import {inject, observer} from 'mobx-react'
import {Button} from 'teaset'
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
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine} from '../../component/common/commonLine'
import GoodsItem from "../../component/item/goodsItem";
import MessageItem from "../../component/item/messageItem";
import SpinnerLoading from "../../component/common/SpinnerLoading";

@inject('loginStore', 'systemStore')
@observer
export default class SystemMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            navigation: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
            listData: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
        };
        this.page = 1;
        this.pageSize = 10;
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerTitleView}>
                    <Image source={Images.icon_search} style={[CusTheme.headerIcon, styles.headerSearchIcon]} />
                    <Text style={[CusTheme.headerIconTitle, styles.headerSearchTitle]}>搜索商品</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderNavigationContentView = () => {
        let data = this.state.navigation;
        if (!data || data.length < 1) {
            return;
        }
        let navigation = data.map((item, index) => {
            return (
                <TouchableOpacity
                    key={item.id}
                    style={styles.navItemView}
                >
                    <Image source={item.icon} style={styles.navIcon}/>
                    <Text style={styles.navTitle}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
        return navigation;
    };

    renderHeaderRightView = (data) => {
        if (!data || data.length < 1) {
            return null;
        }
        return (
            <TouchableOpacity
                style={[CusTheme.headerButtonView, styles.headerRightView]}
                onPress={this.deleteConfirm}
            >
                <Text style={CusTheme.headerBtnName}>清空</Text>
            </TouchableOpacity>
        )
    };

    deleteConfirm = () => {
        const params = {
            title: '温馨提示',
            detail: '消息清空后将不可恢复，您确定要清空所有消息吗？',
            style: styles.alertContainer,
            actionStyle: styles.actionStyle,
            actions: [
                {
                    title: '确定',
                    titleStyle: styles.titleStyleCur,
                    btnStyle: [styles.btnStyle, styles.btnStyleCur],
                    onPress: () => this.emptyMessage(),
                }, {
                    title: '取消',
                    titleStyle: styles.titleStyle,
                    btnStyle: styles.btnStyle,
                    onPress: () => {}
                },
            ]
        };
        AlertManager.show(params);
    };

    loadNetData = () => {
        InteractionManager.runAfterInteractions(() => {
            this.requestDataSource(this.page);
        })
    };

    emptyMessage = async (page) => {
        const {systemStore} = this.props;
        let url = ServicesApi.emptyMessage;
        let result = await systemStore.emptyMessage(url, {});
        if (result && result.code === 1) {
            this.loadNetData();
        } else {
            ToastManager.show(result.msg);
        }
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        const {systemStore} = this.props;
        let url = ServicesApi.systemMessage;
        let data = {
            page,
            page_size: this.pageSize,
        };

        let result = await systemStore.requestDataSource(url, data);
        let endStatus = false;
        if (result && result.code === 1) {
            endStatus = result.data.list_data.length < data.page_size;
        } else {
            endStatus = true;
        }
        this.flatListRef && this.flatListRef.stopRefresh();
        this.flatListRef && this.flatListRef.stopEndReached({allLoad: endStatus});
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

    _renderEmptyComponent = () => {
        return (
            <View style={CusTheme.emptyComponentView}>
                <Image
                    style={[CusTheme.listEmptyTipsImg, styles.listEmptyTipsImg]}
                    source={Images.img_bg_empty_message}
                />
                <Text style={CusTheme.emptyText}>暂无消息通知</Text>
            </View>
        );
    };

    _renderListItem = ({item}) => {
        return (
            <MessageItem
                item={item}
                {...this.props}
            />
        );
    };

    render() {
        let {loading, listData} = this.state;
        const {systemStore} = this.props;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '消息';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    renderRightAction={this.renderHeaderRightView(systemStore.getDataSource)}
                />
                <View style={styles.content}>
                    {systemStore.loading && systemStore.dataSource.length === 0 ?
                        <SpinnerLoading isVisible={systemStore.loading} />
                        :
                        <FlatListView
                            style={styles.listContent}
                            initialRefresh={false}
                            ref={this._captureRef}
                            data={systemStore.getDataSource}
                            removeClippedSubviews={false}
                            renderItem={this._renderListItem}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this._onEndReached}
                            onRefresh={this._onRefresh}
                            ItemSeparatorComponent={this._renderSeparator}
                            ListHeaderComponent={this._renderHeaderComponent}
                            ListEmptyComponent={this._renderEmptyComponent}
                        />
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // 头部
    headerView: {
        flex: 1,
        paddingHorizontal: 15,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123'
    },
    headerLeftView: {
        left: 15,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleView: {
        flex: 1,
        height: 35,
        borderRadius: 18,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#d2d2d2',
        justifyContent: 'center',
        // backgroundColor: '#f60',
        borderWidth: CusTheme.minPixel,
    },
    headerSearchIcon: {
        marginRight: 10,
    },
    headerSearchTitle: {
        color: '#999',
        fontSize: FontSize(14),
    },
    headerTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    headerIconTitle: {
        fontSize: FontSize(11),
        color: CusTheme.themeColor,
    },
    headerRightView: {
        top: -22,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    // 顶部导航
    navContentView: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 10,
        borderColor: '#eee',
        justifyContent: 'space-between',
    },
    navItemView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        resizeMode: 'contain',
        width: ScaleSize(100),
        height: ScaleSize(100),
    },
    navTitle: {
        color: '#666',
        marginTop: 10,
        fontSize: FontSize(14),
    },

    // 内容区
    content: {
        flex: 1,
    },
    headerComponentView: {},
    // 列表区
    listContent: {
        flex: 1,
        backgroundColor: '#eee',
    },
    listEmptyTipsImg: {
        marginTop: 50,
        marginBottom: 10,
        width: SCREEN_WIDTH / 2.2,
    },

    // 弹窗区
    alertContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: SCREEN_WIDTH - 50,
        // backgroundColor: '#123'
    },
    actionStyle: {
        borderWidth: 0,
        borderColor: '#fff',
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