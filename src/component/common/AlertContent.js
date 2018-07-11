'use strict'
/**
 * 校园空兼 - 
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types'
import { fontSize, scaleSize, isEmpty } from '../../util/Tool';
import Theme from '../../config/Theme';


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
        AlertManager.hide()
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
        const {style, actions, actionStyle, btnStyle} = this.props;
        return (
            <View style={[styles.container, style]}>
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
        width: Theme.alertWidth,
        minHeight: Theme.alertMinHeight,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    title: {
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: fontSize(15),
        maxWidth: Theme.alertTitleMaxWidth,
    },
    detail: {
        color: '#555',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: fontSize(13),
        // minHeight: scaleSize(80),
        lineHeight: scaleSize(44),
        maxWidth: Theme.alertDetailMaxWidth,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Theme.alertWidth,
        height: Theme.alertActionHeight,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Theme.alertSeparatorColor,
    },
    action: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Theme.alertActionHeight,
    },
    actionText: {
        color: Theme.alertActionColor,
        fontSize: fontSize(14),
    },
    separator: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: Theme.alertSeparatorColor,
    },
});

export default AlertContent;
