'use strict';/**
 * 校园空兼 - 
 * http://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import RichText from './EmojiText/RichText'

class MessageText extends React.PureComponent {

    static propTypes = {
        style: Text.propTypes.style
    }

    static defaultProps = {

    }

    render() {
        const { content } = this.props
        return (
            <RichText
                style={styles.messageText}
                emojiStyle={styles.emojiStyle}
                textContent={content}
            />
        );
    }
}

const styles = StyleSheet.create({
    messageText: {
        maxWidth: 230,
        fontSize: FontSize(14),
        lineHeight: 26,
        color: "#3d434c",
    },
    emojiStyle: {
        width: ScaleSize(40),
        height: ScaleSize(40),
    }
});

export default MessageText