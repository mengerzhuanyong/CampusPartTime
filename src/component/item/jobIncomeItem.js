/**
 * 校园空兼 - JobIncomeItem
 * http://menger.me
 * @大梦
 */


'use strict';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity} from 'react-native';
import JobTagComponent from "../job/jobTagComponent";
import {HorizontalLine} from "../common/commonLine";

export default class JobIncomeItem extends PureComponent {

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
            <View style={styles.detailInfoItemView}>
                <View style={styles.detailInfoItemTopView}>
                    <Text style={styles.detailInfoItemTitle}>{item.job_name}</Text>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
                <View style={styles.detailInfoItemMidView}>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>起止时间：</Text>
                        <Text style={styles.detailInfoItemTime}>{item.start_date} - {item.end_date}</Text>
                    </View>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>工作地点：</Text>
                        <Text style={styles.detailInfoItemTime}>{item.address}</Text>
                    </View>
                </View>
                <HorizontalLine lineStyle={styles.horLine} />
                <View style={styles.detailInfoItemBotView}>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>工作收益：</Text>
                        <Text style={styles.detailInfoItemValue}>{item.price_str}</Text>
                    </View>
                    <View style={styles.detailInfoItemTextView}>
                        <Text style={styles.detailInfoItemType}>总收益：</Text>
                        <Text style={styles.detailInfoItemValue}>{item.amount}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    horLine: {
        marginVertical: 10,
        backgroundColor: '#eee',
    },
    detailInfoItemView: {
        borderRadius: 3,
        marginVertical: 5,
        paddingVertical: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    detailInfoItemTopView: {},
    detailInfoItemTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    detailInfoItemMidView: {},
    detailInfoItemBotView: {
        // marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailInfoItemTime: {
        color: '#888',
        fontSize: FontSize(13),
    },
    detailInfoItemTextView: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailInfoItemType: {
        color: '#333',
        fontSize: FontSize(13),
    },
    detailInfoItemValue: {
        color: '#f00',
        fontSize: FontSize(13),
    },
});