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
import Location from "../../component/location/location";

const headerHeight = 172;
@inject('loginStore', 'workStore', 'resourceStore', 'homeStore')
@observer
export default class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 2,
            ready: false,
            maskHidden: true,
            sortPosition: '职位',
            sortPositionId: 0,
            sortType: '', // 1: need_count 2: price 3: ''
            sortOrderType: 1,
            sortArea: '黄岛区',
            location: ['山东', '青岛', '黄岛区'],
        };
        this.page = 1;
        this.pageSize = 10;
        this.opacity = new Animated.Value(0);
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2, this.timer3, this.timer4, this.timer5];
        ClearTimer(timers);
    }

    startOpacityAnimated = (index) => {
        if (this.state.maskHidden) {
            this.setState({ maskHidden: false }, () => {
                this.dropDownMenu.changeBar(index);
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

    renderNavigationBarView = (status) => {
        return (
            <View style={styles.headerView}>
                <Location
                    style={styles.headerLeftView}
                    titleStyle={styles.headerIconTitle}
                />
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
                        {status === 1 && <View style={CusTheme.pointView} />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    loadNetData = () => {
        InteractionManager.runAfterInteractions(() => {
            this.getResource();
            this.getWorkCategory();
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

    getWorkCategory = async () => {
        const {resourceStore} = this.props;
        let url = ServicesApi.getCategory;
        let data = {
            type: 1,
        };
        let result = await resourceStore.getWorkCategory(url, data);
        // console.warn(result);
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        let {sortArea, location, sortPositionId, sortType, sortOrderType} = this.state;
        const {workStore} = this.props;
        let url = ServicesApi.job_list;
        let data = {
            page,
            location,
            sort: sortType,
            position: sortPositionId,
            sort_column: sortOrderType,
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

    _onClose = () => {
        this.timer5 = setTimeout(() => {
            this.setState({maskHidden: true});
        }, 500);
    };

    _onPressItem = (index) => {
        // console.log(this.flatListRef.contentOffset)
        if (this.flatListRef.contentOffset.y < headerHeight) {
            const option = {animated: false, itemIndex: 0, sectionIndex: 0, viewOffset: 40, viewPosition: 0};
            this.flatListRef.scrollToLocation(option);
        }
        this.startOpacityAnimated(index);
    };

    pickerArea = () => {
        this.setState({maskHidden: true});
        ActionsManager.showArea((info) => {
            console.log(info);
            this.setState({
                location: info,
                sortArea: info[2],
            }, () => this._onRefresh());
        });
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
                {/*<HorizontalLine lineStyle={styles.sortHorLine} />*/}
            </View>
        );
    };

    _renderSectionHeader = ({section}) => {
        let {sortArea, sortPosition, sortPositionId, sortType, sortOrderType,} = this.state;
        return (
            <View style={styles.listSortBtnView}>
                <TouchableOpacity
                    style={[styles.sortBtnItemView, styles.sortBtnItemOne]}
                    onPress={this.pickerArea}
                >
                    <Text style={styles.sortBtnItemName} numberOfLines={1}>{sortArea}</Text>
                    <Image source={Images.icon_arrow_down} style={styles.sortBtnIcon}/>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={[styles.sortBtnItemView, styles.sortBtnItemOne]}
                    onPress={() => this._onPressItem(0)}
                >
                    <Text style={styles.sortBtnItemName} numberOfLines={1}>{sortPosition}</Text>
                    <Image source={Images.icon_arrow_down} style={styles.sortBtnIcon}/>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={[styles.sortBtnItemView, styles.sortBtnItemTwo]}
                    onPress={() => {
                        let _sortOrderType = sortOrderType === 1 ? 2 : 1;
                        this.setState({
                            sortType: 'need_count',
                            sortOrderType: _sortOrderType,
                            maskHidden: true,
                        }, () => this._onRefresh());
                    }}
                >
                    <Text style={styles.sortBtnItemName} numberOfLines={1}>人数</Text>
                    <Image source={Images.icon_sort} style={styles.sortBtnIcon}/>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={[styles.sortBtnItemView, styles.sortBtnItemThree]}
                    onPress={() => {
                        let _sortOrderType = sortOrderType === 1 ? 2 : 1;
                        this.setState({
                            sortType: 'price',
                            sortOrderType: _sortOrderType,
                            maskHidden: true,
                        }, () => this._onRefresh());
                    }}
                >
                    <Text style={styles.sortBtnItemName} numberOfLines={1}>工分</Text>
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
        let {sortPosition, sortPositionId} = this.state;
        const {resourceStore} = this.props;
        let {workNavigation} = resourceStore;
        if (selectIndex !== 0 || !workNavigation || workNavigation.length < 1) {
            return null;
        }
        let itemView = workNavigation.map((item, index) => {
            let selected = -1;
            if (sortPositionId === 0) {
                selected = -1;
            } else {
                let id = parseInt(item.id);
                selected = sortPositionId.findIndex((i) => i === id);
            }
            return (
                <Button
                    key={item.id}
                    title={item.name}
                    style={[styles.positionBtnView, selected !== -1 && styles.positionBtnViewCur]}
                    titleStyle={[styles.positionTitleStyle, selected !== -1 && styles.positionTitleStyleCur]}
                    onPress={() => {
                        this.onPressFilterItem(item);
                    }}
                />
            )
        })
        return (
            <View style={[styles.dropDownMenuView,]}>
                <ScrollView style={[styles.dropDownMenuScrollView]}>
                <View style={[styles.dropDownMenuContent,]}>
                    <Button
                        title={'全部'}
                        style={[styles.positionBtnView, sortPositionId === 0 && styles.positionBtnViewCur]}
                        titleStyle={[styles.positionTitleStyle, sortPositionId === 0 && styles.positionTitleStyleCur]}
                        onPress={() => {
                            let all = {
                                id: 0,
                                name: '职位',
                            };
                            this.onPressFilterItem(all);
                        }}
                    />
                    {itemView}
                </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Button
                        title={'重置'}
                        style={styles.button}
                        onPress={this.onResetFilterPosition}
                        titleStyle={styles.buttonTitle}
                    />
                    <Button
                        title={'确定'}
                        style={styles.button}
                        onPress={this.onSubmitFilterPosition}
                        titleStyle={styles.buttonTitle}
                    />
                </View>
            </View>
        );
    };

    onPressFilterItem = (item) => {
        let {sortPositionId, sortPosition} = this.state;
        if (item.id === 0) {
            this.setState({
                sortPosition: '职位',
                sortPositionId: 0,
                // maskHidden: true,
            });
        } else {
            sortPositionId = sortPositionId === 0 ? [] : sortPositionId;
            let newSortArray = sortPositionId.slice();
            let id = parseInt(item.id);
            let index = newSortArray.findIndex((i) => i === id);
            console.log('index---->', index);
            if (index === -1) {
                newSortArray.push(id);
            } else {
                newSortArray.splice(index, 1);
            }
            console.log(newSortArray);
            sortPosition = '职位(' + newSortArray.length + ')';
            this.setState({
                sortPosition,
                sortPositionId: newSortArray,
                // maskHidden: true,
            });
        }
    }

    onResetFilterPosition = () => {
        this.setState({
            sortPosition: '职位',
            sortPositionId: 0,
            // maskHidden: true,
        });
    };

    onSubmitFilterPosition = () => {
        this.setState({
            maskHidden: true,
        });
        this._onRefresh();
    };

    contentHeight = (selectIndex) => {
        return 200;
    };

    render() {
        const {workStore, resourceStore, homeStore} = this.props;
        let {getWorkDataSource} = resourceStore;
        const {ready, maskHidden} = this.state;
        console.log('workStore.dataSource----->',workStore.getDataSource);
        let sectionDataSources = [
            {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
            // {title: 'sectionTitle', data: workStore.dataSource},
        ];
        // if (!workStore.getDataSource || workStore.getDataSource.length < 1) {
        //     sectionDataSources = [];
        // }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView(homeStore.has_message)}
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
                        contentContainerStyle={styles.listContainerStyle}
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
                            titleArray={['职位']}
                            exData={['1']}
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
        paddingRight: 15,
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
        left: 15,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
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
        marginLeft: 75,
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
        // paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    listContainerStyle: {
        minHeight: __IOS__ ? 100 : SCREEN_HEIGHT + SCREEN_WIDTH * 0.452,
    },
    listHeaderComponent: {
        borderBottomWidth: 10,
        borderColor: '#e5e5e5',
        backgroundColor: '#123',
    },
    horLine: {
        marginVertical: 5,
        backgroundColor: '#d9d9d9',
    },
    sortHorLine: {
        height: 10,
        backgroundColor: '#e5e5e5',
    },
    listSortBtnView: {
        flex: 1,
        // marginTop: 10,
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
        flex: 1,
        height: 55,
        // overflow: 'hidden',
        // paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f60',
    },
    sortBtnItemOne: {},
    sortBtnItemTwo: {
        // flex: 2,
    },
    sortBtnItemThree: {
        // flex: 1.5,
    },
    sortBtnItemName: {
        // flex: 1,
        color: '#666',
        fontSize: FontSize(13),
    },
    imageContainer: {
        alignItems: 'center',
        width: ScaleSize(24),
        height: ScaleSize(24),
        justifyContent: 'center',
    },
    sortBtnIcon: {
        marginLeft: 3,
        height: ScaleSize(24),
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
    dropDownMenuView: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    dropDownMenuScrollView: {
        // paddingVertical: 8,
    },
    dropDownMenuContent: {
        marginVertical: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    dropDownMenuContext: {
        color: '#fff'
    },
    dropDownMenuContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: CusTheme.statusBarHeight + CusTheme.navBarContentHeight + ScaleSize(90) - 1,
    },
    dropDownMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    positionBtnView: {
        height: 30,
        borderRadius: 4,
        marginVertical: 3,
        marginHorizontal: 8,
        borderColor: '#999',
        borderWidth: CusTheme.minPixel,
    },
    positionBtnViewCur: {
        borderColor: CusTheme.themeColor,
        backgroundColor: CusTheme.themeColor,
    },
    positionTitleStyle: {
        color: '#999',
        fontSize: FontSize(12),
    },
    positionTitleStyleCur: {
        color: '#fff',
    },
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: ScaleSize(40),
        marginTop: 10,
    },
    button: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0,
        backgroundColor: CusTheme.themeColor,
        height: 30,
        marginHorizontal: ScaleSize(15),
    },
    buttonTitle: {
        fontSize: FontSize(14),
        color: "#fff",
    },
});