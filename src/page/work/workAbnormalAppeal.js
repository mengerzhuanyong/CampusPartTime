/**
 * 校园空兼 - WorkAbnormalAppeal
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
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import {observer, inject} from 'mobx-react';

@inject('loginStore', 'mineStore', 'workStore')
@observer
export default class WorkAbnormalAppeal extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            listData: [1, 2, 3, 4],
            item: params && params.item ? params.item : {},
            description: '',
            reason: '',
            photos: [],
            uploading: false,
        };
    }

    componentDidMount() {
        // console.log(this.state.item)
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

    submitFoo = async () => {
        let {item, description, reason, photos} = this.state;
        const {workStore} = this.props;
        let url = ServicesApi.add_appeal;
        let data = {
            work_id: item.id,
            description,
            reason,
            photos,
        };
        try {
            let result = await workStore.onSubmitAbnormalAppeal(url, data);
            ToastManager.show(result.msg);
            if (result && result.code === 1) {
                RouterHelper.goBack();
            }
        } catch (e) {
            // console.log(e);
        }
    };

    handleImage = async () => {
        let result = await ImagePickerManager.showMultipleImagePicker({imageCount: 1, quality: 70, enableBase64: true});
        if (result.code === 1) {
            this.setState({uploading: true});
            let url = ServicesApi.upload;
            let data = result.data[0].path;
            let upRes = await FetchData.upload(url, data);
            this.setState({uploading: false});
            if (upRes && upRes.code === 1) {
                let images = this.state.photos.concat(upRes.data);
                this.setState({
                    photos: images,
                });
            } else {
                ToastManager.show('上传失败，请稍后重试');
            }
        }
    };

    deleteImageItem = (index) => {
        let {photos} = this.state;
        photos.splice(index, 1);
        this.setState({photos});
    };

    renderImagesView = (data) => {
        if (!data || data.length < 1) {
            return;
        }
        let images = data.map((obj, index) => {
            return (
                <TouchableOpacity
                    style={styles.uploadItemView}
                    key={obj+index}
                    onPress={() => this.deleteImageItem(index)}
                >
                    <View style={styles.deleteBtnView}>
                        <Image source={Images.icon_delete} style={styles.deleteIcon}/>
                    </View>
                    <Image
                        source={{uri: obj}}
                        style={[CusTheme.uploadIcon, styles.uploadItemImage]}
                    />
                </TouchableOpacity>
            );
        });
        return images;
    };

    render() {
        let {loading, listData, uploading, item, photos} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '异常申诉';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                        <View style={styles.orderGoodsPicView}>
                            <Image source={item.illustration ? {uri: item.illustration} : Images.img_goods1} style={styles.orderGoodsPic}/>
                        </View>
                        <View style={styles.orderGoodsTitleView}>
                            <Text style={styles.orderGoodsTitle} numberOfLines={3}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>异常描述</Text>
                        </View>
                        <View style={[styles.contentConView]}>
                            <TextInput
                                multiline={true}
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                // keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请描述异常情况'}
                                placeholderTextColor={'#999'}
                                // returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        description: text
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>申诉原因</Text>
                        </View>
                        <View style={[styles.contentConView]}>
                            <TextInput
                                multiline={true}
                                style={styles.inputItem}
                                ref={v => this.input = v}
                                // keyboardType={'numeric'}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入您的申诉原因'}
                                placeholderTextColor={'#999'}
                                // returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        reason: text
                                    });
                                }}
                            />
                        </View>
                        <View style={[styles.uploadImageView]}>
                            {this.renderImagesView(photos)}
                            {uploading && <View style={[styles.uploadItemView, styles.uploadItemViewBorder]}>
                                <SpinnerLoading isVisible={uploading}/>
                            </View>}
                            <TouchableOpacity
                                style={[styles.uploadItemView, styles.uploadItemViewBorder]}
                                onPress={this.handleImage}
                            >
                                <Image source={Images.icon_camera} style={styles.uploadIcon}/>
                                <Text style={styles.uploadTips}>上传截图</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button
                        title={'提交'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={this.submitFoo}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerRightView: {
        top: -22,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    contentTitleView: {
        height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
    },
    orderGoodsInfoView: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(200),
    },
    orderGoodsPic: {
        width: ScaleSize(200),
        height: ScaleSize(160),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(160),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        color: '#333',
        lineHeight: FontSize(20),
        fontSize: FontSize(16),
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    orderUserName: {},
    orderUserPhone: {},
    orderUserAddress: {},
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(25),
    },
    contentConView: {},
    inputItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        height: ScaleSize(190),
        textAlignVertical: 'top',
    },
    uploadImageView: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadItemView: {
        marginRight: 15,
        width: ScaleSize(180),
        height: ScaleSize(180),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f60',
        padding: ScaleSize(14),
    },
    uploadItemViewBorder: {
        width: ScaleSize(166),
        height: ScaleSize(166),
        padding: 0,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    deleteBtnView: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 5,
    },
    deleteIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },
    uploadItemImage: {
        width: ScaleSize(166),
        height: ScaleSize(166),
        resizeMode: 'cover',
        borderRadius: 3,
    },
    uploadIcon: {
        width: ScaleSize(90),
        height: ScaleSize(90),
        resizeMode: 'contain',
    },
    uploadTips: {
        color: '#999',
        marginTop: 2,
        fontSize: FontSize(13),
    },

    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
});