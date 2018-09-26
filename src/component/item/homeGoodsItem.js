/**
 * 校园空兼 - HomeGoodsItem
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {scaleSize} from "../../util/Tool";

export default class HomeGoodsItem extends PureComponent {

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
        let {onPress, item} = this.props;
        return (
            <TouchableOpacity
                style={styles.goodsItemView}
                onPress={onPress}
            >
                <ImageBackground
                    style={styles.goodsItemPic}
                    resizeMode={'cover'}
                    source={item.illustration ? {uri: item.illustration} : Images.img_goods1}
                >
                    <View style={styles.goodsInfoView}>
                        <Text style={styles.goodsTitle} numberOfLines={1}>{item.name}</Text>
                        <Image source={Images.icon_shop_package} style={[CusTheme.contentTitleIcon]} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    goodsItemView: {
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: (SCREEN_WIDTH - 50) / 2,
        height: (SCREEN_WIDTH - 150) / 2,
        // backgroundColor: '#123',
    },
    goodsItemPic: {
        justifyContent: 'flex-end',
        width: (SCREEN_WIDTH - 40) / 2,
        height: (SCREEN_WIDTH - 150) / 2,
    },
    goodsInfoView: {
        marginBottom: 10,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsTitle: {
        flex: 1,
        color: '#fff',
        fontSize: FontSize(13),
    },
});