/**
 * 校园空兼 - Shop
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
import SpinnerLoading from "../../component/common/SpinnerLoading";

@inject('loginStore', 'shopStore')
@observer
export default class Shop extends Component {
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
            ready: false,
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
                <TouchableOpacity
                    style={styles.headerTitleView}
                    onPress={() => RouterHelper.navigate('搜索', 'Search')}
                >
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
                    onPress={() => RouterHelper.navigate(item.title, 'GoodsList')}
                >
                    <Image source={item.icon} style={styles.navIcon}/>
                    <Text style={styles.navTitle}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
        return navigation;
    };

    loadNetData = () => {
        InteractionManager.runAfterInteractions(() => {
            // this.getResource();
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
        const {shopStore} = this.props;
        let data = {
            page,
            category_id: 0,
            page_size: this.pageSize,
        };

        let result = await shopStore.requestDataSource(ServicesApi.shoppingMall, data);
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
        return (

            <View style={styles.headerComponentView}>
                <View style={styles.navContentView}>
                    {this.renderNavigationContentView()}
                </View>
                <ListRow
                    style={styles.contentTitleView}
                    title={'热门换购'}
                    titleStyle={CusTheme.contentTitle}
                    icon={<Image source={Images.icon_shop_package} style={[CusTheme.contentTitleIcon, {tintColor: '#ed3126'}]} />}
                    detail={'更多 >>'}
                    accessory={'none'}
                    onPress={() => RouterHelper.navigate('热门换购', 'GoodsList')}
                />
            </View>
        );
    };

    _renderListItem = ({item}) => {
        return (
            <GoodsItem
                item={item}
                onPress={() => RouterHelper.navigate('商品详情', 'GoodsDetail', {item})}
                {...this.props}
            />
        );
    };

    render() {
        const {shopStore} = this.props;
        const {ready} = this.state;
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
                <View style={styles.content}>
                    {ready ?
                        <FlatListView
                            style={styles.listContent}
                            initialRefresh={false}
                            ref={this._captureRef}
                            data={shopStore.dataSource}
                            removeClippedSubviews={false}
                            renderItem={this._renderListItem}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this._onEndReached}
                            onRefresh={this._onRefresh}
                            ItemSeparatorComponent={this._renderSeparator}
                            ListHeaderComponent={this._renderHeaderComponent}
                        />
                        : <SpinnerLoading/>
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
        right: 15,
        position: 'absolute',
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
        backgroundColor: '#fff',
    },
});