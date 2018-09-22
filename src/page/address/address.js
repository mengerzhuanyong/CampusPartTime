/**
 * 校园空兼 - Address
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
import GoodsCarousel from "../../component/shop/GoodsCarousel"
import SpinnerLoading from "../../component/common/SpinnerLoading";
import AddressItem from "../../component/item/addressItem";


@inject('loginStore', 'addressStore')
@observer
export default class Address extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            message: '',
            customerMobile: '400-500-6666',
            ready: false,
            PAGE_FLAG: params.PAGE_FLAG !== '' ? params.PAGE_FLAG : '',
            updateContent: params.updateContent ? params.updateContent : () => {
            },
        };
        this.page = 1;
        this.pageSize = 10;
    }

    onPushToAddAddress = () => {
        RouterHelper.navigate('新增地址', 'AddressAdd');
    };

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    loadNetData = () => {
        InteractionManager.runAfterInteractions(() => {
            this.requestDataSource(this.page);
        });
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page) => {
        const {addressStore} = this.props;
        let url = ServicesApi.address_list;
        let data = {
            page,
            category_id: 0,
            page_size: this.pageSize,
        };

        let result = await addressStore.requestDataSource(url, data);
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
                    onPress={() => RouterHelper.navigate('热门换购', 'GoodsList')}
                />
            </View>
        );
    };

    _renderListItem = (info, status) => {
        let {item} = info;
        return (
            <AddressItem
                item={item}
                PAGE_FLAG={this.state.PAGE_FLAG}
                updateContent={this.state.updateContent}
                addressManageStatus={status}
                onPushToAddressEdit={() => RouterHelper.navigate('编辑地址', 'AddressEdit', {item})}
                onPushToAddressDel={() => this.deleteConfirm(item)}
                setDefaultAddress={() => this.setDefaultAddress(item)}
                {...this.props}
            />
        );
    };

    setDefaultAddress = async (item) => {
        const {addressStore} = this.props;
        const {updateContent} = this.state;
        let url = ServicesApi.address_default;
        let data = {
            id: item.id,
        };
        let result = await addressStore.onSubmitAddress(url, data);
        if (result && result.code === 1) {
            updateContent(item);
            RouterHelper.goBack();
        } else {
            Toast.toastShort(result.msg);
        }
    };

    deleteConfirm = (item) => {
        const params = {
            title: '温馨提示',
            detail: '删除后无法恢复，确定要删除吗？',
            actions: [
                {
                    title: '取消',
                    onPress: () => {
                    },
                },
                {
                    title: '确定',
                    onPress: () => this.deleteAddressItem(item),
                }
            ]
        };
        AlertManager.show(params);
    };

    deleteAddressItem = async (item) => {
        const {addressStore} = this.props;
        let url = ServicesApi.address_del;
        let data = {
            id: item.id,
        };
        let result = await addressStore.onSubmitAddress(url, data);
        Toast.toastShort(result.msg);
        if (result && result.code === 1) {
            this._onRefresh();
        }
    };

    onChangeMangeStatus = async () => {
        const {addressStore} = this.props;
        let result = await addressStore.onChangeMangeStatus();
    };

    renderRightAction = (status, data) => {
        if (!data || data.length < 1) {
            return null;
        }
        return (
            <Button
                title={status ? '取消' : '管理'}
                style={styles.headerRightView}
                titleStyle={styles.headerRightTitle}
                onPress={this.onChangeMangeStatus}
            />
        );
    };

    render() {
        const {shopStore, addressStore} = this.props;
        let {getDataSource, addressManageStatus} = addressStore;
        let {ready} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '我的地址';
        console.log(getDataSource);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    renderRightAction={() => this.renderRightAction(addressManageStatus, getDataSource)}
                />

                <View style={styles.content}>
                    {ready ?
                        <FlatListView
                            style={styles.listContent}
                            initialRefresh={false}
                            ref={this._captureRef}
                            data={getDataSource.slice()}
                            removeClippedSubviews={false}
                            renderItem={(info) => this._renderListItem(info, addressManageStatus)}
                            keyExtractor={this._keyExtractor}
                            onEndReached={this._onEndReached}
                            onRefresh={this._onRefresh}
                            ItemSeparatorComponent={this._renderSeparator}
                            // ListHeaderComponent={this._renderHeaderComponent}
                        />
                        : <SpinnerLoading isVisible={!ready}/>
                    }
                    <View style={styles.multiBtnView}>
                        <Button
                            title={'新增地址'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={this.onPushToAddAddress}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRightView: {
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    headerRightTitle: {
        color: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listContent: {
        // backgroundColor: '#123',
        marginBottom: 90,
    },

    multiBtnView: {
        bottom: 10,
        marginVertical: 30,
        marginHorizontal: 15,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnView: {
        flex: 1,
    },
    btnName: {},
});