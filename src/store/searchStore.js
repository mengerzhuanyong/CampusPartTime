/**
 * 校园空兼 - SearchStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class SearchStore extends BaseStore {

    constructor(params) {
        super(params);

        this.dataSource = [];
        this.workDataSource = [];
        this.shopDataSource = [];
        this.pointDataSource = [];
        this.appShareParams = '';
        this.hot_keywords = [];
        this.work_search_keys = [];
        this.shop_search_keys = [];
        this.point_search_keys = [];
    }

    @observable dataSource;
    @observable workDataSource;
    @observable shopDataSource;
    @observable pointDataSource;
    @observable hot_keywords;
    @observable appShareParams;
    @observable work_search_keys;
    @observable shop_search_keys;
    @observable point_search_keys;

    @computed
    get getWorkDataSource() {
        return toJS(this.workDataSource);
    }
    @computed
    get getShopDataSource() {
        return toJS(this.shopDataSource);
    }
    @computed
    get getPointDataSource() {
        return toJS(this.pointDataSource);
    }
    @computed
    get getHotKeywords() {
        return toJS(this.hot_keywords);
    }
    @computed
    get getWorkSearchKeys() {
        return toJS(this.work_search_keys);
    }
    @computed
    get getShopSearchKeys() {
        return toJS(this.shop_search_keys);
    }
    @computed
    get getPointSearchKeys() {
        return toJS(this.point_search_keys);
    }

    // 请求数据列表
    @action
    requestDataSource = async (type, url, data) => {

        const result = await this.postRequest(url, data, true);
        
        if (result.code === 1) {
            runInAction(() => {
                switch (type) {
                    case 1:
                        if (data.page === 1) {
                            this.workDataSource = result.data.list_data;
                        } else {
                            let temp = this.workDataSource;
                            if (result.data.list_data.length !== 0) {
                                this.workDataSource = this.workDataSource.concat(result.data.list_data)
                            }
                        }
                        break;
                    case 2:
                        if (data.page === 1) {
                            this.shopDataSource = result.data.list_data;
                        } else {
                            let temp = this.shopDataSource;
                            if (result.data.list_data.length !== 0) {
                                this.shopDataSource = this.shopDataSource.concat(result.data.list_data)
                            }
                        }
                        break;
                    case 3:
                        if (data.page === 1) {
                            this.pointDataSource = result.data.list_data;
                        } else {
                            let temp = this.pointDataSource;
                            if (result.data.list_data.length !== 0) {
                                this.pointDataSource = this.pointDataSource.concat(result.data.list_data)
                            }
                        }
                        break;
                    default:
                        if (data.page === 1) {
                            this.workDataSource = result.data.list_data;
                        } else {
                            let temp = this.workDataSource;
                            if (result.data.list_data.length !== 0) {
                                this.workDataSource = this.workDataSource.concat(result.data.list_data)
                            }
                        }
                        break;
                }
            })
        }
        return result;
    };

    // 获取热门搜索
    @action
    requestHotKeywords = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.hot_keywords = result.data;
            })
        }
        return result;
    };

    // 读取本地搜索关键词
    @action
    onLoadKeyWords = async (type) => {
        const {SEARCH_COUNT, WORK_SEARCH_KEY, SHOP_SEARCH_KEY, POINT_SEARCH_KEY} = Constant;
        let result = [];
        switch (type) {
            case 1:
                result = await StorageManager.load(WORK_SEARCH_KEY);
                runInAction(() => {
                    if (result && result.code === 1) {
                        console.log(result);
                        this.work_search_keys = result.data;
                    }
                });
                break;
            case 2:
                result = await StorageManager.load(SHOP_SEARCH_KEY);
                runInAction(() => {
                    if (result && result.code === 1) {
                        console.log(result);
                        this.shop_search_keys = result.data;
                    }
                });
                break;
            case 3:
                result = await StorageManager.load(POINT_SEARCH_KEY);
                runInAction(() => {
                    if (result && result.code === 1) {
                        console.log(result);
                        this.point_search_keys = result.data;
                    }
                });
                break;
            default:
                result = await StorageManager.load(WORK_SEARCH_KEY);
                runInAction(() => {
                    if (result && result.code === 1) {
                        console.log(result);
                        this.work_search_keys = result.data;
                    }
                });
                break;
        }
        return result;
    };

    // 存储搜索关键词
    @action
    onSaveKeyWords = async (type, keyword) => {
        const {SEARCH_COUNT, WORK_SEARCH_KEY, SHOP_SEARCH_KEY, POINT_SEARCH_KEY} = Constant;
        let keywordsTemp = [];
        let SAVE_KEY = WORK_SEARCH_KEY;
        switch (type) {
            case 1:
                keywordsTemp = this.work_search_keys;
                SAVE_KEY = WORK_SEARCH_KEY;
                break;
            case 2:
                keywordsTemp = this.shop_search_keys;
                SAVE_KEY = SHOP_SEARCH_KEY;
                break;
            case 3:
                keywordsTemp = this.point_search_keys;
                SAVE_KEY = POINT_SEARCH_KEY;
                break;
            default:
                keywordsTemp = this.work_search_keys;
                SAVE_KEY = WORK_SEARCH_KEY;
                break;
        }

        console.log(keywordsTemp);

        let status = keywordsTemp.findIndex(i => i === keyword);

        if (status > -1) {
            keywordsTemp.splice(status, 1);
            keywordsTemp.unshift(keyword);
        }
        if (status === -1 && keyword !== '' && keyword) {
            keywordsTemp.unshift(keyword);
        }
        if (keywordsTemp.length > SEARCH_COUNT) {
            keywordsTemp = keywordsTemp.slice(0, SEARCH_COUNT);
        }
        runInAction(() => {
            switch (type) {
                case 1:
                this.work_search_keys = keywordsTemp;
                break;
            case 2:
                this.shop_search_keys = keywordsTemp;
                break;
            case 3:
                this.point_search_keys = keywordsTemp;
                break;
            default:
                this.work_search_keys = keywordsTemp;
                break;
            }
        });

        console.log(SAVE_KEY, keywordsTemp);

        let result = StorageManager.save(SAVE_KEY, keywordsTemp);
        return result;
    };

    // 清空本地存储关键词
    @action
    onClearKeyWords = async (type) => {
        const {WORK_SEARCH_KEY, SHOP_SEARCH_KEY, POINT_SEARCH_KEY} = Constant;
        let CLEAN_KEY = WORK_SEARCH_KEY;
        runInAction(() => {
            switch (type) {
                case 1:
                CLEAN_KEY = WORK_SEARCH_KEY;
                this.work_search_keys = [];
                break;
            case 2:
                CLEAN_KEY = SHOP_SEARCH_KEY;
                this.shop_search_keys = [];
                break;
            case 3:
                CLEAN_KEY = POINT_SEARCH_KEY;
                this.point_search_keys = [];
                break;
            default:
                CLEAN_KEY = WORK_SEARCH_KEY;
                this.work_search_keys = [];
                break;
            }
        });
        let result = StorageManager.remove(CLEAN_KEY);
        return result;
    };

    // 获取分享APP积分
    @action
    getSharePoints = async (url, data) => {
        let result = await this.postRequest(url, data, true);
        return result;
    };
}