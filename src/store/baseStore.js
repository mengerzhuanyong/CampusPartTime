/**
 * 校园空兼 - BaseStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { action, observable, configure } from 'mobx'

configure({ enforceActions: true });

export default class BaseStore {

    constructor(params) {
        this.error = { isError: '', errorMsg: '' };
    }

    @observable loading;
    @observable error;

    @action
    getRequest = async (url, print = false) => {
        const result = await Services.get(url, print);
        // console.log('result', result);
        if (result && result.code === StatusCode.TOKEN_EXPIRED.code) {
            ToastManager.show(result.msg);
            this.cleanUserInfo();
            return RouterHelper.reset('', 'Login');
        }
        return result;
    };

    @action
    postRequest = async (url, data, print = false) => {
        const result = await Services.post(url, data, print);
        // console.log('result', result);
        if (result && result.code === StatusCode.TOKEN_EXPIRED.code) {
            ToastManager.show(result.msg);
            this.cleanUserInfo();
            return RouterHelper.reset('', 'Login');
        }
        return result;
    }

    @action
    cleanUserInfo = () => {
        global.token = '';
        // this.userInfo = {mobile: '', token: ''};
        let result = StorageManager.remove(Constant.USER_INFO_KEY);
    }
}