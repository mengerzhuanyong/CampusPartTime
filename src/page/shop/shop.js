/**
 * 校园空兼 - Shop
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView/index'
import ImageView from '../../component/common/ImageView'
import {inject, observer} from 'mobx-react'
import {Button} from 'teaset'
import FlatListView from '../../component/common/FlatListView'
import AreaContent from '../../component/common/AreaContent'
import Container from '../../component/common/Container';
import Countdown from '../../component/common/Countdown';
import {action} from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {scaleSize} from "../../util/Tool";


@inject('testStore111111')
@observer
export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.page = 0
    }

    componentDidMount() {
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerLeftView}>
                    <Image source={Images.icon_place} style={Theme.headerIcon} />
                    <Text style={[Theme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                <Text style={[Theme.headerTitle, styles.headerTitle]}>换购</Text>
                <TouchableOpacity style={styles.headerRightView}>
                    <Image source={Images.icon_message} style={Theme.headerIcon}/>
                    <View style={Theme.pointView} />
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        let {loading} = this.state;
        return (
            <Container fitIPhoneX={false} keyboardShouldPersistTaps={true}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'default'}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerView: {
        flex: 1,
        paddingHorizontal: 15,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123'
    },
    headerLeftView: {
        left: 15,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    headerIconTitle: {
        fontSize: FontSize(11),
        color: Theme.themeColor,
    },
    headerRightView: {
        right: 15,
        position: 'absolute',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },
});