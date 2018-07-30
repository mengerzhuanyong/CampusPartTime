/**
 * 校园空兼 - LoginStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction } from 'mobx'
import BaseStore from './baseStore'

export default class LoginStore extends BaseStore {

    constructor(params) {
        super(params);
        this.userInfo = { mobile: '', token: '' }
    }

    @observable userInfo;

    @action
    doLogin = async (url, data) => {
        this.loading = true;
        const result = await Services.post(url, data);
        // console.log('result', result);
        runInAction(() => {
            this.loading = false;
            if (result.code === 1) {
                this.saveUserInfo(result.data)
            }
        });
        return result;
    };

    @action
    exitLogin = async (url, data) => {
        this.loading = true;
        const result = await Services.post(url, data);
        // console.log('result', result);
        runInAction(() => {
            this.loading = false;
            if (result.code === 1) {
                this.cleanUserInfo();
            }
        });
        return result;
    };

    @action
    saveUserInfo = (userInfo) => {
        global.token = userInfo.token;
        this.userInfo = userInfo;
        StorageManager.save(Constant.USER_INFO_KEY, userInfo);
    };

    @action
    cleanUserInfo = () => {
        global.token = '';
        this.userInfo = {mobile: '', token: ''};
        StorageManager.remove(Constant.USER_INFO_KEY);
    }

}