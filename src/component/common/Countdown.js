/**
 * 校园空兼 - 
 * http://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import BackgroundTimer from 'react-native-background-timer';
import { sec_to_time_day } from '../../util/Tool';

// 倒计时组件
class Countdown extends React.PureComponent {

    static propTypes = {
        deadline: PropTypes.number, // 截止时间,秒
        millisec: PropTypes.number, // 间隔
        backgroundTime: PropTypes.bool,// 应用切换到后台也会执行倒计时
        onIntervalChange: PropTypes.func,
        onIntervalStart: PropTypes.func,
        onIntervalStop: PropTypes.func,
    };

    static defaultProps = {
        deadline: 1527908410,
        millisec: 1000,
        backgroundTime: true
    };

    constructor(props) {
        super(props);
        this.intervalId = null
        this.currentTime = Moment().format('X')
        this.difference = props.deadline - this.currentTime
        let timeArr = [0, 0, 0, 0]
         // console.log('this.difference', this.difference)
        if (this.difference >= 0) {
            timeArr = sec_to_time_day(this.difference)
        }
        this.state = { time: `${timeArr[0]}天 ${timeArr[1]}小时 ${timeArr[2]}分 ${timeArr[3]}秒` }
    };

    componentDidMount() {
        this.startInterval()
    };

    componentWillUnmount() {
        this.stopInterval()
    };

    startInterval = () => {
        const { millisec, backgroundTime, onIntervalStart } = this.props
        if (backgroundTime) {
            BackgroundTimer.start();
        }
        this.intervalId = BackgroundTimer.setInterval(this.intervalCallBack, millisec);
        onIntervalStart && onIntervalStart()
    };

    stopInterval = () => {
        const { backgroundTime, onIntervalStop } = this.props
        if (backgroundTime) {
            BackgroundTimer.stop()
        }
        BackgroundTimer.clearInterval(this.intervalId)
        this.intervalId = null
        onIntervalStop && onIntervalStop(this.difference)
    };

    intervalCallBack = () => {
        const { deadline, onIntervalChange } = this.props
        this.currentTime = Moment().format('X')
        this.difference = deadline - this.currentTime
        if (this.difference >= 0) {
            let timeArr = sec_to_time_day(this.difference)
            this.setState({ time: `${timeArr[0]}天 ${timeArr[1]}小时 ${timeArr[2]}分 ${timeArr[3]}秒` })
        }
        if (this.difference === 0) {
            this.stopInterval()
            return;
        }
        onIntervalChange && onIntervalChange(this.difference)
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.time}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {

    },
});

export default Countdown;
