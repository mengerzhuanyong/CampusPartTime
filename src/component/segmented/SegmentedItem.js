// SegmentedItem.js

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes, StyleSheet } from 'react-native';
import { Badge } from 'teaset';

class SegmentedItem extends React.PureComponent {

    static propTypes = {
        ...ViewPropTypes,
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        titleStyle: Text.propTypes.style,
        activeTitleStyle: Text.propTypes.style,
        active: PropTypes.bool,
        // badge: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
        // onAddWidth: PropTypes.func, //(width)
    };

    static defaultProps = {
        ...View.defaultProps,
        active: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            badgeWidth: 0,
        };
    }

    renderItem = () => {
        const { title, titleStyle, active, activeTitleStyle, badge, } = this.props;
        let titleItem = null
        if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
            const textStyle = active ? styles.actionTextStyle : styles.textStyle
            const textStyleProps = active ? activeTitleStyle : titleStyle
            titleItem = (
                <Text
                    key='title'
                    style={[textStyle, textStyleProps]}
                    numberOfLines={1}>
                    {title}
                </Text>
            )
        }
        return (
            <View style={styles.itemContainer}>
                {titleItem}
            </View>
        )
    }

    render() {
        const { style, onLayout } = this.props
        return (
            <View style={[styles.container, style]} onLayout={onLayout}>
                {this.renderItem()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: CusTheme.sbBtnPaddingTop,
        paddingBottom: CusTheme.sbBtnPaddingBottom,
        paddingLeft: CusTheme.sbBtnPaddingLeft,
        paddingRight: CusTheme.sbBtnPaddingRight,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {

    },
    textStyle: {
        color: CusTheme.sbBtnTitleColor,
        fontSize: CusTheme.sbBtnTextFontSize,
    },
    actionTextStyle: {
        color: CusTheme.sbBtnActiveTitleColor,
        fontSize: CusTheme.sbBtnActiveTextFontSize,
    }
});

export default SegmentedItem
