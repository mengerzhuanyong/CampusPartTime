/**
 * 校园空兼 - AddressAdd
 * http://menger.me
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
    Keyboard,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, KeyboardAvoidingView,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
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
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine} from '../../component/common/commonLine'
import GoodsItem from "../../component/item/goodsItem";
import GoodsCarousel from "../../component/shop/GoodsCarousel"

@inject('loginStore', 'addressStore')
@observer
export default class AddressAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            mobile: '',
            area: [],
            address: '',
        };
    }

    componentWillUnmount() {
        // const {addressStore} = this.props;
        // addressStore.onChangeMangeStatus();
    }

    pickerArea = () => {
        Keyboard.dismiss();
        ActionsManager.showArea((info) => {
            // console.log(info);
            this.setState({
                area: info
            });
        });
    };

    onSubmitAddress = async () => {
        const {addressStore} = this.props;
        let {username, mobile, area, address} = this.state;
        let url = ServicesApi.address_add;
        let data = {
            username,
            mobile,
            area,
            address,
        };
        if (!CheckMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        }
        let result = await addressStore.onSubmitAddress(url, data);
        ToastManager.show(result.msg);
        if (result && result.code === 1) {
            let _url = ServicesApi.address_list;
            let _data = {
                page: 1,
            };
            this.timer = setTimeout(() => {
                RouterHelper.goBack();
                addressStore.requestDataSource(_url, _data);
            })
        }
    };

    render() {
        let {username, mobile, area, address} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '新增地址';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.content}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={[styles.addressAddItemView]}>
                            <TextInput
                                style={styles.inputItemCon}
                                placeholder="请输入联系人姓名"
                                defaultValue={username}
                                placeholderTextColor='#555'
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    this.setState({
                                        username: text
                                    })
                                }}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={[styles.addressAddItemView]}>
                            <TextInput
                                style={styles.inputItemCon}
                                placeholder="请输入联系人电话"
                                placeholderTextColor='#555'
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                maxLength={11}
                                defaultValue={mobile}
                                customKeyboardType="numberKeyBoard"
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text
                                    })
                                }}
                            />
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={[styles.addressAddItemView]}>
                            <TouchableOpacity
                                style={styles.itemContentView}
                                onPress={this.pickerArea}
                            >
                                <Text style={[styles.areaContext]}>{area.length > 0 ? area : '请选择所在省市'}</Text>
                                <Image source={Images.icon_arrow_right} style={styles.arrowIcon}/>
                            </TouchableOpacity>
                        </View>
                        <HorizontalLine lineStyle={styles.horLine}/>
                        <View style={[styles.addressAddItemView]}>
                            <TextInput
                                style={styles.inputItemCon}
                                placeholder="请输入详细地址"
                                defaultValue={address}
                                placeholderTextColor='#555'
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.multiBtnView}>
                            <Button
                                title={'确定'}
                                style={[CusTheme.btnView, styles.btnView]}
                                titleStyle={[CusTheme.btnName, styles.btnName]}
                                onPress={this.onSubmitAddress}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    horLine: {
        // marginVertical: 5,
        // backgroundColor: '#123',
    },
    addressAddItemView: {
        padding: 15,
        height: 60,
        backgroundColor: '#fff',
    },
    inputItemConView: {
        height: 45,
        justifyContent: 'center',
    },
    inputItemCon: {
        height: 45,
        fontSize: 14,
        color: '#555',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressAddTips: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressAddTipsName: {
        fontSize: 15,
        color: '#555',
    },
    itemContentView: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    areaContext: {
        fontSize: 14,
        color: '#555',
    },
    multiBtnView: {
        marginVertical: 40,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnView: {
        flex: 1,
    },
    btnName: {},
});