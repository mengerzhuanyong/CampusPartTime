/**
 * 校园空兼 - Store
 * https://menger.me
 * @大梦
 */

import AppStore from './appStore'
import LoginStore from './loginStore'
import HomeStore from './homeStore'
import ResourceStore from './resourceStore'
import WorkStore from "./workStore";
import OptionStore from "./optionStore";
import ShopStore from "./shopStore";

export default {
    appStore: new AppStore(),
    loginStore: new LoginStore(),
    homeStore: new HomeStore(),
    resourceStore: new ResourceStore(),
    workStore: new WorkStore(),
    optionStore: new OptionStore(),
    shopStore: new ShopStore(),
};