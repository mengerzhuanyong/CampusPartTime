/**
 * 校园空兼 - JobTagComponent
 * http://menger.me
 * @大梦
 */

'use strict';

import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scaleSize} from "../../util/Tool";

export default class JobTagComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    // static propTypes = {
    //     ...ViewPropTypes,
    //     title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    //     style: View.propTypes.style,
    //     titleStyle: Text.propTypes.style,
    //     activeTitleStyle: Text.propTypes.style,
    //     active: PropTypes.bool,
    //     badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    //     onAddWidth: PropTypes.func,
    // };

    static defaultProps = {
        ...View.defaultProps,
        active: false,
    };

    renderJobTagsItem = (item, index) => {
        let tagItem = <View key={index} />;
        let id = parseInt(item.id);
        switch (id) {
            case 1:
                tagItem = <View key={index} style={styles.jobInfoTagItemView}>
                    <Text style={styles.jobInfoTagItemName}>{item.name}</Text>
                </View>;
                break;
            case 2:
                tagItem = <View key={index} style={[styles.jobInfoTagItemView, styles.jobInfoTagItemViewCur]}>
                    <Text style={[styles.jobInfoTagItemName, styles.jobInfoTagItemNameCur]}>{item.name}</Text>
                </View>;
                break;
            case 3:
                tagItem = <View key={index} style={[styles.jobInfoTagItemView, styles.jobInfoTagIconView]}>
                    <Image source={Images.icon_hot} style={[styles.jobInfoIcon]} />
                </View>;
                break;
            default:
                tagItem = <View key={index} style={styles.jobInfoTagItemView}>
                    <Text style={styles.jobInfoTagItemName}>{item.name}</Text>
                </View>;
                break;
        }
        return tagItem;
    };

    renderJobTagsView = (data) => {
        if (!data || data.length < 1) {
            return;
        }
        let tags = data.map((item, index) => {
            return this.renderJobTagsItem(item, index);
        });
        return tags;
    };

    render() {
        let {tagsData, style} = this.props;
        return (
            <View style={[styles.jobInfoTagsView, style]}>
                {this.renderJobTagsView(tagsData)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        borderColor: CusTheme.themeColor,
    },
    jobInfoTagIconView: {
        padding: 0,
        borderWidth: 0,
    },
    jobInfoTagItemViewCur: {
        borderColor: '#f275da',
    },
    jobInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    jobInfoTagItemNameCur: {
        color: '#f275da',
    },
    jobInfoIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
        resizeMode: 'contain',
    },
});