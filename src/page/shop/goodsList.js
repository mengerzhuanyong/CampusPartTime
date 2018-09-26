/**
 * 校园空兼 - GoodsList
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
import SpinnerLoading from "../../component/common/SpinnerLoading";

@inject('loginStore', 'shopStore')
@observer
export default class GoodsList extends Component {
    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            loading: false,
            ready: false,
            category_id: params && params.category_id ? params.category_id : 0,
        };
        this.page = 1;
        this.pageSize = 10;
    }

    static defaultProps = {
        category_id: 0,
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // this.getResource();
            this.requestDataSource(this.page);
        });
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        // console.log(global.ClearTimer);
        ClearTimer(timers);
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity
                    style={styles.headerTitleView}
                    onPress={() => RouterHelper.navigate('搜索', 'Search')}
                >
                    <Image source={Images.icon_search} style={[CusTheme.headerIcon, styles.headerSearchIcon]}/>
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
                    <Image source={item.icon ? {uri: item.icon} : Image.icon_camera} style={styles.navIcon}/>
                    <Text style={styles.navTitle}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
        return navigation;
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        const {shopStore} = this.props;
        let {category_id} = this.state;
        let url = ServicesApi.work_goods_list;
        let data = {
            page,
            category_id,
            page_size: this.pageSize,
        };

        let result = await shopStore.requestGoodsList(url, data);
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
        return <HorizontalLine lineStyle={styles.horLine}/>;
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
                    icon={<Image source={Images.icon_shop_package}
                                 style={[CusTheme.contentTitleIcon, {tintColor: '#ed3126'}]}/>}
                    detail={'更多 >>'}
                    accessory={'none'}
                    onPress={() => alert('Press!')}
                />
            </View>
        );
    };

    _renderListItem = ({item, index}) => {
        return (
            <GoodsItem
                item={item}
                onPress={() => RouterHelper.navigate(item.name, 'GoodsDetail', {item})}
                {...this.props}
            />
        );
    };

    render() {
        let {loading, ready} = this.state;
        const {shopStore} = this.props;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '商品';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    {ready ?
                        <FlatListView
                            style={styles.listContent}
                            initialRefresh={false}
                            ref={this._captureRef}
                            data={shopStore.goodsList}
                            removeClippedSubviews={false}
                            renderItem={this._renderListItem}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this._onEndReached}
                            onRefresh={this._onRefresh}
                            ItemSeparatorComponent={this._renderSeparator}
                            // ListHeaderComponent={this._renderHeaderComponent}
                        />
                        : <SpinnerLoading isVisible={true}/>
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