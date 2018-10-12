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
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import {QRscanner} from 'react-native-qr-scanner';


const ScannerOptions = {
    zoom: 0,
    finderY: -30,
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    hintTextPosition: ScaleSize(180),
    hintText: '将二维码放入框内，即可自动扫描',
};

@inject('loginStore', 'mineStore', 'workStore')
@observer
export default class WorkPunchCard extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            listData: [1, 2, 3, 4],
            item: params && params.item ? params.item : {
                job_info: {},
                user_info: {},
            },
        };
    }

    renderHeaderRightView = () => {
        return (
            <TouchableOpacity
                style={[CusTheme.headerButtonView, styles.headerRightView]}
                onPress={() => RouterHelper.navigate('异常申诉', 'WorkAbnormalAppeal', {})}
            >
                <Text style={CusTheme.headerBtnName}>异常申诉</Text>
            </TouchableOpacity>
        )
    };

    onBack = async () => {
        // const {workStore} = this.props;
        // let {item} = this.state;
        // let url = ServicesApi.work_bench_job_details;
        // let data = {
        //     id: item.id,
        // };
        // let result = await workStore.requestWorkBenchDetail(url, data);
    };

    onRead = async (res) => {
        // console.log(res);
        let {params} = this.props.navigation.state;
        let {onSubmitPunchCard} = params;
        onSubmitPunchCard && onSubmitPunchCard(res);
        RouterHelper.goBack();

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
                        zoom={ScannerOptions.zoom}
                        finderY={ScannerOptions.finderY}
                        rectWidth={ScannerOptions.width}
                        hintText={ScannerOptions.hintText}
                        rectHeight={ScannerOptions.height}
                        hintTextPosition={ScannerOptions.hintTextPosition}
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