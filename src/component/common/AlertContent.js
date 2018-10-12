'use strict';
/**
 * 校园空兼 - 
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import { fontSize, scaleSize, isEmpty } from '../../util/Tool';
import CusTheme from '../../config/theme/Theme';


class AlertContent extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        titleStyle: Text.propTypes.style,
        detail: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        detailStyle: Text.propTypes.style,
        actions: PropTypes.array
        // 例如,
        //   actions: [
        //         { title: '取消', titleStyle: {}, onPress: () => alert('取消') },
        //         { title: '确定', titleStyle: {}, onPress: () => alert('取消') },
        //     ]
    };

    static defaultProps = {
        actions: []
    };

    constructor(props) {
        super(props)
    };
    _onPress = (params) => {
        setTimeout(() => {
            if (params !== undefined && params) {
                params()
            }
        }, 300); // 防止两个alert同时触发
        AlertManager.hide();
    };

    separator = (index) => {
        const {actions} = this.props;
        let separator;
        if (actions.length === 1) {
            separator = null
        } else {
            separator = actions.length - 1 === index ? null : styles.separator
        }
        return separator;
    };
    _renderTitleComponent = () => {
        const {title, titleStyle} = this.props;
        let titleComponent;
        if (React.isValidElement(title)) {
            titleComponent = title
        } else {
            titleComponent = !isEmpty(title) ? (
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            ) : null
        }
        return titleComponent
    };
    _renderDetailComponent = () => {
        const {detail, detailStyle} = this.props;
        // console.log(detail);
        let detailComponent;
        if (React.isValidElement(detail)) {
            detailComponent = detail
        } else {
            detailComponent = !isEmpty(detail) ? (
                <Text style={[styles.detail, detailStyle]}>{detail}</Text>
            ) : null
        }
        return detailComponent
    };
    render() {
        const {style, actions, actionStyle, btnStyle, showClose} = this.props;
        return (
            <View style={[styles.container, style]}>
                {showClose && <TouchableOpacity
                    style={styles.closeView}
                    onPress={() => this._onPress()}
                >
                    <Image source={Images.icon_close} style={styles.closeIcon} />
                </TouchableOpacity>}
                {this._renderTitleComponent()}
                {this._renderDetailComponent()}
                <View style={[styles.actionContainer , actionStyle]}>
                    {actions.map((item, index) => {
                        return (
                            <TouchableHighlight
                                key={`action_${index}`}
                                underlayColor={'#eee'}
                                style={[styles.action, this.separator(index), item.btnStyle]}
                                onPress={() => this._onPress(item.onPress)}
                            >
                                <Text style={[styles.actionText, item.titleStyle]}>
                                    {item.title}
                                </Text>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#fff',
        // width: CusTheme.alertWidth,
        minWidth: CusTheme.alertWidth,
        minHeight: CusTheme.alertMinHeight,
    },
    closeView: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: scaleSize(40),
        height: scaleSize(40),
        // backgroundColor: '#123',
    },
    closeIcon: {
        width: scaleSize(40),
        height: scaleSize(40),
        resizeMode: 'contain',
    },
    title: {
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: fontSize(15),
        maxWidth: CusTheme.alertTitleMaxWidth,
    },
    detail: {
        color: '#555',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: fontSize(12),
        // minHeight: scaleSize(80),
        lineHeight: scaleSize(44),
        maxWidth: CusTheme.alertDetailMaxWidth,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: CusTheme.alertWidth,
        height: CusTheme.alertActionHeight,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: CusTheme.alertSeparatorColor,
    },
    action: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: CusTheme.alertActionHeight,
    },
    actionText: {
        color: CusTheme.alertActionColor,
        fontSize: fontSize(13),
    },
    separator: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: CusTheme.alertSeparatorColor,
    },
});

export default AlertContent;
