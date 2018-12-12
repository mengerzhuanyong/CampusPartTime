/**
 * 校园空兼 - MessageItem
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class MessageItem extends PureComponent {

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
        item: {
            id: '',
            link: '',
            name: '',
            is_read: 1,
            content: '',
        }
    };

    render() {
        let {item} = this.props;
        return (
            <View style={styles.messageItemView}>
                <View style={styles.messageItemPicView}>
                    <Image
                        style={styles.messageItemPic}
                        resizeMode={'cover'}
                        source={Images.icon_message_square}
                    />
                </View>
                <View style={styles.messageInfoView}>
                    <Text style={styles.messageInfoTitle}>{item.content}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    messageItemView: {
        padding: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    messageItemPicView: {
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: ScaleSize(60),
        height: ScaleSize(50),
    },
    messageItemPic: {
        width: ScaleSize(60),
        height: ScaleSize(50),
        resizeMode: 'contain',
    },
    messageInfoView: {
        flex: 1,
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    messageInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    messageInfoTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    messageInfoTitle: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    messageInfoIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },
    messageInfoTagsView: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CusTheme.minPixel,
    },
    messageInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    messageInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    messageInfoLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f60',
    },
    messageInfoPrice: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    messageInfoContext: {
        color: '#999',
        marginLeft: 5,
        fontSize: FontSize(12),
    },
});