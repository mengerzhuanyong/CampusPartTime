'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity, Animated, ViewPropTypes, StyleSheet, ImageBackground } from 'react-native';
import SegmentedItem from './SegmentedItem';

class SegmentedBar extends React.PureComponent {

    static propTypes = {
        ...ViewPropTypes,
        justifyItem: PropTypes.oneOf(['fixed', 'scrollable']),
        indicatorType: PropTypes.oneOf(['none', 'boxWidth', 'itemWidth', 'customWidth']),
        indicatorPosition: PropTypes.oneOf(['top', 'bottom']),
        indicatorLineColor: PropTypes.string,
        indicatorLineWidth: PropTypes.number, // 指示器的高度
        indicatorWidth: PropTypes.number, // 指示器的宽度,indicatorType=customWidth时有效
        indicatorPositionPadding: PropTypes.number,
        animated: PropTypes.bool,
        autoScroll: PropTypes.bool,
        activeIndex: PropTypes.number, //if use this prop, you need update this value from onChange event
        onChange: PropTypes.func, //(index)
        barBackgroundImage: PropTypes.number
    };

    static defaultProps = {
        ...View.defaultProps,
        justifyItem: 'fixed',
        indicatorType: 'itemWidth',
        indicatorPosition: 'bottom',
        animated: true,
        autoScroll: true,
        indicatorWidth: 0,
        barBackgroundImage: null
    };

    static Item = SegmentedItem;

    constructor(props) {
        super(props);
        this._activeIndex = this.props.activeIndex ? this.props.activeIndex : 0;
        this._buttonsLayout = this.makeArray([], props.children);
        this._itemsLayout = this.makeArray([], props.children);
        this._itemsAddWidth = this.makeArray([], props.children, 0);
        this._indicatorX = 0
        this._indicatorWidth = 0
        this._scrollViewWidth = 0;
        this._scrollViewContentWidth = 0
    }

    componentWillReceiveProps(nextProps) {
        let nextItemsLayout = this.makeArray(this._itemsLayout, nextProps.children);
        if (nextItemsLayout.length !== this._itemsLayout.length) {
            this._buttonsLayout = this.makeArray(this._buttonsLayout, nextProps.children);
            this._itemsLayout = nextItemsLayout;
            this._itemsAddWidth = this.makeArray(this._itemsAddWidth, nextProps.children, 0);
        }
        if (nextProps.activeIndex || nextProps.activeIndex === 0) {
            this._activeIndex = nextProps.activeIndex;
        }
        if (this._activeIndex >= nextItemsLayout.length) {
            this._activeIndex = nextItemsLayout.length - 1;
        }
        this.props = nextProps;
        this.updateIndicator();

    }

    get activeIndex() {
        return this._activeIndex;
    }

    set activeIndex(value) {
        if (this._activeIndex !== value) {
            this._activeIndex = value;
            this.updateIndicator();
            this.forceUpdate();
            this.props.onChange && this.props.onChange(value);
        }
    }

    get indicatorXValue() {
        switch (this.props.indicatorType) {
            case 'boxWidth':
                return this._buttonsLayout[this._activeIndex].x;
            case 'itemWidth':
                return this._buttonsLayout[this._activeIndex].x + this._itemsLayout[this._activeIndex].x + this._itemsAddWidth[this._activeIndex] / 2;
            case 'customWidth':
                let offset = (this._itemsLayout[this._activeIndex].width - this.props.indicatorWidth) / 2
                return offset + this._buttonsLayout[this._activeIndex].x + this._itemsLayout[this._activeIndex].x + this._itemsAddWidth[this._activeIndex] / 2;
        }
        return 0;
    }

    get indicatorWidthValue() {
        const boxWidth = this._buttonsLayout[this.activeIndex].width
        const itemWidth = this._itemsLayout[this.activeIndex].width - this._itemsAddWidth[this._activeIndex]
        if (boxWidth === 0 || itemWidth === 0) {
            return 0
        }
        switch (this.props.indicatorType) {
            case 'boxWidth':
                return boxWidth
            case 'itemWidth':
                return itemWidth
            case 'customWidth':
                return this.props.indicatorWidth
        }
        return 0;
    }

    makeArray = (olders, items, empty = { x: 0, y: 0, width: 0, height: 0 }) => {
        if (items instanceof Array) return items.map((item, index) => {
            return index < olders.length ? olders[index] : empty;
        });
        else if (items) return [olders.length > 0 ? olders[0] : empty];
        return [];
    }

    checkInitIndicator = () => {
        if (this._indicatorX && this._indicatorWidth) {
            this._indicatorX.setValue(this.indicatorXValue);
            this._indicatorWidth.setValue(this.indicatorWidthValue);
        } else {
            this._indicatorX = new Animated.Value(this.indicatorXValue);
            this._indicatorWidth = new Animated.Value(this.indicatorWidthValue);
        }
        this.forceUpdate();
    }

