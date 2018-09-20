'use strict';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

class SegmentedControlTab extends React.PureComponent {

    static propTypes = {
        style: ViewPropTypes.style,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        tabStyle: ViewPropTypes.style,
        activeTabStyle: ViewPropTypes.style,
        tabTextStyle: Text.propTypes.style,
        activeTabTextStyle: Text.propTypes.style,
        initSelectedIndex: PropTypes.number,
        onPress: PropTypes.func
    }

    static defaultProps = {
        initSelectedIndex: 0
    }

    constructor(props) {
        super(props)
        this.state = { selectedIndex: props.initSelectedIndex }
    }

    _onPress = (index) => {
        const { onPress } = this.props
        if (this.state.selectedIndex !== index) {
            this.setState({ selectedIndex: index })
        }
        onPress && onPress(index)
    }

    renderItem = (params) => {
        const { item, active, index } = params
        const { values, tabStyle, activeTabStyle, tabTextStyle, activeTabTextStyle } = this.props
        const tabStyleDefalt = active ? styles.activeTabStyle : styles.tabStyle
        const tabStyleProps = active ? activeTabStyle : tabStyle
        const tabTextStyleDefalt = active ? styles.activeTabTextStyle : styles.tabTextStyle
        const tabTextStyleProps = active ? activeTabTextStyle : tabTextStyle
        const borderRightWidth = index === values.length - 1 ? 0 : CusTheme.scBorderWidth
        return (
            <TouchableOpacity
                style={[styles.tabContainer, { borderRightWidth }, tabStyleDefalt, tabStyleProps]}
                onPress={() => this._onPress(index)}>
                <Text style={[tabTextStyleDefalt, tabTextStyleProps]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { style, values } = this.props
        const { selectedIndex } = this.state
        return (
            <View style={[styles.container, style]}>
                {values.map((item, index) => {
                    return (
                        <this.renderItem
                            key={`tab${index}`}
                            item={item}
                            active={selectedIndex === index}
                            index={index}
                        />
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: CusTheme.scBorderWidth,
        borderColor: CusTheme.scActiveTabColor,
        backgroundColor: '#fff',
    },
    tabContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        borderColor: CusTheme.scActiveTabColor,
    },
    tabStyle: {
        backgroundColor: CusTheme.scTabColor,
    },
    activeTabStyle: {
        backgroundColor: CusTheme.scActiveTabColor,
    },
    tabTextStyle: {
        color: CusTheme.scTabTextColor,
        fontSize: CusTheme.scTabTextFontSize,
    },
    activeTabTextStyle: {
        color: CusTheme.scActiveTabTextColor,
        fontSize: CusTheme.scActiveTabTextFontSize,
    },
});

export default SegmentedControlTab