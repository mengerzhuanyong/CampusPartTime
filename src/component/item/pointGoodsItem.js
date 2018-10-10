/**
 * 校园空兼 - PointGoodsItem
 * https://menger.me
 * @大梦
 */


'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from "../../util/Tool";
import GoodsTagComponent from "../shop/goodsTagComponent";
import {Button} from "teaset";

export default class PointGoodsItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        ...ViewPropTypes,
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        titleStyle: Text.propTypes.style,
        activeTitleStyle: Text.propTypes.style,
        active: PropTypes.bool,
        badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        onAddWidth: PropTypes.func,
    };

    static defaultProps = {
        ...View.defaultProps,
        item: {
            id: '',
            tags: [],
            name: '',
            price: '',
            address: '',
            work_point: '',
            sign_count: '',
            total_count: '',
            illustration: '',
        },
    };

    render() {
        let {item, onPress} = this.props;
        return (
            <TouchableOpacity
                onPress = {onPress}
                style = {styles.goodsItemView}
            >
                <View style={styles.goodsItemPicView}>
                    <Image
                        style={styles.goodsItemPic}
                        resizeMode={'cover'}
                        source={item.illustration ? {uri: item.illustration} : Images.img_goods1}
                    />
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={[styles.goodsInfoItemView, styles.goodsInfoTitleView]}>
                        <Text style={styles.goodsInfoTitle} numberOfLines={2}>{item.name}</Text>
                        <GoodsTagComponent
                            tagsData={item.tags}
                            {...this.props}
                        />
                    </View>
                    <View style={[styles.goodsInfoItemView, styles.goodsInfoBtnView]}>
                        <Button
                            title={'兑换'}
                            style={styles.submitBtnView}
                            titleStyle={styles.submitBtnName}
                            onPress={onPress}
                        />
                    </View>
                    <View style={styles.goodsInfoItemView}>
                        <View style={styles.goodsInfoLeftView}>
                            <Text style={styles.goodsInfoContext}>{item.point_str}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    goodsItemView: {
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsItemPicView: {
        width: scaleSize(260),
        height: scaleSize(180),
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        // backgroundColor: '#f60',
    },
    goodsItemPic: {
        width: scaleSize(260),
        height: scaleSize(180),
        resizeMode: 'contain',
    },
    goodsInfoView: {
        flex: 1,
        height: scaleSize(180),
        overflow: 'hidden',
        justifyContent: 'space-between',
        // backgroundColor: '#f44'
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    goodsInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsInfoTitleView: {
        flexWrap: 'wrap',
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    goodsInfoTitle: {
        color: '#333',
        lineHeight: 20,
        marginRight: 10,
        marginBottom: 5,
        fontSize: FontSize(14),
    },
    goodsInfoIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
        resizeMode: 'contain',
    },
    goodsInfoTagsView: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CusTheme.minPixel,
        borderColor: CusTheme.themeColor,
    },
    goodsInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    goodsInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    goodsInfoLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f60',
    },
    goodsInfoPriceSymbol: {
        marginRight: 5,
        color: '#ed3126',
        fontSize: FontSize(12),
    },
    goodsInfoPrice: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    goodsInfoContext: {
        color: '#f50',
        // marginLeft: 5,
        fontSize: FontSize(14),
    },
    contentRightIconView: {
        width: scaleSize(35),
        alignItems: 'flex-end',
    },
    arrowIcon: {
        height: scaleSize(40),
        resizeMode: 'contain',
    },
    goodsInfoBtnView: {
        justifyContent: 'flex-end',
    },
    submitBtnView: {
        width: 70,
        height: 30,
        borderRadius: 15,
        borderColor: CusTheme.themeColor,
    },
    submitBtnName: {
        fontSize: FontSize(14),
        color: CusTheme.themeColor,
    },
});