    updateIndicator = () => {
        if (!this._indicatorX || !this._indicatorWidth) {
            return;
        }
        let indicatorXValue = this.indicatorXValue;
        let indicatorWidthValue = this.indicatorWidthValue;
        if (indicatorXValue === this._saveIndicatorXValue
            && indicatorWidthValue === this._saveIndicatorWidthValue) {
            return;
        }
        this._saveIndicatorXValue = indicatorXValue;
        this._saveIndicatorWidthValue = indicatorWidthValue;
        if (this.props.animated) {
            Animated.parallel([
                Animated.spring(this._indicatorX, { toValue: indicatorXValue, friction: 9, useNativeDriver: true, }),
                // Animated.spring(this._indicatorWidth, { toValue: indicatorWidthValue, friction: 9 }),
            ]).start();
        } else {
            this._indicatorX.setValue(indicatorXValue);
            this._indicatorWidth.setValue(indicatorWidthValue);
        }

        if (this.props.autoScroll && this.refs.scrollView) {
            let contextWidth = 0;
            this._buttonsLayout.map(item => contextWidth += item.width);
            let x = indicatorXValue + indicatorWidthValue / 2 - this._scrollViewWidth / 2
            if (x < 0 || this._scrollViewWidth === 0) {
                x = 0;
            } else if (this._scrollViewWidth > this._scrollViewContentWidth) {
                x = 0
            }
            else if (x > contextWidth - this._scrollViewWidth && this._scrollViewWidth < this._scrollViewContentWidth) {
                x = contextWidth - this._scrollViewWidth;
            }
            this.refs.scrollView.scrollTo({ x: x, y: 0, animated: this.props.animated });
        }
    }

    isEqualLayout = (obj1, obj2) => {
        return obj1.x === obj2.x && obj1.y === obj2.y && obj1.width === obj2.width && obj1.height === obj2.height;
    }

    onAddWidth = (index, width) => {
        if (width !== this._itemsAddWidth[index]) {
            this._itemsAddWidth[index] = width;
            this.forceUpdate();
        }
    }

    onButtonPress = (index) => {
        this.activeIndex = index;
    }

    onButtonLayout = (index, e) => {
        let { layout } = e.nativeEvent;
        layout = {
            x: layout.x,
            y: layout.y,
            width: Math.round(layout.width),
            height: Math.round(layout.height),
        }
        if (!this.isEqualLayout(layout, this._buttonsLayout[index])) {
            this._buttonsLayout[index] = layout;
            this.checkInitIndicator();
        }
    }

    onItemLayout = (index, e) => {
        let { layout } = e.nativeEvent;
        layout = {
            x: layout.x,
            y: layout.y,
            width: Math.round(layout.width),
            height: Math.round(layout.height),
        }
        if (!this.isEqualLayout(layout, this._itemsLayout[index])) {
            this._itemsLayout[index] = layout;
            this.checkInitIndicator();
        }
    }

    onScrollViewLayout = (e) => {
        this._scrollViewWidth = e.nativeEvent.layout.width;
        this.props.onLayout && this.props.onLayout(e);
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this._scrollViewContentWidth = contentWidth
        this.props.onContentSizeChange && this.props.onContentSizeChange(contentWidth, contentHeight);
    }

    renderIndicator = () => {
        let { indicatorLineColor, indicatorLineWidth, indicatorPositionPadding } = this.props;
        let style = {
            backgroundColor: indicatorLineColor ? indicatorLineColor : CusTheme.sbIndicatorLineColor,
            transform: [{
                translateX: this._indicatorX
            }],
            width: this.indicatorWidthValue,
            height: indicatorLineWidth || indicatorLineWidth === 0 ? indicatorLineWidth : CusTheme.sbIndicatorLineWidth,
        };
        if (this.props.indicatorPosition === 'top') {
            style = { ...style, top: indicatorPositionPadding || indicatorPositionPadding === 0 ? indicatorPositionPadding : CusTheme.sbIndicatorPositionPadding }
        } else {
            style = { ...style, bottom: indicatorPositionPadding || indicatorPositionPadding === 0 ? indicatorPositionPadding : CusTheme.sbIndicatorPositionPadding }
        }
        return (
            <Animated.View style={[styles.indicator, style]} />

        );
    }

    renderItem = (item, index) => {
        const { style, itemStyle, ...others } = item.props
        return (
            <TouchableOpacity
                key={`todo_bar${index}`}
                style={[styles.itemTouchContainer, itemStyle]}
                onPress={() => this.onButtonPress(index)}
                onLayout={e => this.onButtonLayout(index, e)}>
                <SegmentedBar.Item
                    {...others}
                    active={index === this.activeIndex}
                    onLayout={(e) => this.onItemLayout(index, e)}
                    onAddWidth={(width) => this.onAddWidth(index, width)}
                />
            </TouchableOpacity>
        )
    }

    renderFixed() {
        let { style, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorLineWidth, indicatorPositionPadding, animated, activeIndex, onChange, children, barBackgroundImage, ...others } = this.props;

        return (
            <View style={[styles.barStyle, style]} >
                <ImageBackground style={styles.barImage} source={barBackgroundImage} />
                {children.map((item, index) => {
                    return this.renderItem(item, index)
                })}
                {this.renderIndicator()}
            </View>
        );
    }

    renderScrollable = () => {
        const { style, justifyItem, indicatorType, indicatorPosition, indicatorLineColor, indicatorLineWidth, indicatorPositionPadding, animated, activeIndex, onChange, onLayout, children, barBackgroundImage, ...others } = this.props;
        return (
            <View style={styles.barStyleContainer}>
                <ImageBackground style={styles.barImage} source={barBackgroundImage} />
                <ScrollView
                    style={[styles.barStyle, style]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollsToTop={false}
                    removeClippedSubviews={false}
                    onLayout={this.onScrollViewLayout}
                    ref='scrollView'
                    onContentSizeChange={this.onContentSizeChange}
                    {...others}>
                    {children.map((item, index) => {
                        return this.renderItem(item, index)
                    })}
                    {this.renderIndicator()}
                </ScrollView>
            </View>
        );
    }

    render() {
        return this.props.justifyItem === 'scrollable' ? this.renderScrollable() : this.renderFixed();
    }
}

const styles = StyleSheet.create({
    barStyleContainer: {

    },
    barStyle: {
        height: CusTheme.sbHeight,
        backgroundColor: CusTheme.sbColor,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    barImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    itemTouchContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        position: 'absolute',
    }
});
export default SegmentedBar