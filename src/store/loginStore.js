/**
 * 校园空兼 - LoginStore
 * https://menger.me
 * @大梦
 */


'use strict';
import { observable, action, computed, runInAction } from 'mobx'
import BaseStore from './baseStore'

class LoginStore extends BaseStore {

    constructor(params) {
        super(params);
        this.userInfo = { mobile: '', token: '' }
    }

    @observable userInfo;

    @action
    gotoLogin = async (url, data) => {
        this.loading = true;
        const result = await Services.post(url, data);
        const dataSource = result[0];
        console.log('dataSource', dataSource);
        runInAction(() => {
            this.loading = false;
            if (dataSource.code === 1) {
                this.saveUserInfo(dataSource.data)
            }
        });
        return dataSource;
    };

    @action
    exitLogin = async (url, data) => {
        this.loading = true;
        const result = await Services.post(url, data);
        const dataSource = result[0];
        console.log('dataSource', dataSource);
        runInAction(() => {
            this.loading = false;
            if (dataSource.code === 1) {
                this.cleanUserInfo();
            }
        });
        return dataSource;
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

export default LoginStore;