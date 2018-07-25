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
    getRequest = async (url, query) => {
        const result = await Services.get(url, query);
        console.log('result', result);
        if (result && result.code !== 1) {
            ToastManager.show(result.msg);
        }
        return result;
    };

    @action
    postRequest = async (url, data) => {
        const result = await Services.post(url, data);
        console.log('result', result);
        if (result && result.code !== 1) {
            ToastManager.show(result.msg);
        }
        return result;
    }

}