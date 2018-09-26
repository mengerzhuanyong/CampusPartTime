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
        this.myCredits = {
            setRotateValue: -126,
        };
        this.myWorkPoints = {};
        this.myWorkPointsDetail = [];
        this.myWorkIncomeDetail = [];
        this.pointsInfo = {};
        this.pointsDetail = [];
        this.creditInfo = [];
        this.creditDetail = [];
    }

    @observable dataSource;
    @observable myProfile;
    @observable myCredits;
    @observable myWorkPoints;
    @observable myWorkPointsDetail;
    @observable myWorkIncomeDetail;
    @observable pointsInfo;
    @observable pointsDetail;
    @observable creditInfo;
    @observable creditDetail;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 会员中心首页
    @action
    requestDataSource = async (url) => {

        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                // 
                this.dataSource = result.data;
            });
        }
        return result;
    };

    // 签到
    @action
    onSubmitSingIn = async (url) => {

        const result = await this.getRequest(url, true);
        
        return result;
    };

    // 我的资料
    @action
    requestMyProfile = async (url) => {

        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.myProfile = result.data;
            });
        }
        return result;
    };

    // 手机实名认证
    @action
    onCertificationMobile = async (url, data) => {

        let newStatus = this.myProfile;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                newStatus.mobile_status = result.data;
                this.myProfile = newStatus;
            });
        }
        return result;
    };

    // 身份证认证
    @action
    onSubmitIdCardVerify = async (url, data) => {

        let newStatus = this.myProfile;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                newStatus.id_card_status = result.data;
                this.myProfile = newStatus;
            });
        }
        return result;
    };

    // 微信认证
    @action
    onSubmitBindWeChat = async (url, data) => {

        let newStatus = this.myProfile;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                newStatus.is_wechat = 2;
                this.myProfile = newStatus;
            });
        }
        return result;
    };

    // 信用额度
    @action
    getMyCredits = async (url) => {

        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.myCredits = result.data;
            });
        }
        return result;
    };

    // 工分明细
    @action
    requestWorkPoints = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.myWorkPoints = result.data;
                    this.myWorkPointsDetail = result.data.list_data;
                } else {
                    let temp = this.myWorkPointsDetail;
                    if (result.data.list_data.length !== 0) {
                        this.myWorkPointsDetail = temp.concat(result.data.list_data);
                    }
                }
            })
        } else {
            runInAction(() => {
                this.myWorkPointsDetail = [];
            })
        }
        return result;
    };

    // 兼职收入明细
    @action
    requestWorkIncome = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.myWorkIncomeDetail = result.data.list_data;
                } else {
                    let temp = this.myWorkIncomeDetail;
                    if (result.data.list_data.length !== 0) {
                        this.myWorkIncomeDetail = temp.concat(result.data.list_data);
                    }
                }
            })
        }
        return result;
    };

    // 积分明细
    @action
    requestPointDetail = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.pointsInfo = result.data;
                    this.pointsDetail = result.data.list_data;
                } else {
                    let temp = this.pointsDetail;
                    if (result.data.list_data.length !== 0) {
                        this.pointsDetail = temp.concat(result.data.list_data)
                    }
                }
            })
        } else {
            runInAction(() => {
                this.pointsInfo = {};
                this.pointsDetail = [];
            })
        }
        return result;
    };

    // 诚信体系
    @action
    requestCreditDetail = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.creditInfo = result.data;
                    this.creditDetail = result.data.list_data;
                } else {
                    let temp = this.creditDetail;
                    if (result.data.list_data.length !== 0) {
                        this.creditDetail = temp.concat(result.data.list_data)
                    }
                }
            })
        } else {
            runInAction(() => {
                this.creditInfo = {};
                this.creditDetail = [];
            })
        }
        return result;
    };


}