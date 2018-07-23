/**
 * 校园空兼 - Root
 * https://menger.me
 * @大梦
 */
 
'use strict';
import React from 'react'
import './src/config/Global'
import { Provider } from 'mobx-react'
import stores from './src/store/index'
import Index from './src'

class App extends React.PureComponent {

    render() {
        return (
            <Provider {...stores}>
                <Index />
            </Provider>
        );
    }
}

export default App;