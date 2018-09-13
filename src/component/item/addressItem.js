/**
 * 校园空兼 - AddressItem
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ViewPropTypes, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class AddressItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            item: this.props.item,
            style: this.props.style,
            PAGE_FLAG: this.props.PAGE_FLAG,
            updateContent: this.props.updateContent,
        };
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
        item: {},
        PAGE_FLAG: '',
        updateContent: () => {}
    };

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.updateState({
            item: nextProps.item
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    updateState = (state) => {
        if (!this) {
            return
        }
        this.setState(state);
    };

    loadNetData = () => {

    };

    setDefaultAddress = (item) => {
    };

    submitAddressDel = (data) => {
    };

    render() {
        const {onPushNavigator, leftIcon, leftTitle, rightText, onPushToAddressEdit, onPushToAddressDel, addressManageStatus} = this.props;
        const {item, PAGE_FLAG, updateContent, show} = this.state;
        return (
            <View style={styles.container}>
                {PAGE_FLAG === 'FLOW' &&
                    <TouchableOpacity
                        style={styles.addressSelectView}
                        onPress={() => this.setDefaultAddress(item)}
                    >
                        <Image source={item.is_default === 1 ? Images.icon_checked : Images.icon_checked} style={CusTheme.checkedIcon}/>
                    </TouchableOpacity>
                }
                <View style={styles.addressInfoView}>
                    {PAGE_FLAG === 'FLOW' ?
                        <TouchableOpacity onPress={() => this.setDefaultAddress(item)}>
                            <View style={styles.addressInfoItem}>
                                <Text style={styles.addressInfoName}>{item.username}</Text>
                                <Text style={styles.addressInfoPhone}>{item.mobile}</Text>
                            </View>
                            <View style={styles.addressInfoItem}>
                                <Text style={styles.addressInfoDetail}>{item.area}{item.address}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <View>
                            <View style={styles.addressInfoItem}>
                                <Text style={styles.addressInfoName}>{item.username}</Text>
                                <Text style={styles.addressInfoPhone}>{item.mobile}</Text>
                            </View>
                            <View style={styles.addressInfoItem}>
                                <Text style={styles.addressInfoDetail}>{item.area}{item.address}</Text>
                            </View>
                        </View>
                    }
                    {addressManageStatus && <View style={[CusTheme.horLine, styles.horLine]}/>}
                    {addressManageStatus &&
                        <View style={styles.addressBtnView}>
                            <TouchableOpacity
                                onPress={onPushToAddressEdit}
                                style={styles.addressBtnItemView}
                            >
                                <Image source={Images.icon_edit} style={styles.addressBtnIcon}/>
                                <Text style={styles.addressBtnItemName}>编辑</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onPushToAddressDel}
                                style={styles.addressBtnItemView}
                            >
                                <Image source={Images.icon_trash} style={styles.addressBtnIcon}/>
                                <Text style={styles.addressBtnItemName}>删除</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
    },
    addressSelectView: {
        width: 40,
        height: 50,
        // alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },
    horLine: {
        marginVertical: 5,
    },
    addressInfoView: {
        flex: 1,
    },
    addressInfoItem: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    addressInfoName: {
        fontSize: 16,
        color: '#333',
    },
    addressInfoPhone: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    addressInfoDetail: {
        fontSize: 13,
        color: '#555',
    },
    addressBtnView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    addressBtnItemView: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressBtnItemName: {
        fontSize: 13,
        color: '#666',
    },
    addressBtnIcon: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
        resizeMode: 'contain',
    },
});