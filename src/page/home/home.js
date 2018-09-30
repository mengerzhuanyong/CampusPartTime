/**
 * 校园空兼 - Home
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
    RefreshControl,
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
import Container from '../../component/common/Container'
import Countdown from '../../component/common/Countdown'
import SyanImagePicker from 'react-native-syan-image-picker'
import ImagePicker from 'react-native-image-picker'
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import JobItem from "../../component/item/jobItem"
import HomeGoodsItem from "../../component/item/homeGoodsItem"
import BannerComponent from "../../component/common/BannerComponent"
import HotNewsComponent from "../../component/common/HotNewsComponent"
import SpinnerLoading from "../../component/common/SpinnerLoading";
import Location from "../../component/location/location";

@inject('loginStore', 'homeStore', 'resourceStore')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            type: 1,
        };
        this.page = 1;
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount() {
        let timers = [this.timer1];
        ClearTimer(timers);
    }

    loadNetData = () => {
        this.requestDataSource();
        this.getResource();
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.loadNetData();
        this.timer1 = setTimeout(() => {
            this.setState({refreshing: false});
        }, 1000);
    };

    requestDataSource = async () => {
        const {homeStore} = this.props;
        let url = ServicesApi.index;
        let data = {};
        let result = await homeStore.requestDataSource(url, data);
    };

    getResource = async () => {
        let {type} = this.state;
        const {resourceStore} = this.props;
        let url = ServicesApi.getResource;
        let data = {type};
        let result = await resourceStore.requestDataSource(url, data);
        // console.warn(data);
    };

    renderNavigationBarView = (status) => {
        return (
            <View style={styles.headerView}>
                <Location
                    style={styles.headerLeftView}
                    // iconStyle={}
                    titleStyle={styles.headerIconTitle}
                />
                <Text style={[CusTheme.headerTitle, styles.headerTitle]}>首页</Text>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
                >
                    <Image source={Images.icon_message} style={CusTheme.headerIcon}/>
                    {status === 1 && <View style={CusTheme.pointView} />}
                </TouchableOpacity>
            </View>
        );
    };

    renderListView = (type, data) => {
        if (!data || data.length < 1) {
            return;
        }
        let listView = null;
        if (type === 1) {
            listView = data.map((item, index) => {
                return <HomeGoodsItem
                    item={item}
                    onPress={() => RouterHelper.navigate(item.name, 'GoodsDetail', {item})}
                    key={'goods' + index}
                    {...this.props}
                />;
            });
        }
        if (type === 2) {
            listView = data.map((item, index) => {
                return <JobItem
                    item={item}
                    onPress={() => RouterHelper.navigate('兼职详情', 'WorkDetail', {item})}
                    key={'job' + index}
                    {...this.props}
                />;
            });
        }
        if (type === 3) {
            listView = data.map((item, index) => {
                return <HomeGoodsItem
                    item={item}
                    onPress={() => RouterHelper.navigate(item.name, 'PointGoodsDetail', {item})}
                    key={'goods' + index}
                    {...this.props}
                />;
            });
        }
        return listView;
    };

    render() {
        let {loading, refreshing} = this.state;
        let {homeStore, resourceStore} = this.props;
        let {hot_goods, hot_jobs, hot_point_goods} = homeStore.getDataSource;
        let {banner_data, notice_data, has_message} = resourceStore.getHomeDataSource;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView(has_message)}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'dark-content'}
                    renderLeftAction={null}
                    backgroundImage={null}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            title='Loading...'
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            tintColor="#0398ff"
                            colors={['#0398ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                >
                    <View style={styles.contentTopView}>
                        <BannerComponent
                            bannerData={banner_data}
                            {...this.props}
                        />
                        <HotNewsComponent
                            noticeData={notice_data}
                            {...this.props}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentItemView}>
                            <ListRow
                                style={styles.contentTitleView}
                                title={'热门换购'}
                                titleStyle={CusTheme.contentTitle}
                                icon={<Image source={Images.icon_shop_package}
                                             style={[CusTheme.contentTitleIcon, {tintColor: '#ed3126'}]}/>}
                                detail={'更多 >>'}
                                accessory={'none'}
                                onPress={() => RouterHelper.navigate('热门换购', 'Shop')}
                            />
                            <View style={[styles.contentItemConView, styles.contentExchangeShopView]}>
                                <ScrollView style={styles.listRowContent} horizontal={true}>
                                    {this.renderListView(1, hot_goods)}
                                </ScrollView>
                                <View style={styles.contentRightIconView}>
                                    <Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>
                                </View>
                            </View>
                        </View>
                        {hot_jobs && hot_jobs.length > 0 && <View style={styles.contentItemView}>
                            <ListRow
                                style={styles.contentTitleView}
                                title={'热门工作推荐'}
                                titleStyle={CusTheme.contentTitle}
                                icon={<Image source={Images.icon_category}
                                             style={[CusTheme.contentTitleIcon, {tintColor: '#2f91eb'}]}/>}
                                detail={'更多 >>'}
                                accessory={'none'}
                                onPress={() => RouterHelper.navigate('热门工作推荐', 'Work')}
                            />
                            <View style={styles.contentItemConView}>
                                {this.renderListView(2, hot_jobs)}
                            </View>
                        </View>}
                        <View style={styles.contentItemView}>
                            <ListRow
                                style={styles.contentTitleView}
                                title={'积分兑换热榜'}
                                titleStyle={CusTheme.contentTitle}
                                icon={<Image source={Images.icon_points}
                                             style={[CusTheme.contentTitleIcon, {tintColor: '#ffb04a'}]}/>}
                                detail={'更多 >>'}
                                accessory={'none'}
                                onPress={() => RouterHelper.navigate('积分商城', 'PointShop')}
                            />
                            <View style={[styles.contentItemConView, styles.contentExchangeShopView]}>
                                <ScrollView style={styles.listRowContent} horizontal={true}>
                                    {this.renderListView(3, hot_point_goods)}
                                </ScrollView>
                                <View style={styles.contentRightIconView}>
                                    <Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        // height: 40,
        position: 'absolute',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    contentTopView: {
        backgroundColor: '#fff',
    },

    contentItemView: {
        marginTop: 10,
    },
    contentTitleView: {
        height: 60,
        alignItems: 'center',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: FontSize(14),
    },
    contentItemConView: {
        padding: 15,
        backgroundColor: '#fff',
    },
    contentExchangeShopView: {
        paddingRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listRowContent: {
        flex: 1,
    },


    contentRightIconView: {
        width: ScaleSize(35),
        alignItems: 'center',
    },
    arrowIcon: {
        // width: ScaleSize(20),
        height: ScaleSize(40),
        resizeMode: 'contain',
    },

    jobItemView: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobItemPicView: {
        width: 80,
        height: 70,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    jobItemPic: {
        width: 80,
        height: 70,
        resizeMode: 'contain',
    },
    jobInfoView: {
        flex: 1,
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    jobInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobInfoTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    jobInfoTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    jobInfoIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },
    jobInfoTagsView: {
        marginLeft: 10,
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
    jobInfoLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f60',
    },
    jobInfoPrice: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    jobInfoContext: {
        color: '#999',
        marginLeft: 5,
        fontSize: FontSize(12),
    },
});