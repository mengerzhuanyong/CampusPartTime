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
import BannerComponent from "../../component/common/BannerComponent";
import HotNewsComponent from "../../component/common/HotNewsComponent";
import SpinnerLoading from "../../component/common/SpinnerLoading";
import ListView from "../../component/list/ListView";
import DropDownMenu from '../../component/common/DropDownMenu';

const headerHeight = SCREEN_WIDTH * 0.459;
@inject('loginStore', 'workStore', 'resourceStore')
@observer
export default class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 2,
            ready: false,
            maskHidden: true,
        };
        this.page = 1;
        this.pageSize = 10;
        this.opacity = new Animated.Value(0);
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    startOpacityAnimated = (index) => {
        if (this.state.maskHidden) {
            this.setState({ maskHidden: false }, () => {
                this.dropDownMenu.changeBar(index)
                Animated.timing(this.opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start(() => {

                })
            })
        } else {
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                this.setState({ maskHidden: true })
            })
        }
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity
                    style={[styles.headerButtonView, styles.headerRightView]}
                >
                    <Image source={Images.icon_place} style={CusTheme.headerIcon}/>
                    <Text style={[CusTheme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                {/*<Text style={[CusTheme.headerTitle, styles.headerTitle]}>工作</Text>*/}
                <TouchableOpacity
                    style={styles.headerTitleView}
                    onPress={() => RouterHelper.navigate('搜索', 'Search', {type: 1})}
                >
                    <Image source={Images.icon_search} style={[CusTheme.headerIcon, styles.headerSearchIcon]} />
                    <Text style={[CusTheme.headerIconTitle, styles.headerSearchTitle]}>搜索兼职</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.headerButtonView, styles.headerRightView]}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
                >
                    <View style={styles.headerRightView}>
                        <Image source={Images.icon_message} style={CusTheme.headerIcon}/>
                        <View style={CusTheme.pointView}/>
                    </View>
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
        let url = ServicesApi.getResource;
        let data = {type};
        let result = await resourceStore.requestDataSource(url, data);
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
        let url = ServicesApi.job_list;
        let data = {
            page,
            sort: 2,
            position: 0,
            sort_column: 1,
            page_size: this.pageSize,
        };
        let result = await workStore.requestDataSource(url, data);
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

    _onPressItem = (index) => {
        // console.log(this.flatListRef.contentOffset)
        if (this.flatListRef.contentOffset.y < headerHeight) {
            const option = { animated: false, itemIndex: 0, sectionIndex: 0, viewOffset: 30, viewPosition: 0 }
            this.flatListRef.scrollToLocation(option)
        }
        this.startOpacityAnimated(index)
    }

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
        let {resourceStore} = this.props;
        let {banner_data, notice_data} = resourceStore.getWorkDataSource;
        return (
            <View style={styles.listHeaderComponent}>
                <BannerComponent
                    bannerData={banner_data}
                />
                <HotNewsComponent
                    noticeData={notice_data}
                />
            </View>
        );
    };

    _renderSectionHeader = (info) => {
        const section = info.section;
        // return null;
        return (
            <View style={styles.listSortBtnView}>
                <TouchableOpacity
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPressItem(0)}
                >
                    <Text style={styles.sortBtnItemName}>全部职位</Text>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity style={styles.sortBtnItemView}>
                    <Text style={styles.sortBtnItemName}>按剩余人数排序</Text>
                    <Image source={Images.icon_sort} style={styles.sortBtnIcon}/>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity style={styles.sortBtnItemView}>
                    <Text style={styles.sortBtnItemName}>按工分排序</Text>
                    <Image source={Images.icon_sort} style={styles.sortBtnIcon}/>
                </TouchableOpacity>
            </View>
        )
    };

    _renderListItem = ({item}) => {
        return (
            <JobItem
                item={item}
                onPress={() => RouterHelper.navigate('兼职详情', 'WorkDetail', {item})}
                {...this.props}
            />
        );
    };

    _renderContentComponent = (selectIndex) => {
            return (
                <View style={[styles.dropDownMenuView, {height: 100, backgroundColor: '#f00' }]}>
                    <Text style={styles.dropDownMenuContext}>第三个</Text>
                </View>
            );
    };

    contentHeight = (selectIndex) => {
        return 500;
    };

    render() {
        const {workStore} = this.props;
        const {ready, maskHidden} = this.state;
        let sectionDataSources = [
            {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
        ];
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
                {ready ?
                    <ListView
                        initialRefresh={true}
                        enableLoadMore={true}
                        ref={this._captureRef}
                        listType={'SectionList'}
                        style={styles.listContent}
                        data={sectionDataSources}
                        onRefresh={this._onRefresh}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderSectionHeader={this._renderSectionHeader}
                        ListHeaderComponent={this._renderHeaderComponent}
                    />
                    : <SpinnerLoading isVisible={true}/>
                }
                {!maskHidden ? (
                    <Animated.View
                        style={[styles.dropDownMenuContainer, { opacity: this.opacity, }]}
                    >
                        <DropDownMenu
                            ref={v => this.dropDownMenu = v}
                            style={styles.dropDownMenu}
                            onClose={this._onClose}
                            renderContentComponent={this._renderContentComponent}
                            contentHeight={this.contentHeight}
                            titleArray={[1,2,3]}
                            exData={[1,2,3]}
                        />
                    </Animated.View>
                ) : null}
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() => RouterHelper.navigate('平台分配工作', 'AutoGetWork')}
                >
                    <Image source={Images.img_platform} style={styles.btnIcon}/>
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
        justifyContent: 'space-between',
        // backgroundColor: '#123'
    },
    headerButtonView: {
        height: 35,
        minWidth: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f60',
    },
    headerLeftView: {
        // left: 15,
        // position: 'absolute',
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
    headerTitleView: {
        flex: 1,
        height: 35,
        marginHorizontal: 10,
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
        width: 15,
        height: 15,
        marginRight: 10,
    },
    headerSearchTitle: {
        color: '#999',
        fontSize: FontSize(12),
    },
    headerRightView: {
        justifyContent: 'flex-end',
        // right: 15,
        // position: 'absolute',
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
    
    // 下拉菜单
    maskContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: CusTheme.statusBarHeight + CusTheme.navBarContentHeight + ScaleSize(90),
        bottom: 0,
        backgroundColor: 'green',
    },
    dropDownMenuView: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    dropDownMenuContext: {
        color: '#fff'
    },
    dropDownMenuContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: CusTheme.statusBarHeight + CusTheme.navBarContentHeight,
        bottom: 0,
        backgroundColor: 'black',
    },
    dropDownMenu: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'red',
    }
});