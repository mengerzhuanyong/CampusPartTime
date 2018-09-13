'use strict';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Theme from '../../config/theme/Theme'

class NavigationTitle extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
        titleStyle: Text.propTypes.style,
        maxWidth: PropTypes.number
    };

    static defaultProps = {
        maxWidth: 0
    };

    renderContent = () => {
        const {title, titleStyle} = this.props;
        if (typeof title === 'string') {
            // console.log('renderContent', title);
            return (
                <Text
                    style={[styles.title, titleStyle]}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}
                >
                    {title}
                </Text>
            )
        } else if (typeof title === 'function') {
            return title();
        } else if (React.isValidElement(title)) {
            return title;
        }
        return null;
    };

    buildStyle = () => {
        const {maxWidth} = this.props;
        let container = {width: Theme.screenWidth - maxWidth * 2};
        return {container};
    };

    render() {
        const {style} = this.props;
        const {container} = this.buildStyle();
        return (
            <View style={[container, style]}>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: Theme.navBarTitleColor,
        fontSize: Theme.navBarTitleFontSize,
    }
});

export default NavigationTitle