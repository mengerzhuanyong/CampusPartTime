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

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }
    @computed
    get getOnSelectTimeItem() {
        return this.time_list.slice();
    }

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
                    if (result.data.list_data.length !== 0) {
                        this.dataSource = this.dataSource.concat(result.data.list_data)
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
    }
}