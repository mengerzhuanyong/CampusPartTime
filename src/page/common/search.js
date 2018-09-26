/**
 * 校园空兼 - Search
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
import Container from '../../component/common/Container'
import Countdown from '../../component/common/Countdown'
import SyanImagePicker from 'react-native-syan-image-picker'
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import JobItem from "../../component/item/jobItem";
import GoodsItem from "../../component/item/goodsItem";
import SpinnerLoading from "../../component/common/SpinnerLoading";

@inject('searchStore', 'workStore', 'shopStore')
@observer
export default class Search extends Component {
    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            firstLoading: true,
            loading: false,
            listData: [1,2,3],
            keyword: '',
            type: params && params.type ? params.type : 1,
            ready: false,
        };
        this.page = 1;
        this.pageSize = 10;
    }

    componentDidMount() {
        this.requestHotKeywords();
        this.loadSearchHistory();
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2, this.timer3];
        ClearTimer(timers);
    }

    requestHotKeywords = async () => {
        let {type} = this.state;
        const {searchStore} = this.props;
        let url = ServicesApi.hot_keywords;
        let data = {type};
        let result = await searchStore.requestHotKeywords(url, data);
    };

    loadSearchHistory = async () => {
        let {type} = this.state;
        const {searchStore} = this.props;
        let result = await searchStore.onLoadKeyWords(type);
    };

    submitSearch = async (keyword, page = this.page) => {
        let {type} = this.state;
        const {searchStore, workStore, shopStore} = this.props;
        if (keyword === '') {
            ToastManager.show('关键词不能为空，请重新输入');
            return;
        }
        this.setState({
            firstLoading: false,
        });
        let keyResult = await searchStore.onSaveKeyWords(type, keyword);
        let url = ServicesApi.job_search_list;
        let data = {
            page,
            category_id: 0,
            keywords: keyword,
            page_size: this.pageSize,
        };
        let result = {};
        switch (type) {
            case 1:
                url = ServicesApi.job_search_list;
                result = await searchStore.requestDataSource(type, url, data);
                break;
            case 2:
                url = ServicesApi.work_goods_list;
                result = await searchStore.requestDataSource(type, url, data);
                break;
            case 3:
                url = ServicesApi.point_goods_list;
                result = await searchStore.requestDataSource(type, url, data);
                break;
            default:
                url = ServicesApi.job_search_list;
                result = await searchStore.requestDataSource(type, url, data);
                break;
        }
        let endStatus = false;
        if (result && result.code === 1) {
            endStatus = result.data.list_data.length < data.page_size;
        } else {
            endStatus = true;
        }
        this.timer3 = setTimeout(() => {
            this.setState({
                ready: true
            });
        }, 600);
        this.flatListRef && this.flatListRef.stopRefresh();
        this.flatListRef && this.flatListRef.stopEndReached({allLoad: endStatus});

    };

    clearLocalKeyword = async () => {
        let {type} = this.state;
        const {searchStore} = this.props;
        let result = await searchStore.onClearKeyWords(type);
    };

    renderNavigationBarView = () => {
        let {keyword, type} = this.state;
        return (
            <View style={styles.headerView}>
                <TouchableOpacity
                    style={styles.headerLeftView}
                    onPress={() => RouterHelper.goBack()}
                >
                    <Image source={Images.icon_nav_left} style={styles.headerLeftIcon} />
                </TouchableOpacity>
                <View style={styles.headerSearchView}>
                    <Image source={Images.icon_search} style={styles.headerSearchIcon} />
                    <TextInput
                        style={styles.headerSearchInput}
                        ref={v => this.input = v}
                        underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                        placeholder={type === 1 ? '搜索兼职' : '搜索商品'}
                        // secureTextEntry={true}
                        placeholderTextColor={'#999'}
                        returnKeyType={'search'}
                        clearButtonMode='while-editing'
                        onChangeText={(text) => {
                            this.setState({
                                keyword: text
                            });
                        }}
                        onSubmitEditing={() => this.submitSearch(keyword)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => this.submitSearch(keyword)}
                >
                    <Text style={[CusTheme.headerBtnName, styles.headerBtnName]}>搜索</Text>
                </TouchableOpacity>
            </View>
        );
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    _onRefresh = (stopRefresh) => {
        let {keyword} = this.state;
        this.page = 1;
        this.submitSearch(keyword, this.page);
    };

    _onEndReached = (stopEndReached) => {
        let {keyword} = this.state;
        this.page++;
        this.submitSearch(keyword, this.page);
    };

    _renderHeaderComponent = () => {
        return (
            <View style={styles.listHeaderComponent}>
            </View>
        );
    };

    _renderListItem = ({item}) => {
        let {type} = this.state;
        let itemView = null;
        switch (type) {
            case 1:
                itemView = <JobItem
                    item={item}
                    onPress={() => RouterHelper.navigate('兼职详情', 'WorkDetail', {item})}
                    {...this.props}
                />;
                break;
            case 2:
                itemView = <GoodsItem
                    item={item}
                    onPress={() => RouterHelper.navigate('商品详情', 'GoodsDetail', {item})}
                    {...this.props}
                />;
                break;
            case 3:
                itemView = <GoodsItem
                    item={item}
                    onPress={() => RouterHelper.navigate('商品详情', 'GoodsDetail', {item})}
                    {...this.props}
                />;
                break;
            default:
                itemView = <JobItem
                    item={item}
                    onPress={() => RouterHelper.navigate('兼职详情', 'WorkDetail', {item})}
                    {...this.props}
                />;
                break;
        }
        return itemView;
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />
    };

    renderSearchKeywords = (data) => {
        console.log(data);
        if (!data || data.length < 1) {
            return null;
        }
        let contents = data.map((item, index) => {
            return (
                <Button
                    key={index}
                    title={item}
                    style={styles.searchTipsConItem}
                    titleStyle={styles.searchTipsConItemName}
                    onPress={() => this.submitSearch(item)}
                />
            )
        });
        return contents;
    };

    render() {
        let {loading, firstLoading, ready, listData, type} = this.state;
        const {searchStore, workStore, shopStore} = this.props;
        let {getHotKeywords, getWorkSearchKeys, getShopSearchKeys,
            getPointSearchKeys, getWorkDataSource, getShopDataSource, getPointDataSource} = searchStore;
        let localKeywords = [];
        let dataSource = [];
        switch(type) {
            case 1:
                localKeywords = getWorkSearchKeys;
                dataSource = getWorkDataSource;
                break;
            case 2:
                localKeywords = getShopSearchKeys;
                dataSource = getShopDataSource;
                break;
            case 3:
                localKeywords = getPointSearchKeys;
                dataSource = getPointDataSource;
                break;
            default:
                localKeywords = getWorkSearchKeys;
                dataSource = getWorkDataSource;
                break;
        }
        console.log(getWorkSearchKeys, getShopSearchKeys, getPointSearchKeys, dataSource);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'dark-content'}
                    renderLeftAction={null}
                    backgroundImage={null}
                />
                <View style={styles.content}>
                    {firstLoading ?
                        <View style={[styles.searchTipsView, ]}>
                            <View style={styles.searchTipsItemView}>
                                <View style={styles.searchTipsTitleView}>
                                    <Text style={styles.searchTipsTitle}>热门搜索</Text>
                                </View>
                                <View style={styles.searchTipsContent}>
                                    {this.renderSearchKeywords(getHotKeywords)}
                                </View>
                            </View>
                            <View style={styles.searchTipsItemView}>
                                {localKeywords && localKeywords.length > 0 && <View style={styles.searchTipsTitleView}>
                                    <Text style={styles.searchTipsTitle}>搜索历史</Text>
                                    <TouchableOpacity
                                        style={styles.searchTipsTitleRightView}
                                        onPress={this.clearLocalKeyword}
                                    >
                                        <Image source={Images.icon_trash} style={[CusTheme.contentRightIcon, styles.searchTipsIcon]} />
                                    </TouchableOpacity>
                                </View>}
                                <View style={styles.searchTipsContent}>
                                    {this.renderSearchKeywords(localKeywords)}
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.listContentView}>
                            {ready ?
                                <FlatListView
                                    style={[styles.listContent, ]}
                                    initialRefresh={false}
                                    ref={this._captureRef}
                                    removeClippedSubviews={false}
                                    data={dataSource}
                                    renderItem={this._renderListItem}
                                    keyExtractor={this._keyExtractor}
                                    onEndReached={this._onEndReached}
                                    onRefresh={this._onRefresh}
                                    ItemSeparatorComponent={this._renderSeparator}
                                    ListHeaderComponent={this._renderHeaderComponent}
                                />
                                : <SpinnerLoading isVisible={true}/>
                            }
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const headBackImageW = SCREEN_WIDTH - ScaleSize(14) * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
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
        left: 4,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLeftIcon: {
        tintColor: '#333',
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    headerSearchView: {
        flex: 1,
        height: 35,
        borderRadius: 35,
        marginLeft: 35,
        marginRight: 50,
        paddingHorizontal: 15,
        borderWidth: CusTheme.minPixel,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        // backgroundColor: '#333',
        justifyContent: 'flex-start',
    },
    headerSearchIcon: {
        marginRight: 10,
        width: ScaleSize(34),
        height: ScaleSize(34),
        resizeMode: 'contain',
    },
    headerSearchInput: {
        flex: 1,
        color: '#333',
        fontSize: FontSize(12),
        // backgroundColor: '#b20',
        height: 45,
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
    headerBtnName: {
        color: '#333',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    content: {
        flex: 1,
    },

    searchTipsView: {
        padding: 15,
    },
    searchTipsItemView: {
        marginBottom: 30,
    },
    searchTipsTitleView: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchTipsTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    searchTipsTitleRightView: {},
    searchTipsIcon: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        resizeMode: 'contain',
    },
    searchTipsContent: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchTipsConItem: {
        margin: 5,
        borderWidth: 0,
    },
    searchTipsConItemName: {
        color: '#555',
        fontSize: FontSize(12),
    },

    listContentView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listHeaderComponent: {},
    horLine: {
        marginVertical: 5,
        backgroundColor: '#d9d9d9',
    },
    noticeContainer: {
        flex: 1,
        height: ScaleSize(35),
        marginLeft: ScaleSize(20),
        marginVertical: ScaleSize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselControlView: {
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    carouselControl: {
        width: ScaleSize(25),
        height: ScaleSize(10),
        marginRight: 5,
        borderRadius: ScaleSize(8),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    carouselControlCur: {
        backgroundColor: '#fff',
    },
    noticeIcon: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        resizeMode: 'contain',
    },
    noticeContext: {
        color: '#f4954e',
        fontSize: FontSize(12),
    },
    contentTopView: {
        backgroundColor: '#fff',
    },
    headBackCarousel: {
        width: headBackImageW,
        height: headBackImageW * 0.485,
        marginTop: ScaleSize(12),
        marginLeft: ScaleSize(14),
        borderRadius: ScaleSize(10),
        overflow: 'hidden',
    },
    headBackImage: {
        width: headBackImageW,
        height: headBackImageW * 0.485,
    },

    listSortBtnView: {
        marginVertical: 10,
        // padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#eee',
        borderBottomColor: '#d9d9d9',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderTopWidth: 10,
        borderBottomWidth: CusTheme.minPixel,
    },
    sortVerLine: {
        height: 20,
        backgroundColor: '#d9d9d9',
    },
    sortBtnItemView: {
        flex: 1,
        height: 55,
        // backgroundColor: '#123',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBtnItemName: {
        color: '#666',
        fontSize: FontSize(12),
    },
    sortBtnIcon: {
        marginLeft: 5,
        height: ScaleSize(30),
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