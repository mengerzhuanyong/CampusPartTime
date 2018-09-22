/**
 * 校园空兼 - HotNewsComponent
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

export default class HotNewsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            noticeData: this.props.noticeData,
        };
    }

    static defaultProps = {
        noticeData: [],
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.noticeData);
        this.setState({
            noticeData: nextProps.noticeData
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    renderNotice = (row) => {
        if (row.length <= 0) {
            return null;
        }
        const notices = row.map((item, index) => {
            return (
                <TouchableOpacity
                    style={styles.noticeItemView}
                    key={"notice_" + index}
                    activeOpacity={1}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
                >
                    <Text style={styles.noticeContext} numberOfLines={1}>{item.content}{item.content}</Text>
                </TouchableOpacity>
            )
        });
        // 这里不能输出信息，否则会陷入死循环
        return notices;
    };

    render() {
        const {noticeData} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={styles.noticeIcon}
                    source={Images.icon_bell}
                />
                {noticeData.length > 0 ?
                    <Carousel
                        style={styles.noticeContainer}
                        control={false}
                        horizontal={false}
                        interval={5000}
                    >{this.renderNotice(noticeData)}</Carousel>
                    : <View style={styles.noticeContainer}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: ScaleSize(100),
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: ScaleSize(20),
    },

    noticeContainer: {
        flex: 1,
        height: ScaleSize(60),
        justifyContent: 'center',
        marginVertical: ScaleSize(20),
    },
    noticeIcon: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        resizeMode: 'contain',
        marginRight: 10,
    },
    noticeItemView: {
        flex: 1,
        height: ScaleSize(60),
        justifyContent: 'center',
    },
    noticeContext: {
        color: '#f4954e',
        fontSize: FontSize(12),
    },
});