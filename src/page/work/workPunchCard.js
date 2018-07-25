/**
 * 校园空兼 - WorkPunchCard
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import {QRscanner} from 'react-native-qr-scanner';


export default class WorkPunchCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1, 2, 3, 4],
        };
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    renderHeaderRightView = () => {
        return (
            <TouchableOpacity
                style={[CusTheme.headerButtonView, styles.headerRightView]}
                onPress={() => this.onPushToNextPage('异常申诉', 'WorkAbnormalAppeal', {})}
            >
                <Text style={CusTheme.headerBtnName}>异常申诉</Text>
            </TouchableOpacity>
        )
    };

    onRead = (res) => {
        // console.log(res);
    };

    render() {
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '打卡';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <QRscanner
                        onRead={this.onRead}
                        finderY={-30}
                        hintText={'将二维码放入框内，即可自动扫描'}
                        hintTextPosition={ScaleSize(180)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    content: {
        flex: 1,
        backgroundColor: '#eee',
    }
});