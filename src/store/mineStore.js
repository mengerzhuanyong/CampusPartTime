/**
 * 校园空兼 - MineStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class MineStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = {};
        this.myProfile = {
            user_info: {
                username: '',
                school: '',
            },
            student_url: 'https://h5.apix.cn/degrees?signature=64392c4592131eee29c24579e5d6bd65',
        };
    }

    @observable dataSource;
    @observable myProfile;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 会员中心首页
    @action
    requestDataSource = async (url) => {
        this.loading = true;
        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.dataSource = result.data;
            });
        }
        return result;
    };

    // 我的资料
    @action
    requestMyProfile = async (url) => {
        this.loading = true;
        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.myProfile = result.data;
            });
        }
        return result;
    };

    // 手机实名认证
    @action
    onCertificationMobile = async (url, data) => {
        this.loading = true;
        let newStatus = this.myProfile;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                newStatus.mobile_status = result.data;
                this.myProfile = newStatus;
            });
        }
        return result;
    };

    // 身份证认证
    @action
    onSubmitIdCardVerify = async (url, data) => {
        this.loading = true;
        let newStatus = this.myProfile;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                newStatus.id_card_status = result.data;
                this.myProfile = newStatus;
            });
        }
        return result;
    };


}