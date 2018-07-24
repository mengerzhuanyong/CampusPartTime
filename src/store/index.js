/**
 * 校园空兼 - Store
 * https://menger.me
 * @大梦
 */

import AppStore from './appStore'
import LoginStore from './loginStore'
import HomeStore from './homeStore'

export default {
    appStore: new AppStore(),
    loginStore: new LoginStore(),
    homeStore: new HomeStore(),
};