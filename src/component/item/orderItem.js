/**
 * 校园空兼 - OrderItem
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button} from 'teaset'

export default class OrderItem extends React.PureComponent {

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
        active: false,
    };

    render() {
        return (
            <TouchableOpacity style={styles.orderItemView}>
                <View style={styles.orderItemPicView}>
                    <Image
                        style={styles.orderItemPic}
                        resizeMode={'cover'}
                        source={Images.img_goods1}
                    />
                </View>
                <View style={styles.orderInfoView}>
                    <View style={[styles.orderInfoItemView, styles.orderInfoTitleView]}>
                        <Text style={[styles.orderInfoTitle, styles.orderInfoLeftCon]} numberOfLines={2}>iPhone X  64G 黑色</Text>
                        <Text style={[styles.orderInfoPrices, styles.orderInfoRightCon]} numberOfLines={2}>2200工分</Text>
                    </View>
                    <View style={[styles.orderInfoItemView, styles.orderInfoSubtitleView]}>
                        <Text style={[styles.orderInfoNo, styles.orderInfoLeftCon]} numberOfLines={2}>订单编号：1236738773248</Text>
                        <Button
                            title={'查看详情'}
                            style={[styles.orderBtnItem, styles.orderInfoRightCon]}
                            titleStyle={styles.orderBtnItemName}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    orderItemView: {
        marginVertical: 10,
        paddingVertical: 5,
        // paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderItemPicView: {
        width: ScaleSize(180),
        height: ScaleSize(140),
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    orderItemPic: {
        width: ScaleSize(180),
        height: ScaleSize(140),
        resizeMode: 'contain',
    },
    orderInfoView: {
        flex: 1,
        height: ScaleSize(160),
        overflow: 'hidden',
        justifyContent: 'space-around',
    },
    orderInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderInfoLeftCon: {
        flex: 1,
    },
    orderInfoRightCon: {
        width: ScaleSize(140),
        marginLeft: 5,
    },
    orderInfoTitleView: {},
    orderInfoTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    orderInfoPrices: {
        color: '#ed3126',
        textAlign: 'right',
        fontSize: FontSize(12),
    },
    orderInfoSubtitleView: {},
    orderInfoNo: {
        color: '#888',
        fontSize: FontSize(12),
    },
    orderBtnItem: {
        paddingHorizontal: 5,
        borderColor: Theme.themeColor,
    },
    orderBtnItemName: {
        fontSize: FontSize(11),
        color: Theme.themeColor,
    },
});