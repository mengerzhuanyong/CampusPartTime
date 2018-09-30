'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Wheel, Button} from 'teaset';
import {fontSize} from '../../util/Tool'
import CusTheme from '../../config/Theme'


class TimeContent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.data = props.data;
        let startTimeIndex = this.data.findIndex((item) => item === props.startTime);
        let endTimeIndex = this.data.findIndex((item) => item === props.endTime);
        let startTimeArr = props.data.slice();
        startTimeArr.splice(-1, 1);
        this.state = {
            data: props.data,
            startTimeArr: startTimeArr,
            startTime: props.startTime,
            startTimeIndex: startTimeIndex,
            endTime: props.endTime,
            endTimeIndex: endTimeIndex,
        };
    }

    static defaultProps = {
        data: ['08:30', '18:00',],
        startTime: '08:00',
        endTime: '18:00',
    };

    componentDidMount() {

    }

    _onStartChange = (index) => {
        let {data, endTimeIndex} = this.state;
        let _index = endTimeIndex;
        if (endTimeIndex === 0) {
            _index = index < this.data.length - 1 ? index + 1 : index;
        }
        this.setState({
            startTime: data[index],
            startTimeIndex: index,
            endTime: data[_index],
            endTimeIndex: _index,
        });
    };

    _onEndTimeChange = (index) => {
        let {data} = this.state;
        this.setState({
            endTime: data[index],
            endTimeIndex: index,
        })
    };

    _onPressOK = () => {
        const {startTimeIndex, endTimeIndex} = this.state;
        const {onPress} = this.props;
        let startTime = this.data[startTimeIndex];
        let endTime = this.data[endTimeIndex];
        if (startTimeIndex > endTimeIndex) {
            ToastManager.show('结束时间不能小于开始时间，请重新选择');
        } else {
            onPress && onPress([startTime, endTime]);
            // console.log(startTime, endTime);
            ActionsManager.hide();
        }
    };

    _onPressCancel = () => {
        ActionsManager.hide();
    };

    render() {
        let {data, startTimeArr, startTime, endTime, startTimeIndex, endTimeIndex} = this.state;
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
                        index={startTimeIndex}
                        items={startTimeArr}
                        // defaultIndex={data.findIndex((item) => item === startTime)}
                        onChange={this._onStartChange}
                    />
                    <Wheel
                        style={styles.wheelStyle}
                        itemStyle={styles.itemStyle}
                        index={endTimeIndex}
                        items={data}
                        // defaultIndex={data.findIndex((item) => item === endTime)}
                        onChange={this._onEndTimeChange}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: CusTheme.isIPhoneX ? CusTheme.fitIPhoneXBottom : 0,
    },
    wheelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    wheelStyle: {
        height: 180,
        // width: CusTheme.screen_width / 3,
        flex: 1,
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
        color: CusTheme.areaActionTitleColor,
        fontSize: fontSize(14),
    }
});

export default TimeContent;
