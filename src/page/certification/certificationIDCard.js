/**
 * 校园空兼 - CertificationIDCard
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import {Button} from 'teaset'
import NavigationBar from '../../component/navigation/NavigationBar'
import Container from '../../component/common/Container'
import {inject, observer} from "mobx-react/index";
import SpinnerLoading from "../../component/common/SpinnerLoading";

const options = {
    imageCount: 1,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: false,             // 是否允许裁剪，默认false
    CropW: ~~(SCREEN_WIDTH * 0.8),    // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(SCREEN_WIDTH * 0.5),    // 裁剪高度，默认屏幕宽度60%
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false,       // 是否隐藏裁剪区域网格，默认false
    quality: 70,                // 压缩质量
    enableBase64: true,
};

@inject('loginStore', 'mineStore', 'systemStore')
@observer
export default class CertificationIDCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading1: false,
            uploading2: false,
            realname: '',
            id_number: '',
            image_1: '',
            image_2: '',
        };
    }

    componentWillUnmount() {
        let timers = [this.timer1,];
        ClearTimer(timers);
    }

    handlerImages = async (type) => {
        let result = await ImagePickerManager.showMultipleImagePicker(options);
        console.log(result);
        if (result.code === 1) {
            if (type === 1) {
                this.setState({uploading1: true});
            } else {
                this.setState({uploading2: true});
            }
            let data = {
                image: result.data[0].base64,
            };
            if (type === 1) {
                this.onSubmitIdCardPhoto(data);
            } else {
                this.setState({image_2: data.image, uploading2: false});
            }
        }
    };

    onSubmitIdCardPhoto = async (data) => {
        const {mineStore} = this.props;
        let url = ServicesApi.id_verify_photo;
        try {
            let result = await mineStore.onSubmitIdCardOCR(url, data, true);
            if (result.code === 1) {
                this.setState({image_1: data.image, uploading1: false});
            } else {
                ToastManager.show(result.msg);
                this.setState({uploading1: false});
            }
        } catch (e) {
            this.setState({uploading1: false});
        }
    };

    onSubmitIdCardVerify = async () => {
        let {realname, id_number, image_1, image_2} = this.state;
        const {mineStore} = this.props;
        let {idCardInfo} = mineStore;
        const {onSubmitIdCardVerify} = mineStore;
        let url = ServicesApi.id_verify;
        let data = {
            realname: idCardInfo.name,
            id_number: idCardInfo.id_number,
            image_1,
            image_2,
        };
        try {
            let result = await onSubmitIdCardVerify(url, data);
            ToastManager.show(result.msg);
            if (result.code === 1) {
                let _url = ServicesApi.my_details;
                let _result = await mineStore.requestMyProfile(_url);
                this.timer1 = setTimeout(() => {
                    RouterHelper.goBack();
                }, 500);
            }
        } catch (e) {

        }
    };

    render() {
        let {mineStore} = this.props;
        let {idCardInfo, myProfile} = mineStore;
        let {image_1, image_2, uploading1, uploading2} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '身份证认证';
        if (myProfile.id_card_status === 1) {
            return (
                <Container style={styles.container}>
                    <NavigationBar
                        title={pageTitle}
                    />
                    <KeyboardAvoidingView style={styles.content}>
                        <ScrollView
                            style={styles.scrollContent}
                            keyboardShouldPersistTaps={'handled'}
                        >
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.uploadItemView}
                                onPress={() => this.handlerImages(1)}
                            >
                                {image_1 !== '' ?
                                    <Image source={{uri: image_1}} style={styles.uploadImage}/>
                                    :
                                    <View style={styles.uploadContent}>
                                        {uploading1 ?
                                            <SpinnerLoading isVisible={uploading1}/>
                                            :
                                            <View style={styles.uploadContentTips}>
                                                <Image source={Images.icon_plus} style={styles.uploadIcon}/>
                                                <Text style={styles.uploadBtnName}>手持证件照</Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.uploadItemView}
                                onPress={() => this.handlerImages(2)}
                            >
                                {image_2 !== '' ?
                                    <Image source={{uri: image_2}} style={styles.uploadImage}/>
                                    :
                                    <View style={styles.uploadContent}>
                                        {uploading2 ?
                                            <SpinnerLoading isVisible={uploading2}/>
                                            :
                                            <View style={styles.uploadContentTips}>
                                                <Image source={Images.icon_plus} style={styles.uploadIcon}/>
                                                <Text style={styles.uploadBtnName}>身份证正面照</Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </TouchableOpacity>
                            <View style={styles.userInfoTipsView}>
                                <Image source={Images.icon_notice} style={styles.userInfoTipsIcon}/>
                                <Text style={styles.userInfoTipsText}>请确认您的身份信息</Text>
                            </View>
                            <View style={styles.userInfoItemView}>
                                <Image source={Images.icon_user_line} style={styles.userInfoItemIcon}/>
                                <Text style={styles.userInfoItemTitle}>姓名：</Text>
                                <TextInput
                                    style={styles.userInfoItemInput}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'自动识别您的姓名'}
                                    returnKeyType={'done'}
                                    editable={false}
                                    value={idCardInfo.name}
                                />
                            </View>
                            <View style={styles.userInfoItemView}>
                                <Image source={Images.icon_user_card} style={styles.userInfoItemIcon}/>
                                <Text style={styles.userInfoItemTitle}>身份证号：</Text>
                                <TextInput
                                    style={styles.userInfoItemInput}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'自动识别您的身份证号'}
                                    maxLength={18}
                                    returnKeyType={'done'}
                                    editable={false}
                                    value={idCardInfo.id_number}
                                />
                            </View>
                            <Button
                                title={'提交认证'}
                                style={styles.submitBtnView}
                                titleStyle={styles.submitBtnName}
                                onPress={this.onSubmitIdCardVerify}
                            />
                            <View style={CusTheme.contentTipsView}>
                                <Text style={CusTheme.contentTipsCon}>{mineStore.certificationTips}</Text>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Container>
            );
        }
        return (
            <Container style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.scrollContent}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={styles.uploadItemView}>
                            <Image source={{uri: myProfile.id_card_detail.image_1}} style={styles.uploadImage}/>
                        </View>
                        <View style={styles.uploadItemView}>
                            <Image source={{uri: myProfile.id_card_detail.image_2}} style={styles.uploadImage}/>
                        </View>
                        <View style={styles.userInfoTipsView}>
                            <Image source={Images.icon_notice} style={styles.userInfoTipsIcon}/>
                            <Text style={styles.userInfoTipsText}>您的身份信息</Text>
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_line} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>姓名：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'自动识别您的姓名'}
                                returnKeyType={'done'}
                                editable={false}
                                value={myProfile.id_card_detail.username}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_card} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>身份证号：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'自动识别您的身份证号'}
                                maxLength={18}
                                returnKeyType={'done'}
                                editable={false}
                                value={myProfile.id_card_detail.id_number}
                            />
                        </View>
                        <View style={[CusTheme.contentTipsView, CusTheme.contentTipsViewMargin]}>
                            <Text style={CusTheme.contentTipsCon}>{mineStore.certificationTips}</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Container>
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
    },
    scrollContent: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    uploadItemView: {
        padding: 20,
        borderRadius: 4,
        marginVertical: 10,
        // marginHorizontal: 10,
        alignItems: 'center',
        height: ScaleSize(360),
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    uploadContent: {
        flex: 1,
    },
    uploadContentTips: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadImage: {
        width: SCREEN_WIDTH - 40,
        height: ScaleSize(320),
        resizeMode: 'contain',
    },
    uploadIcon: {
        marginVertical: 15,
        resizeMode: 'contain',
        width: ScaleSize(120),
        height: ScaleSize(120),
    },
    uploadBtnName: {
        color: '#999',
        fontSize: FontSize(15),
    },
    userInfoTipsView: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userInfoTipsIcon: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        resizeMode: 'contain',
        marginRight: 10,
    },
    userInfoTipsText: {
        color: '#333',
        fontSize: FontSize(14),
    },
    userInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 3,
    },
    userInfoItemIcon: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        resizeMode: 'contain',
        marginRight: 10,
    },
    userInfoItemTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    userInfoItemInput: {
        flex: 1,
        height: 45,
        color: '#555',
        fontSize: FontSize(14),
    },
    submitBtnView: {
        height: 45,
        borderWidth: 0,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: CusTheme.themeColor,
    },
    submitBtnName: {
        color: '#fff',
        fontSize: FontSize(15),
    },
});