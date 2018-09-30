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
        item: {},
    };

    render() {
        let {item, onPushToDetail} = this.props;
        return (
            <TouchableOpacity
                style={styles.orderItemView}
                onPress={onPushToDetail}
            >
                <View style={styles.orderItemPicView}>
                    <Image
                        style={styles.orderItemPic}
                        resizeMode={'cover'}
                        source={item.illustration ? {uri: item.illustration} : Images.img_goods1}
                    />
                </View>
                <View style={styles.orderInfoView}>
                    <View style={[styles.orderInfoItemView, styles.orderInfoTitleView]}>
                        <Text style={[styles.orderInfoTitle, styles.orderInfoLeftCon]} numberOfLines={2}>{item.name}</Text>
                        <Text style={[styles.orderInfoPrices, styles.orderInfoRightCon]} numberOfLines={2}>{item.price}</Text>
                    </View>
                    <View style={[styles.orderInfoItemView, styles.orderInfoSubtitleView]}>
                        <Text style={[styles.orderInfoNo, styles.orderInfoLeftCon]} numberOfLines={2}>订单编号：{item.order_no}</Text>
                        <Button
                            title={'查看详情'}
                            style={[styles.orderBtnItem, styles.orderInfoRightCon]}
                            titleStyle={styles.orderBtnItemName}
                            onPress={onPushToDetail}
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
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderItemPicView: {
        width: ScaleSize(150),
        height: ScaleSize(110),
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    orderItemPic: {
        width: ScaleSize(150),
        height: ScaleSize(110),
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
        // width: 70,
        marginLeft: 5,
    },
    orderInfoTitleView: {},
    orderInfoTitle: {
        fontSize: 15,
        color: '#333',
        // fontSize: FontSize(15),
    },
    orderInfoPrices: {
        fontSize: 13,
        color: '#ed3126',
        textAlign: 'right',
        // fontSize: FontSize(12),
    },
    orderInfoSubtitleView: {},
    orderInfoNo: {
        fontSize: 13,
        color: '#888',
        // fontSize: FontSize(12),
    },
    orderBtnItem: {
        paddingHorizontal: 5,
        borderColor: CusTheme.themeColor,
    },
    orderBtnItemName: {
        fontSize: 13,
        // fontSize: FontSize(11),
        color: CusTheme.themeColor,
    },
});