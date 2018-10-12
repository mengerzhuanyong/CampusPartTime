'use strict'
import React from 'react';
import { View, StyleSheet, ScrollView, ViewPagerAndroid, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types'
import SegmentedBar from './SegmentedBar'
import SceneView from './SceneView';

class SegmentedView extends React.PureComponent {

    static propTypes = {
        ...SegmentedBar.propTypes,
        pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
        showSegmentedBar: PropTypes.bool,
        initialPage: PropTypes.number,
        scrollEnabled: PropTypes.bool,
        // 在安卓上，如果你使用ScrollView包裹CusSegmentedView，那么务必给一个pageHeight高度值,
        // iOS上不用设置，但是嵌套ScrollView在iOS上想占满屏幕也必须给View一个高度才行。
        pageHeight: PropTypes.number,
        lazy: PropTypes.bool, // 懒加载
        lazyDelay: PropTypes.number, // 如果你的页面是请求数据，请设置延迟为0。如果你的页面是直接就加载的，请设置350或者自定义
    }
    static defaultProps = {
        ...SegmentedBar.defaultProps,
        initialPage: 0,
        scrollEnabled: true,
        lazy: true,
        lazyDelay: 0,
        showSegmentedBar: true,
    }
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, activeIndex: props.initialPage }
        this._dragScroll = false
    }

    componentDidMount() {
        if (__IOS__) {
            this.time1 = setTimeout(() => this.changeScrollPage(this.props.initialPage, false), 50);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.time1)
        clearTimeout(this.time2)
        // console.log(this.time1, this.time2)
    }

    setNativeProps(props) {
        if (__IOS__ && this._scrollRef) {
            this._scrollRef.setNativeProps(props);
        }
    };

    changeScrollPage = (index, animated) => {
        const { width } = this.state
        if (__IOS__) {
            this._scrollRef.scrollTo({ x: width * index, y: 0, animated: animated });
        } else {
            animated ? this._scrollRef.setPage(index) : this._scrollRef.setPageWithoutAnimation(index)
        }
    }

    _onChangeBar = (index) => {
        if (this.state.activeIndex !== index) {
            this.changeScrollPage(index, false)
        }
    }

    _changePage = (cardIndex) => {
        if (this.state.activeIndex !== cardIndex && !this._dragScroll) {
            this._dragScroll = true
            const { lazy, lazyDelay } = this.props
            let delay = lazy ? lazyDelay : 0
            this.time2 = setTimeout(() => {
                this.setState({ activeIndex: cardIndex }, () => {
                    this._dragScroll = false
                })
            }, delay);
        }
    };

    _onScroll = (e) => {
        const { width } = this.state
        const { x } = e.nativeEvent.contentOffset;
        const cardIndex = Math.round(x / width);
        this._changePage(cardIndex)
    };

    _onPageScroll = (e) => {
        const offset = e.nativeEvent.offset + e.nativeEvent.position;
        const cardIndex = Math.round(offset);
        this._changePage(cardIndex)
    };

    _onLayout = (e) => {
        const width = e.nativeEvent.layout.width
        const height = e.nativeEvent.layout.height
        this.setState({ width, height }, () => {

        })
    };

    _captureRef = (v) => {
        this._scrollRef = v
    };

    _renderScrollView = () => {
        const { children, scrollEnabled, initialPage, lazy, keyboardShouldPersistTaps } = this.props
        const { width, activeIndex } = this.state
        return (
            <ScrollView
                ref={this._captureRef}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={this._onScroll}
                scrollEnabled={scrollEnabled}
                scrollEventThrottle={16}
                onLayout={this._onLayout}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
                {React.Children.map(children, (item, index) => {
                    return (
                        <SceneView
                            key={`todo_page${index}`}
                            lazy={lazy}
                            width={width}
                            item={item}
                            index={index}
                            activeIndex={activeIndex}
                            initialPage={initialPage}
                        />
                    )
                })}
            </ScrollView>
        )
    }

    _renderViewPagerAndroid = () => {
        const { children, initialPage, scrollEnabled, pageHeight, lazy } = this.props
        const { width, activeIndex } = this.state
        let h = pageHeight ? { height: pageHeight } : null
        return (
            <ViewPagerAndroid
                ref={this._captureRef}
                style={[styles.viewPagerAndroid, h]}
                initialPage={initialPage}
                onPageScroll={this._onPageScroll}
                onPageSelected={this._onPageSelected}
                scrollEnabled={scrollEnabled}
                onLayout={this._onLayout}>
                {React.Children.map(children, (item, index) => {
                    return (
                        <View key={`todo_page${index}`} style={{ width }}>
                            <SceneView
                                lazy={lazy}
                                width={width}
                                item={item}
                                index={index}
                                activeIndex={activeIndex}
                                initialPage={initialPage}
                            />
                        </View>
                    )
                })}
            </ViewPagerAndroid>
        )
    }

    _renderSegmentedBar = () => {
        const { style, barStyle, pointerEvents, ...others } = this.props
        const { activeIndex } = this.state
        return (
            <SegmentedBar
                {...others}
                style={barStyle}
                activeIndex={activeIndex}
                onChange={this._onChangeBar}
            />
        )
    }

    render() {
        const { style, onLayout, showSegmentedBar, pointerEvents } = this.props
        // console.log('rednder')
        return (
            <View style={[styles.container, style]} pointerEvents={pointerEvents}>
                {showSegmentedBar ? this._renderSegmentedBar() : null}
                {__IOS__ ? this._renderScrollView() : this._renderViewPagerAndroid()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewPagerAndroid: {
        flex: 1,
    },
});

export default SegmentedView;
