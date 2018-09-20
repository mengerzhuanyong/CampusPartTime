'use strict'
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types'

// 
class SceneView extends React.PureComponent {

    static propTypes = {
        item: PropTypes.object,
        width: PropTypes.number,
        index: PropTypes.number,
        activeIndex: PropTypes.number,
        initialPage: PropTypes.number,
        lazy: PropTypes.bool
    };

    static defaultProps = {
        initialPage: 0,
        activeIndex: 0,
    };

    constructor(props) {
        super(props);
        this.state = { isFocused: props.lazy ? props.index === props.initialPage : true }

    };

    componentWillReceiveProps(nextProps) {
        const { index } = this.props
        if (!this.state.isFocused && nextProps.activeIndex === index) {
            this.setState({ isFocused: true })
        }
    };

    render() {
        const { width, item } = this.props
        const { isFocused } = this.state
        return (
            isFocused && width !== 0 ? React.cloneElement(item, {
                style: [item.props.style, { width }],
            }) : <View style={{ width }} />
        );
    }
}

export default SceneView;