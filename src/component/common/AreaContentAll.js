'use strict';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Wheel, Button } from 'teaset';
import { fontSize } from '../../util/Tool'
import Theme from '../../config/Theme'

// 需要重构
class AreaContent extends React.PureComponent {

    constructor(props) {
        super(props);
        const {enableAll} = this.props;
        const data = require('../../asset/json/area.json').slice();
        let province = [], city = [], area = [], newData = [];
        if (enableAll) {
            province = ['全国'];
            newData.push({name: "全国", city: [{name: '', area: []}]});
            data.map((item, index) => {
                let newItem = {...item};
                if (newItem.name === '天津' || newItem.name === '北京' || newItem.name === '重庆' || newItem.name === '上海'
                    || newItem.name === '澳门' || newItem.name === '台湾' || newItem.name === '香港') {
                    if (newItem.city[0]['name'] !== '全市') {
                        newItem.city.unshift({name: "全市", area: []});
                    }
                } else {
                    if (newItem.city[0]['name'] !== '全省') {
                        newItem.city.unshift({name: "全省", area: []});
                    }
                    newItem.city.forEach((element, index) => {
                        if (element.name !== '全省' && element.name !== '全市') {
                            if (element['area'][0] !== '全市') {
                                element['area'].unshift('全市');
                            }
                        }
                    });
                }
                newData.push(newItem);
                province.push(newItem.name);
            });
            this.data = newData;
        } else {
            province = [];
            data.map((item, index) => {
                let newItem = {...item};
                if (newItem.name === '天津' || newItem.name === '北京' || newItem.name === '重庆' || newItem.name === '上海'
                    || newItem.name === '澳门' || newItem.name === '台湾' || newItem.name === '香港') {
                    if (newItem.city[0]['name'] === '全市') {
                        newItem.city.splice(0, 1);
                    }
                } else {
                    if (newItem.city[0]['name'] === '全省') {
                        newItem.city.splice(0, 1);
                    }
                    newItem.city.forEach((element, index) => {
                        if (element['area'][0] === '全市') {
                            element['area'].splice(0, 1);
                        }
                    });
                }
                if (index === 0) {
                    newItem.city.forEach((element) => {
                        city.push(element.name);
                        area = element.area;
                    })
                }
                newData.push(newItem);
                province.push(newItem.name);
            });
            this.data = newData;
        }
        this.state = {province, provinceIndex: 0, city: city, cityIndex: 0, area: area, areaIndex: 0};
    }

    componentDidMount() {

    }

    _onProChange = (index) => {
        let city = this.data[index];
        let arr = [];
        city.city.map((item, index) => {
            arr.push(item.name);
        });
        this.setState({
            city: arr,
            cityIndex: 0,
            provinceIndex: index,
            areaIndex: 0,
            area: city.city[0]['area']
        });
    };

    _onCityChange = (index) => {
        let city = this.data[this.state.provinceIndex];
        let arr = city.city;
        let obj = arr[index];
        this.setState({
            area: obj.area,
            areaIndex: 0,
            cityIndex: index
        });
    };

    _onAreaChange = (index) => {
        this.setState({
            areaIndex: index,
        });
    };

    _onPressOK = () => {
        requestAnimationFrame(() => {
            const {onPress, enableAll} = this.props;
            let one = this.data[this.state.provinceIndex];
            let two = one.city[this.state.cityIndex];
            let three = two.area[this.state.areaIndex];
            let province = one.name;
            let city = two.name;
            let area = three;
            if (enableAll) {
                if (province === '全国') {
                    province = '';
                    city = '';
                    area = '';
                } else if (city === '全市' || city === '全省') {
                    city = '';
                    area = '';
                } else if (area === '全市') {
                    area = '';
                }
            }
            if (province !== '' && province !== '北京' && province !== '澳门'
                && province !== '台湾' && province !== '香港'
                && province !== '天津' && province !== '上海'
                && province !== '重庆' && province.indexOf('省') === -1) {
                province = `${province}省`
            }
            if (city !== '' && city.indexOf('市') === -1) {
                city = `${city}市`
            }
            onPress && onPress([province, city, area]);
        });
        ActionsManager.hide();
    };

    _onPressCancel = () => {
        requestAnimationFrame(() => {
            ActionsManager.hide();
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionContainer}>
                    <TouchableOpacity onPress={this._onPressCancel}>
                        <Text style={styles.actionText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressOK}>
                        <Text style={styles.actionText}>确定</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.wheelContainer}>
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.provinceIndex}
                        items={this.state.province}
                        // defaultIndex={this.years.findIndex((item) => item == currentYear)}
                        onChange={this._onProChange}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.cityIndex}
                        items={this.state.city}
                        // defaultIndex={this.months.findIndex((item) => item == currentMounth)}
                        onChange={this._onCityChange}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={this.state.areaIndex}
                        items={this.state.area}
                        // defaultIndex={days.findIndex((item) => item == currentDay)}
                        onChange={this._onAreaChange}
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0,
    },
    wheelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    wheelStyle: {
        height: 180,
        width: Theme.screenWidth / 3,
    },
    itemStyle: {
        textAlign: "center",
        fontSize: fontSize(14),
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    actionText: {
        color: Theme.areaActionTitleColor,
        fontSize: fontSize(14),
    }
});

//make this component available to the app
export default AreaContent;
