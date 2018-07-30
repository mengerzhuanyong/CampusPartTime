/**
 * 速芽物流用户端 - BannerComponent
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Platform,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import {Carousel} from "teaset";
import SpinnerLoading from "./SpinnerLoading";

export default class BannerComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            swiperShow: false,
            bannerData: this.props.bannerData,
        };
    }

    static defaultProps = {
        bannerData: [],
    };

    componentDidMount() {
        this.timer =  setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            bannerData: nextProps.bannerData
        });
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    renderBanner = (row) => {
        if (this.state.swiperShow) {
            if (row.length <= 0) {
                return <SpinnerLoading/>;
            }
            let banners = row.map((item, index) => {
                return (
                    <TouchableOpacity
                        style={styles.bannerViewWrap}
                        key={"banner_" + index}
                        activeOpacity={1}
                        onPress={() => {
                            item.link && RouterHelper.navigate(item.title, 'CommonWebPage', {url: item.link});
                        }}
                    >
                        <ImageBackground
                            style={styles.headBackImage}
                            resizeMode={'contain'}
                            source={item.illustration ? {uri: item.illustration} : Images.img_banner}
                        />
                    </TouchableOpacity>
                )
            });
            // 这里不能输出信息，否则会陷入死循环
            return banners;
        }
    };

    render(){
        const { bannerData } = this.state;
        return (
            <ScrollView style={[styles.container]}>
                <Carousel
                    style={styles.headBackCarousel}
                    control={
                        <Carousel.Control
                            style={styles.carouselControlView}
                            dot={<View style={styles.carouselControl}/>}
                            activeDot={<View style={[styles.carouselControl, styles.carouselControlCur]}/>}
                        />
                    }
                >{this.renderBanner(bannerData)}</Carousel>

            </ScrollView>
        );
    }
}

const headBackImageW = SCREEN_WIDTH - ScaleSize(14) * 2;

const styles = StyleSheet.create({
    container: {
        marginTop: __IOS__ ? 0 : -20,
        backgroundColor: '#fff',
    },
    bannerViewWrap: {},

    carouselControlView: {
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    carouselControl: {
        width: ScaleSize(25),
        height: ScaleSize(10),
        marginRight: 5,
        borderRadius: ScaleSize(8),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    carouselControlCur: {
        backgroundColor: '#fff',
    },
    headBackCarousel: {
        width: headBackImageW,
        height: headBackImageW * 0.452,
        marginTop: ScaleSize(12),
        marginLeft: ScaleSize(14),
        borderRadius: ScaleSize(10),
        overflow: 'hidden',
    },
    headBackImage: {
        width: headBackImageW,
        height: headBackImageW * 0.452,
    },
});