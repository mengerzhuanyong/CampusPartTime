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
import PayManager from '../../config/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {scaleSize} from '../../util/Tool'
import {HorizontalLine} from '../../component/common/commonLine'
import GoodsItem from "../../component/item/goodsItem";


@inject('testStore111111')
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
        };
        this.page = 0;
    }

    componentDidMount() {
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerTitleView}>
                    <Image source={Images.icon_search} style={[Theme.headerIcon, styles.headerSearchIcon]} />
                    <Text style={[Theme.headerIconTitle, styles.headerSearchTitle]}>搜索商品</Text>
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

    _captureRef = (v) => {
        this.flatList = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    // 上拉加载
    _onEndReached = () => {
        setTimeout(() => {
            let dataTemp = this.state.listData;
            let allLoad = false;
            //模拟数据加载完毕,即page > 0,
            if (this.page < 2) {
                this.setState({ data: dataTemp.concat(this.state.listData) });
            }
            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatList.stopEndReached({ allLoad: this.page === 2 });
            this.page++;
        }, 2000);
    };

    // 下拉刷新
    _onRefresh = () => {
        setTimeout(() => {
            // 调用停止刷新
            this.flatList.stopRefresh()
        }, 2000);
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
                    titleStyle={Theme.contentTitle}
                    icon={<Image source={Images.icon_shop_package} style={[Theme.contentTitleIcon, {tintColor: '#ed3126'}]} />}
                    detail={'更多 >>'}
                    accessory={'none'}
                    onPress={() => alert('Press!')}
                />
            </View>
        );
    };

    _renderListItem = (info) => {
        return (
            <GoodsItem />
        );
    };

    render() {
        let {loading, listData} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'default'}
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
        borderWidth: Theme.minPixel,
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
        color: Theme.themeColor,
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
        width: scaleSize(100),
        height: scaleSize(100),
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