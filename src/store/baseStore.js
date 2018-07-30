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
        this.loading = false;
        this.error = { isError: '', errorMsg: '' };
    }

    @observable loading;
    @observable error;

    @action
    getRequest = async (url, print = false) => {
        const result = await Services.get(url, print);
        // console.log('result', result);
        if (result && result.code !== 1) {
            ToastManager.show(result.msg);
        }
        return result;
    };

    @action
    postRequest = async (url, data, print = false) => {
        const result = await Services.post(url, data, print);
        // console.log('result', result);
        if (result && result.code !== 1) {
            ToastManager.show(result.msg);
        }
        return result;
    }

}