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

import NavigationBar from '../../component/navigation/NavigationBar'
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



export default class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [1,2,3],
        };
        this.page = 0
    }

    async componentDidMount() {
        let url = ServicesApi.index;
        let data = {
            id: 1,
        };
        let result = await Services.post(url, data, true, 'index');
        // console.log(result);
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    renderNavigationBarView = () => {
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
                        placeholder={'搜索兼职 / 商品'}
                        // secureTextEntry={true}
                        placeholderTextColor={'#999'}
                        returnKeyType={'done'}
                        clearButtonMode='while-editing'
                        onChangeText={() => {

                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
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

    _renderHeaderComponent = () => {
        return (
            <View style={styles.listHeaderComponent}>
            </View>
        );
    };

    _renderListItem = ({item}) => {
        return (
            <JobItem />
        );
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />
    };

    render() {
        let {loading, listData} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={null}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'dark-content'}
                    renderLeftAction={null}
                    backgroundImage={null}
                />
                {this.renderNavigationBarView()}
                <View style={styles.content}>
                    <View style={styles.searchTipsView}>
                        <View style={styles.searchTipsItemView}>
                            <View style={styles.searchTipsTitleView}>
                                <Text style={styles.searchTipsTitle}>热门搜索</Text>
                            </View>
                            <View style={styles.searchTipsContent}>
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                            </View>
                        </View>
                        <View style={styles.searchTipsItemView}>
                            <View style={styles.searchTipsTitleView}>
                                <Text style={styles.searchTipsTitle}>搜索历史</Text>
                                <TouchableOpacity style={styles.searchTipsTitleRightView}>
                                    <Image source={Images.icon_trash} style={[CusTheme.contentRightIcon, styles.searchTipsIcon]} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchTipsContent}>
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                                <Button
                                    title={'手机'}
                                    style={styles.searchTipsConItem}
                                    titleStyle={styles.searchTipsConItemName}
                                />
                            </View>
                        </View>
                    </View>
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={false}
                        ref={this._captureRef}
                        removeClippedSubviews={false}
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

const headBackImageW = SCREEN_WIDTH - ScaleSize(14) * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerView: {
        flex: 1,
        top: 20,
        zIndex: 999,
        position: 'absolute',
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
        width: ScaleSize(55),
        height: ScaleSize(55),
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

    listContent: {
        flex: 1,
        backgroundColor: '#eee',
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