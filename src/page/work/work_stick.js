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
import NavigationBar from '../../component/navigation/NavigationBar';
import SectionListView from '../../component/common/SectionListView';
import ListView from '../../component/list/ListView';
import SpinnerLoading from '../../component/common/SpinnerLoading';
import ListRow from '../../component/home/ListRow'
import SectionTitle from '../../component/home/SectionTitle';
import DropDownMenu from '../../component/common/DropDownMenu';
import DropDown from '../../component/home/DropDown';
import Container from '../../component/common/Container'
import {observer, inject} from 'mobx-react';
import BannerComponent from "../../component/common/BannerComponent";
import HotNewsComponent from "../../component/common/HotNewsComponent";
import {Theme} from 'teaset'

const headerHeight = SCREEN_WIDTH * 0.459;
@inject('workStore', 'optionStore', 'loginStore')
@observer
export default class Work extends Component {

    constructor(props) {
        super(props);
        const {workStore} = this.props;
        workStore.clearDataSource();
        this.state = {maskHidden: true};
        this.opacity = new Animated.Value(0);
    }

    componentDidMount() {
        this.requestDataSource()
    }

    componentWillUnmount() {
    }

    requestDataSource = async () => {
        const {workStore, optionStore, loginStore} = this.props;
        let data;
        if (loginStore.userInfo.role === 1) {
            data = await workStore.requestDataSource(ServicesApi.POSITION, {location: '青岛'});
        } else {
            data = await workStore.requestDataSource(ServicesApi.RESUME, {location: '青岛'});
        }
        const data2 = await optionStore.requestDataSource(ServicesApi.OPTIONS, {names: ''});
        this.sectionList && this.sectionList.stopRefresh();
        // console.log('requestDataSource', data)
    };

    _onRefresh = () => {
        this.requestDataSource();
    };

    _onClose = () => {
        setTimeout(() => {
            this.setState({maskHidden: true})
        }, 500);
    };

    _onPressItem = (index) => {
        if (index === 0) {
            if (this.sectionList.contentOffset.y < headerHeight) {
                const option = {animated: true, itemIndex: 0, sectionIndex: 0, viewOffset: 30, viewPosition: 0};
                this.sectionList.scrollToLocation(option);
            }
            this.startOpacityAnimated(index);
        }
    };

    _onPressListRow = (item) => {
        const {loginStore} = this.props;
        let type;
        if (loginStore.userInfo.role === 1) {
            type = '职位详情';
        } else {
            type = '人才详情';
        }
        RouterHelper.navigate('Detail', {navTitle: type, item});
    };

    _onPressDrop = (title) => {
        // console.log(title);
        const {workStore} = this.props;
        workStore.setSelectFilter(title);
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

    _renderHeader = (info) => {
        return (
            <View style={styles.listHeaderComponent}>
                <BannerComponent
                    bannerData={[1, 2, 3]}
                />
                <HotNewsComponent
                    noticeData={[1, 2, 3]}
                />
            </View>
        );
    };

    _renderItem = (info) => {
        const item = info.item;
        const index = info.index;
        const {loginStore} = this.props;
        let type;
        if (loginStore.userInfo.role === 1) {
            type = '职位';
        } else {
            type = '人才';
        }
        // console.log('loginStore.userInfo.role', loginStore.userInfo.role);
        // console.log('_renderItem');
        return (
            <ListRow type={type} item={item} index={index} onPress={this._onPressListRow}/>
        )
    };

    _renderSectionHeader = (info) => {
        const section = info.section;
        return (
            <SectionTitle sectionTitles={section.title} onPress={this._onPressItem}/>
        )
    };

    _renderContentComponent = (selectIndex) => {
        const {optionStore, workStore} = this.props;
        // console.log('dadadad', optionStore.options.ent_industry);
        if (selectIndex === 0) {
            return (
                <View style={styles.dropDownMenuView}>
                    <DropDown
                        data={optionStore.options.ent_industry}
                        selectData={workStore.filterData}
                        onPress={this._onPressDrop}
                    />
                </View>
            );
        } else {
            return <View/>
        }
    };

    contentHeight = (selectIndex) => {
        if (selectIndex === 0) {
            return 400
        } else if (selectIndex === 1) {
            return 200
        } else {
            return 50
        }
    };

    _keyExtractor = (item, index) => {
        // return `${item.resume_id}`
        return `item_${index}`
    };
    _captureRef = (v) => {
        this.sectionList = v
    };

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerLeftView}>
                    <Image source={Images.icon_place} style={CusTheme.headerIcon}/>
                    <Text style={[CusTheme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                <Text style={[CusTheme.headerTitle, styles.headerTitle]}>工作</Text>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
                >
                    <Image source={Images.icon_message} style={CusTheme.headerIcon}/>
                    <View style={CusTheme.pointView}/>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const {workStore} = this.props;
        return (
            <Container fitIPhoneX={false} style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'dark-content'}
                    renderLeftAction={null}
                    backgroundImage={null}
                />
                {/* <SpinnerLoading isVisible={workStore.loading} /> */}
                <ListView
                    listType={'SectionList'}
                    ref={this._captureRef}
                    data={workStore.getDataSource}
                    renderItem={this._renderItem}
                    enableLoadMore={false}
                    renderSectionHeader={this._renderSectionHeader}
                    initialRefresh={true}
                    ListHeaderComponent={this._renderHeader}
                    onRefresh={this._onRefresh}
                    keyExtractor={this._keyExtractor}
                />
                {!this.state.maskHidden ? (
                    <Animated.View style={[styles.dropDownMenuContainer, {opacity: this.opacity,}]}>
                        <DropDownMenu
                            ref={v => this.dropDownMenu = v}
                            style={styles.dropDownMenu}
                            onClose={this._onClose}
                            renderContentComponent={this._renderContentComponent}
                            contentHeight={this.contentHeight}
                            titleArray={workStore.sectionTitles}
                        />
                    </Animated.View>
                ) : null}
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },

    // 导航栏
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

    listHeaderComponent: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },

    maskContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: Theme.statusBarHeight + Theme.navBarContentHeight + ScaleSize(90),
    },
    dropDownMenuView: {
        flex: 1,
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
        top: Theme.statusBarHeight + Theme.navBarContentHeight,
    },
    dropDownMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});