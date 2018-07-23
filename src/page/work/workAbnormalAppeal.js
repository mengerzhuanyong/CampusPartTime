/**
 * 校园空兼 - WorkAbnormalAppeal
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
import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'


export default class WorkAbnormalAppeal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1, 2, 3, 4],
        };
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    renderHeaderRightView = () => {
        return (
            <TouchableOpacity
                style={[Theme.headerButtonView, styles.headerRightView]}
                onPress={() => this.onPushToNextPage('异常申诉', 'WorkAbnormalAppeal', {})}
            >
                <Text style={Theme.headerBtnName}>异常申诉</Text>
            </TouchableOpacity>
        )
    };

    submitFoo = () => {

    };

    render() {
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '异常申诉';
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
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>异常描述</Text>
                        </View>
                        <View style={[styles.contentConView]}>
                            <TextInput
                                multiline={true}
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请描述异常情况'}
                                placeholderTextColor={'#999'}
                                // returnKeyType={'done'}
                                onChangeText={(text) => {

                                }}
                            />
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>申诉原因</Text>
                        </View>
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
                                onPress={() => {}}
                            >
                                <View style={styles.deleteBtnView}>
                                    <Image source={Images.icon_delete} style={styles.deleteIcon}/>
                                </View>
                                <Image
                                    source={Images.img_goods1}
                                    style={[Theme.uploadIcon, styles.uploadItemImage]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.uploadItemView}
                                onPress={() => {}}
                            >
                                <Image source={Images.icon_camera} style={styles.uploadIcon}/>
                                <Text style={styles.uploadTips}>上传截图</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        title={'提交'}
                        style={[Theme.btnView, styles.btnView]}
                        titleStyle={[Theme.btnName, styles.btnName]}
                        onPress={this.submitFoo}
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
    headerRightView: {
        top: -22,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    contentTitleView: {
        height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
    },
    orderGoodsInfoView: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(240),
    },
    orderGoodsPic: {
        width: ScaleSize(240),
        height: ScaleSize(190),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(230),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        color: '#333',
        lineHeight: FontSize(20),
        fontSize: FontSize(16),
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
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
    contentConView: {},
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

    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
});