/**
 * 校园空兼 - PointShop
 * http://menger.me
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
import PointGoodsItem from "../../component/item/pointGoodsItem";
import SpinnerLoading from "../../component/common/SpinnerLoading";
import DropDownMenu from '../../component/common/DropDownMenu';

const headerHeight = 172;

@inject('loginStore', 'shopStore', 'resourceStore')
@observer
export default class PointShop extends Component {
    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            loading: false,
            ready: false,
            maskHidden: true,
            sortCategory: '全部',
            sortCategoryId: params && params.category_id ? params.category_id : 0,
        };
        this.page = 1;
        this.pageSize = 10;
        this.opacity = new Animated.Value(0);
    }

    static defaultProps = {
        category_id: 0,
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // this.getResource();
            this.getWorkCategory();
            this.requestDataSource(this.page);
        });
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2, this.timer3, this.timer4, this.timer5];
        ClearTimer(timers);
    }

    getWorkCategory = async () => {
        const {resourceStore} = this.props;
        let url = ServicesApi.getCategory;
        let data = {
            type: 3,
        };
        let result = await resourceStore.getPointGoodsCategory(url, data);
        // console.warn(result);
    };

    startOpacityAnimated = (index) => {
        if (this.state.maskHidden) {
            this.setState({maskHidden: false}, () => {
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
                this.setState({maskHidden: true})
            })
        }
    };

    _onClose = () => {
        this.timer5 = setTimeout(() => {
            this.setState({maskHidden: true});
        }, 500);
    };

    _onPressItem = (index) => {
        // console.log(this.flatListRef.contentOffset)
        // if (this.flatListRef.contentOffset.y < headerHeight) {
        //     const option = {animated: false, itemIndex: 0, sectionIndex: 0, viewOffset: 40, viewPosition: 0};
        //     this.flatListRef.scrollToLocation(option);
        // }
        this.startOpacityAnimated(index);
    };

    _renderContentComponent = (selectIndex) => {
        let {sortCategory, sortCategoryId} = this.state;
        const {resourceStore} = this.props;
        let {pointGoodsCategory} = resourceStore;
        if (selectIndex !== 0 || !pointGoodsCategory || pointGoodsCategory.length < 1) {
            return null;
        }
        let itemView = pointGoodsCategory.map((item, index) => {
            return (
                <Button
                    key={item.id}
                    title={item.name}
                    style={[styles.positionBtnView, sortCategoryId === item.id && styles.positionBtnViewCur]}
                    titleStyle={[styles.positionTitleStyle, sortCategoryId === item.id && styles.positionTitleStyleCur]}
                    onPress={() => {
                        this.setState({
                            sortCategory: item.name,
                            sortCategoryId: item.id,
                            maskHidden: true,
                            // ready: false,
                        }, () => this._onRefresh());
                        // this._onClose();
                        this.timer3 = setTimeout(() => {
                        }, 500);
                    }}
                />
            )
        });
        return (
            <View style={[styles.dropDownMenuView,]}>
                <Button
                    title={'全部'}
                    style={[styles.positionBtnView, sortCategoryId === 0 && styles.positionBtnViewCur]}
                    titleStyle={[styles.positionTitleStyle, sortCategoryId === 0 && styles.positionTitleStyleCur]}
                    onPress={() => {
                            this.setState({
                                sortCategory: '全部',
                                sortCategoryId: 0,
                                maskHidden: true,
                                // ready: false,
                            }, () => this._onRefresh());
                        // this._onClose();
                        this.timer4 = setTimeout(() => {
                        }, 500);
                    }}
                />
                {itemView}
            </View>
        );
    };

    contentHeight = (selectIndex) => {
        return 100;
    };

    renderNavigationBarView = () => {
        let {sortCategory} = this.state;
        return (
            <View style={styles.headerView}>
                <Button
                    style={[styles.headerButtonView, styles.headerLeftView]}
                    onPress={() => this._onPressItem(0)}
                >
                    <Text style={styles.headerBtnName}>{sortCategory}</Text>
                    <Image source={Images.icon_arrow_down} style={[CusTheme.headerIcon, styles.headerBtnIcon]}/>
                </Button>
                <TouchableOpacity
                    style={styles.headerTitleView}
                    onPress={() => RouterHelper.navigate('搜索', 'Search',  {type: 3})}
                >
                    <Image source={Images.icon_search} style={[CusTheme.headerIcon, styles.headerSearchIcon]}/>
                    <Text style={[CusTheme.headerIconTitle, styles.headerSearchTitle]}>搜索商品</Text>
                </TouchableOpacity>
                <Button
                    title={'搜索'}
                    style={[styles.headerButtonView, styles.headerRightView]}
                    titleStyle={styles.headerBtnName}
                    onPress={() => RouterHelper.navigate('搜索', 'Search',  {type: 3})}
                />
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
        let {sortCategoryId} = this.state;
        let url = ServicesApi.point_goods_list;
        let data = {
            page,
            category_id: sortCategoryId,
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
            <PointGoodsItem
                item={item}
                onPress={() => RouterHelper.navigate(item.name, 'PointGoodsDetail', {item})}
                {...this.props}
            />
        );
    };

    render() {
        let {loading, ready, maskHidden} = this.state;
        const {shopStore} = this.props;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '积分商城';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    {this.renderNavigationBarView()}
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
        height: 60,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerButtonView: {
        borderWidth: 0,
    },
    headerBtnIcon: {
        marginLeft: 5,
    },
    headerBtnName: {
        color: '#333',
        fontSize: FontSize(12),
    },
    headerLeftView: {
        // left: 15,
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitleView: {
        flex: 1,
        height: 35,
        borderRadius: 18,
        overflow: 'hidden',
        marginHorizontal: 5,
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
        // right: 15,
        // position: 'absolute',
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
    
    // 下拉菜单
    dropDownMenuView: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
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
        bottom: 0,
        top: 60, // CusTheme.statusBarHeight + CusTheme.navBarContentHeight,
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
    },
    positionTitleStyle: {
        color: '#999',
        fontSize: FontSize(12),
    },
    positionTitleStyleCur: {
        color: CusTheme.themeColor,
    },
});