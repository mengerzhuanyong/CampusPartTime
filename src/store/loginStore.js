/**
 * 校园空兼 - LoginStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction } from 'mobx'
import BaseStore from './baseStore'

export default class LoginStore extends BaseStore {

    constructor(params) {
        super(params);
        this.userInfo = { mobile: '', token: '' };
        this.openid = '';
        this.unionid = '';
    }

    @observable userInfo;
    @observable openid;
    @observable unionid;

    @action
    doLogin = async (url, data) => {

        const result = await Services.post(url, data, true);
        // console.log('result', result);
        runInAction(() => {
            
            if (result.code === 1) {
                this.saveUserInfo(result.data)
            }
        });
        return result;
    };

    @action
    doExtendsLogin = async (url, data) => {

        const result = await Services.post(url, data, true);
        // console.log('result', result);
        runInAction(() => {
            if (result) {
                this.openid = result.data.openid;
                this.unionid = result.data.unionid;
                if (result.code === 1 && result.data.mobile !== '') {
                    this.saveUserInfo(result.data);
                }
            }
        });
        return result;
    };

    @action
    recoverPassword = async (url, data) => {

        const result = await Services.post(url, data);
        // console.log('result', result);
        runInAction(() => {
            
            if (result.code === 1) {
                this.saveUserInfo(result.data)
            }
        });
        return result;
    };

    @action
    exitLogin = async (url, data) => {

        const result = await Services.post(url, data);
        // console.log('result', result);
        runInAction(() => {
            
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
        let result = StorageManager.save(Constant.USER_INFO_KEY, userInfo);
    };

    @action
    cleanUserInfo = () => {
        global.token = '';
        this.userInfo = {mobile: '', token: ''};
        let result = StorageManager.remove(Constant.USER_INFO_KEY);
    }

}