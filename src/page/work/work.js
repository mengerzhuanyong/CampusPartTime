/**
 * 校园空兼 - Work
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

import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView/index'
import ImageView from '../../component/common/ImageView'
import {inject, observer} from 'mobx-react'
import {Button} from 'teaset'
import FlatListView from '../../component/common/FlatListView'
import AreaContent from '../../component/common/AreaContent'
import Container from '../../component/common/Container'
import Countdown from '../../component/common/Countdown'
import {action} from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker'
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import JobItem from "../../component/item/jobItem";
import BannerComponent from "../../component/common/BannerComponent";
import HotNewsComponent from "../../component/common/HotNewsComponent";


@inject('loginStore', 'workStore', 'resourceStore')
@observer
export default class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 2,
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

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerLeftView}>
                    <Image source={Images.icon_place} style={CusTheme.headerIcon} />
                    <Text style={[CusTheme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                <Text style={[CusTheme.headerTitle, styles.headerTitle]}>工作</Text>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => this.onPushToNextPage('消息', 'SystemMessage')}
                >
                    <Image source={Images.icon_message} style={CusTheme.headerIcon}/>
                    <View style={CusTheme.pointView} />
                </TouchableOpacity>
            </View>
        );
    };

    loadNetData = () => {
        InteractionManager.runAfterInteractions(() => {
            this.getResource();
            this.requestDataSource(this.page);
        })
    };

    getResource = async () => {
        let {type} = this.state;
        const {resourceStore} = this.props;
        let data = await resourceStore.requestDataSource(ServicesApi.getResource, {type});
        // console.warn(data);
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        const {workStore} = this.props;
        let data = {
            page,
            sort: 2,
            position: 0,
            sort_column: 1,
            page_size: this.pageSize,
        };

        let result = await workStore.requestDataSource(ServicesApi.jobs, data);
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
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderHeaderComponent = () => {
        let {resourceStore} = this.props;
        let {banner_data, notice_data} = resourceStore.getDataSource;
        return (
            <View style={styles.listHeaderComponent}>
                <BannerComponent
                    bannerData={banner_data}
                />
                <HotNewsComponent
                    noticeData={notice_data}
                />
                <View style={styles.listSortBtnView}>
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>全部职位</Text>
                    </TouchableOpacity>
                    <VerticalLine lineStyle={styles.sortVerLine} />
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>按剩余人数排序</Text>
                        <Image source={Images.icon_sort} style={styles.sortBtnIcon} />
                    </TouchableOpacity>
                    <VerticalLine lineStyle={styles.sortVerLine} />
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>按工分排序</Text>
                        <Image source={Images.icon_sort} style={styles.sortBtnIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    _renderListItem = ({item}) => {
        return (
            <JobItem
                item={item}
                onPress={() => this.onPushToNextPage('兼职详情', 'WorkDetail', {item})}
                {...this.props}
            />
        );
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />
    };

    render() {
        const {workStore} = this.props;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'default'}
                    leftView={null}
                    backgroundImage={null}
                />
                <FlatListView
                    style={styles.listContent}
                    initialRefresh={false}
                    ref={this._captureRef}
                    removeClippedSubviews={false}
                    data={workStore.dataSource}
                    renderItem={this._renderListItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderHeaderComponent}
                />
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() => this.onPushToNextPage('平台分配工作', 'AutoGetWork')}
                >
                    <Image source={Images.img_platform} style={styles.btnIcon} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
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
    headerTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    headerIconTitle: {
        fontSize: FontSize(11),
        color: CusTheme.themeColor,
    },
    headerRightView: {
        right: 15,
        position: 'absolute',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    listContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listHeaderComponent: {
        backgroundColor: '#f8f8f8',
    },
    horLine: {
        marginVertical: 5,
        backgroundColor: '#d9d9d9',
    },

    listSortBtnView: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: ScaleSize(90),
        paddingHorizontal: 15,
        borderColor: '#eef0f2',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomWidth: CusTheme.minPixel,
    },
    sortVerLine: {
        height: 20,
        backgroundColor: '#d9d9d9',
    },
    sortBtnItemView: {
        // flex: 1,
        height: 55,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f60',
    },
    sortBtnItemName: {
        color: '#666',
        fontSize: FontSize(12),
    },
    imageContainer: {
        alignItems: 'center',
        width: ScaleSize(25),
        height: ScaleSize(25),
        justifyContent: 'center',
    },
    sortBtnIcon: {
        marginLeft: 5,
        height: ScaleSize(25),
        resizeMode: 'contain',
    },
    btnView: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    btnIcon: {
        width: ScaleSize(110),
        height: ScaleSize(110),
        resizeMode: 'contain',
    },
});