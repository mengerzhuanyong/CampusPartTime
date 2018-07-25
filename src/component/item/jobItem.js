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
import JobTagComponent from "../job/jobTagComponent";

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
        }
    };

    render() {
        let {onPress, item} = this.props;
        return (
            <TouchableOpacity
                style={styles.jobItemView}
                onPress={onPress}
            >
                <View style={styles.jobItemPicView}>
                    <Image
                        style={styles.jobItemPic}
                        resizeMode={'cover'}
                        source={item.illustration ? {uri: item.illustration} : Images.img_jobs1}
                    />
                </View>
                <View style={styles.jobInfoView}>
                    <View style={[styles.jobInfoItemView, styles.jobInfoTitleView]}>
                        <Text style={styles.jobInfoTitle}>{item.name}</Text>
                        <JobTagComponent
                            tagsData={item.tags}
                            {...this.props}
                        />
                    </View>
                    <View style={[styles.jobInfoItemView, styles.marginVerticalView]}>
                        <View style={styles.jobInfoLeftView}>
                            <Image source={Images.icon_place} style={[styles.jobInfoIcon]} />
                            <Text style={styles.jobInfoContext}>{item.address}</Text>
                        </View>
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoPrice}>{item.price}</Text>
                        </View>
                    </View>
                    <View style={styles.jobInfoItemView}>
                        <View style={styles.jobInfoLeftView}>
                            <Image source={Images.icon_user} style={[styles.jobInfoIcon]} />
                            <Text style={styles.jobInfoContext}>报名人数</Text>
                            <Text style={styles.jobInfoContext}>{item.sign_count}/{item.total_count}</Text>
                        </View>
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoContext}>{item.work_point}</Text>
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
        marginRight: 10,
        marginBottom: 5,
        fontSize: FontSize(14),
    },
    jobInfoIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
        resizeMode: 'contain',
    },
    jobInfoTagsView: {
        marginBottom: 5,
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
        borderWidth: CusTheme.minPixel,
    },
    jobInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    jobInfoTagItemName: {
        color: CusTheme.themeColor,
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