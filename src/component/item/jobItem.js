/**
 * 校园空兼 - JobItem
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from "../../util/Tool";

export default class JobItem extends PureComponent {

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
            <TouchableOpacity style={styles.jobItemView}>
                <View style={styles.jobItemPicView}>
                    <Image
                        style={styles.jobItemPic}
                        resizeMode={'cover'}
                        source={Images.img_jobs1}
                    />
                </View>
                <View style={styles.jobInfoView}>
                    <View style={[styles.jobInfoItemView, styles.jobInfoTitleView]}>
                        <Text style={styles.jobInfoTitle}>花海地产新盘传单派发</Text>
                        <View style={styles.jobInfoTagsView}>
                            <View style={styles.jobInfoTagItemView}>
                                <Text style={styles.jobInfoTagItemName}>急招</Text>
                            </View>
                            <View style={[styles.jobInfoTagItemView, styles.jobInfoTagIconView]}>
                                <Image source={Images.icon_hot} style={[styles.jobInfoIcon]} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.jobInfoItemView, styles.marginVerticalView]}>
                        <View style={styles.jobInfoLeftView} />
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoPrice}>12元/h</Text>
                        </View>
                    </View>
                    <View style={styles.jobInfoItemView}>
                        <View style={styles.jobInfoLeftView}>
                            <Image source={Images.icon_user} style={[styles.jobInfoIcon]} />
                            <Text style={styles.jobInfoContext}>报名人数</Text>
                            <Text style={styles.jobInfoContext}>7/20</Text>
                        </View>
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoContext}>0.8工分/h</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    jobItemView: {
        paddingHorizontal: 15,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobItemPicView: {
        width: 80,
        height: 70,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    jobItemPic: {
        width: 80,
        height: 70,
        resizeMode: 'contain',
    },
    jobInfoView: {
        flex: 1,
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    jobInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobInfoTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    jobInfoTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    jobInfoIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
        resizeMode: 'contain',
    },
    jobInfoTagsView: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: Theme.minPixel,
    },
    jobInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    jobInfoTagItemName: {
        color: Theme.themeColor,
        fontSize: FontSize(10),
    },
    jobInfoLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f60',
    },
    jobInfoPrice: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    jobInfoContext: {
        color: '#999',
        marginLeft: 5,
        fontSize: FontSize(12),
    },
});