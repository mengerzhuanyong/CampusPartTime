/**
 * 校园空兼 - MineJobItem
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from "../../util/Tool";
import JobTagComponent from "../job/jobTagComponent";

export default class MineJobItem extends PureComponent {

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
                style={styles.jobItemView}
                onPress={onPushToDetail}
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
                    <View style={[styles.jobInfoItemView, styles.marginVerticalView]} />
                    <View style={styles.jobInfoItemView}>
                        <View style={styles.jobInfoLeftView}>
                            <Image source={Images.icon_calendar} style={[styles.jobInfoTagIcon]} />
                            <Text style={styles.jobInfoContext}>{item.work_time}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.contentRightIconView}>
                    <Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    jobItemView: {
        paddingLeft: 15,
        marginVertical: 15,
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
        // backgroundColor: '#f60',
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
        flexWrap: 'wrap',
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
    jobInfoTagIcon: {
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
    contentRightIconView: {
        width: scaleSize(35),
        alignItems: 'flex-end',
        // backgroundColor: '#123',
    },
    arrowIcon: {
        height: scaleSize(40),
        resizeMode: 'contain',
    },
});