/**
 * 校园空兼 - OrderReturn
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'

import MineOrderList from './mineOrderList'
import CusTheme from "../../config/Theme";

export default class OrderReturn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1, 2, 3, 4],
            type: 1,
        };
    }

    changeReturnType = (type) => {
        this.setState({type});
    };

    render() {
        let {loading, type} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '退换货';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                        <View style={styles.orderGoodsPicView}>
                            <Image source={Images.img_goods1} style={styles.orderGoodsPic}/>
                        </View>
                        <View style={styles.orderGoodsTitleView}>
                            <Text style={styles.orderGoodsTitle}>苹果iPhone X 64G 黑色</Text>
                            <Text style={styles.orderGoodsPrices}>2200工分</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={styles.orderUserInfoCon}>
                            <Text style={[styles.orderUserName, styles.orderUserInfoText]}>订单编号：张三</Text>
                            <Text style={[styles.orderUserPhone, styles.orderUserInfoText]}>下单时间：18.09.10</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <View style={styles.orderOptionView}>
                            <TouchableOpacity
                                style={styles.orderOptionItem}
                                onPress={() => this.changeReturnType(1)}
                            >
                                <Image source={type === 1 ? Images.icon_selected_circle : Images.icon_select_circle} style={styles.optionIconStyle}/>
                                <Text style={[styles.orderOptionItemTitle, type === 1 && styles.orderOptionItemTitleCur]}>申请退货</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.orderOptionItem}
                                onPress={() => this.changeReturnType(2)}
                            >
                                <Image source={type === 2 ? Images.icon_selected_circle : Images.icon_select_circle} style={styles.optionIconStyle}/>
                                <Text style={[styles.orderOptionItemTitle, type === 2 && styles.orderOptionItemTitleCur]}>申请换货</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.orderReturnReason}>
                            {/*<Text style={styles.orderReturnReasonTitle}>请输入退换货原因</Text>*/}
                            <View style={[styles.contentConView]}>
                                <TextInput
                                    multiline={true}
                                    style={styles.inputItem}
                                    ref={v => this.input = v}
                                    keyboardType={'numeric'}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入您的申诉原因'}
                                    placeholderTextColor={'#999'}
                                    // returnKeyType={'done'}
                                    onChangeText={(text) => {

                                    }}
                                />
                            </View>
                            <View style={[styles.uploadImageView]}>
                                <TouchableOpacity
                                    style={styles.uploadItemView}
                                    onPress={() => {
                                    }}
                                >
                                    <View style={styles.deleteBtnView}>
                                        <Image source={Images.icon_delete} style={styles.deleteIcon}/>
                                    </View>
                                    <Image
                                        source={Images.img_goods1}
                                        style={[CusTheme.uploadIcon, styles.uploadItemImage]}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.uploadItemView}
                                    onPress={() => {
                                    }}
                                >
                                    <Image source={Images.icon_camera} style={styles.uploadIcon}/>
                                    <Text style={styles.uploadTips}>上传截图</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Button
                        title={'提交'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={() => RouterHelper.navigate('', 'Work')}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    orderGoodsInfoView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(280),
    },
    orderGoodsPic: {
        width: ScaleSize(280),
        height: ScaleSize(230),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(230),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderUserInfoView: {
        marginTop: 0,
        borderColor: '#eee',
        borderTopWidth: CusTheme.minPixel,
    },
    orderUserInfoCon: {
        // marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#555',
        fontSize: FontSize(13),
        lineHeight: FontSize(20),
    },
    orderUserName: {},
    orderUserPhone: {},
    orderUserAddress: {},
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(25),
    },

    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
    orderOptionView: {
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    orderOptionItem: {
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    optionIconStyle: {
        width: 12,
        height: 12,
        marginRight: 8,
        resizeMode: 'contain',
    },
    orderOptionItemTitle: {
        fontSize: 14,
        color: '#999',
    },
    orderOptionItemTitleCur: {
        color: '#1ab588',
    },
    orderReturnReason: {},
    orderReturnReasonTitle: {
        color: '#999',
        marginVertical: 15,
        fontSize: FontSize(13),
    },
    contentConView: {
        // marginTop: 15,
    },
    inputItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        height: ScaleSize(190),
        textAlignVertical: 'top',
    },
    uploadImageView: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadItemView: {
        borderWidth: 1,
        marginRight: 15,
        borderRadius: 3,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        width: ScaleSize(180),
        height: ScaleSize(180),
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteBtnView: {
        position: 'absolute',
        top: -7,
        right: -7,
        zIndex: 5,
    },
    deleteIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
    uploadItemImage: {
        width: ScaleSize(180),
        height: ScaleSize(180),
        resizeMode: 'cover',
        borderRadius: 3,
    },
    uploadIcon: {
        width: ScaleSize(90),
        height: ScaleSize(90),
        resizeMode: 'contain',
    },
    uploadTips: {
        color: '#999',
        marginTop: 2,
        fontSize: FontSize(13),
    },
});