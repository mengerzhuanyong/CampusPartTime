/**
 * 校园空兼 -
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {scaleSize} from "../../util/Tool";

export default class GoodsItem extends React.PureComponent {

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
            <TouchableOpacity style={styles.goodsItemView}>
                <View style={styles.goodsItemPicView}>
                    <Image
                        style={styles.goodsItemPic}
                        resizeMode={'cover'}
                        source={Images.img_goods1}
                    />
                </View>
                <View style={styles.goodsInfoView}>
                    <View style={[styles.goodsInfoItemView, styles.goodsInfoTitleView]}>
                        <Text style={styles.goodsInfoTitle} numberOfLines={2}>iphone X  64G 黑色</Text>
                        <View style={styles.goodsInfoTagsView}>
                            <View style={styles.goodsInfoTagItemView}>
                                <Text style={styles.goodsInfoTagItemName}>急招</Text>
                            </View>
                            <View style={[styles.goodsInfoTagItemView, styles.goodsInfoTagIconView]}>
                                <Image source={Images.icon_hot} style={[styles.goodsInfoIcon]} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.goodsInfoItemView, styles.marginVerticalView]}>
                        <View style={styles.goodsInfoLeftView}>
                            <Text style={styles.goodsInfoPriceSymbol}>¥</Text>
                            <Text style={styles.goodsInfoPrice}>8999.00</Text>
                        </View>
                    </View>
                    <View style={styles.goodsInfoItemView}>
                        <View style={styles.goodsInfoLeftView}>
                            <Text style={styles.goodsInfoContext}>折算工分：</Text>
                            <Text style={styles.goodsInfoContext}>7120</Text>
                        </View>
                    </View>
                </View>
                {/*<View style={styles.contentRightIconView}>*/}
                    {/*<Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>*/}
                {/*</View>*/}
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
        width: scaleSize(300),
        height: scaleSize(200),
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    goodsItemPic: {
        width: scaleSize(300),
        height: scaleSize(200),
        resizeMode: 'contain',
    },
    goodsInfoView: {
        flex: 1,
        // height: 100,
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
        fontSize: FontSize(14),
    },
    goodsInfoIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
        resizeMode: 'contain',
    },
    goodsInfoTagsView: {
        marginLeft: 10,
        marginVertical: 2,
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
        borderWidth: Theme.minPixel,
        borderColor: Theme.themeColor,
    },
    goodsInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    goodsInfoTagItemName: {
        color: Theme.themeColor,
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
        color: '#999',
        marginLeft: 5,
        fontSize: FontSize(12),
    },
    contentRightIconView: {
        width: scaleSize(35),
        alignItems: 'flex-end',
    },
    arrowIcon: {
        height: scaleSize(40),
        resizeMode: 'contain',
    },
});