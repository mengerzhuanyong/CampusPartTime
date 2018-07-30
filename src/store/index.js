/**
 * 校园空兼 - Export Store Index
 * https://menger.me
 * @大梦
 */

'use strict';

import AppStore from './appStore'
import LoginStore from './loginStore'
import HomeStore from './homeStore'
import ResourceStore from './resourceStore'
import WorkStore from "./workStore"
import OptionStore from "./optionStore"
import ShopStore from "./shopStore"
import MineStore from "./mineStore"
import SystemStore from "./systemStore"

export default {
    appStore: new AppStore(),
    loginStore: new LoginStore(),
    homeStore: new HomeStore(),
    resourceStore: new ResourceStore(),
    workStore: new WorkStore(),
    optionStore: new OptionStore(),
    shopStore: new ShopStore(),
    mineStore: new MineStore(),
    systemStore: new SystemStore(),
};