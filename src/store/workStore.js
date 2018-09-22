/**
 * 校园空兼 - WorkStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class WorkStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = [];
        this.workDetail = {};
        this.sign_id = 0;
        this.time_list = [];
        this.work_time = [];
        this.userInfo = {};
        this.jobInfo = {};
        this.remark = '';
        this.sign_status = '';
        this.server_mobile = '';
        this.platform_time_list = [];
        this.platform_time_option = [];
        this.platform_work_tips = '';
        this.work_nav_arr = ['已报名工作（0）', '正在进行工作（0）'];
        this.workBenchData = [];
        this.workBenchDetail = {
            job_info: {},
            user_info: {},
        };
    }

    @observable dataSource;
    @observable workDetail;
    @observable time_list;
    @observable sign_id;
    @observable work_time;
    @observable userInfo;
    @observable jobInfo;
    @observable remark;
    @observable sign_status;
    @observable server_mobile;
    @observable platform_time_list;
    @observable platform_time_option;
    @observable platform_work_tips;
    @observable work_nav_arr;
    @observable workBenchData;
    @observable workBenchDetail;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    @computed
    get getOnSelectTimeItem() {
        return this.time_list.slice();
    }

    @computed
    get getTimesArray() {
        return toJS(this.platform_time_list);
    }

    @computed
    get getTimesOption() {
        return toJS(this.platform_time_option);
    }

    @computed
    get getWorkNavigation() {
        return toJS(this.work_nav_arr);
    }

    // 工作首页 - 列表
    @action
    requestDataSource = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                if (data.page === 1) {
                    this.dataSource = result.data.list_data;
                } else {
                    let temp = this.dataSource;
                    if (result.data.list_data.length !== 0) {
                        this.dataSource = temp.concat(result.data.list_data)
                    }
                }
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.dataSource = [];
            })
        }
        return result;
    };

    // 工作详情
    @action
    requestWorkDetail = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.workDetail = result.data;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.workDetail = {};
            })
        }
        return result;
    };

    // 工作详情 - 工作报名时间
    @action
    requestWorkTimes = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.sign_id = result.data.sign_id;
                this.time_list = result.data.time_list;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.sign_id = 0;
                this.time_list = [];
            })
        }
        return result;
    };

    // 工作详情 - 点选报名时间
    @action
    onSelectTimeItem = (index, item) => {
        let times = this.time_list.slice();
        let work_time = this.work_time.slice();
        let value = item.selected === 1 ? 2 : 1;
        let id = item.id;
        if (value === 2) {
            work_time.push(id);
        } else {
            work_time.splice(work_time.findIndex(i => i === id), 1);
        }
        // console.log(work_time);
        times[index].selected = value;
        this.time_list = times;
        this.work_time = work_time;
    };

    // 工作详情 - 提交报名时间
    @action
    onSubmitTimes = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.sign_id = result.data.sign_id;
                this.work_time = result.data.work_time;
                this.userInfo = result.data.user_info;
                this.jobInfo = result.data.job_info;
                this.remark = result.data.remark;
            })
        } else {
            runInAction(() => {
                this.sign_id = 0;
            })
        }
        return result;
    };

    // 工作详情 - 提交报名
    @action
    onSubmitApply = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.work_time = result.data.work_time;
                this.userInfo = result.data.user_info;
                this.jobInfo = result.data.job_info;
                this.remark = result.data.remark;
                this.sign_status = result.data.sign_status;
                this.server_mobile = result.data.server_mobile;
            })
        } else {
            runInAction(() => {
                this.sign_id = 0;
            })
        }
        return result;
    };

    // 工作详情 - 取消报名
    @action
    onCancelApply = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.sign_id = 0;
                this.work_time = [];
                this.jobInfo = {};
                this.sign_status = '';
                this.server_mobile = '';
            })
        } else {
            runInAction(() => {
                this.sign_id = 0;
            })
        }
        return result;
    };

    // 平台分配工作 - 获取报名时间
    @action
    requestPlatformTimes = async (url) => {
        this.loading = true;
        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.platform_time_list = result.data.time_list;
                this.platform_time_option = result.data.time_option;
                this.platform_work_tips = result.data.platform_work_tips;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.platform_time_list = [];
                this.platform_time_option = [];
                this.platform_work_tips = '';
            })
        }
        return result;
    };

    // 平台分配工作 - 点选工作时间
    @action
    onSelectPlatformTimeItem = (item, index) => {
        let times = this.platform_time_list.slice();
        times[index] = item;
        this.platform_time_list = times;
    };

    // 工作详情 - 提交报名
    @action
    onSubmitPlatformTimes = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        return result;
    };

    // 获取工作台导航
    @action
    requestWorkNavigation = async (url) => {
        const result = await this.getRequest(url, true);
        if (result.code === 1) {
            runInAction(() => {
                this.work_nav_arr = result.data;
            })
        }
        return result;
    };

    // 获取工作台列表
    @action
    requestWorkBenchData = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                if (data.page === 1) {
                    this.workBenchData = result.data.list_data;
                } else {
                    let temp = this.workBenchData;
                    if (result.data.list_data.length !== 0) {
                        this.workBenchData = temp.concat(result.data.list_data)
                    }
                }
            })
        }
        return result;
    };

    // 获取工作台工作详情
    @action
    requestWorkBenchDetail = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        this.loading = false;
        if (result.code === 1) {
            runInAction(() => {
                this.workBenchDetail = result.data;
            })
        }
        return result;
    };

    // 打卡
    @action
    onSubmitPunchCard = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        return result;
    };


};