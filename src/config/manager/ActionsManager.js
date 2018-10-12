/**
 * 校园空兼 - ActionsManager
 * https://menger.me
 * @大梦
 */


'use strict';

import React from 'react'
import {View, Text} from 'react-native';
import {ActionSheet, Overlay, Label} from 'teaset';
import {fontSize, bouncer} from '../../util/Tool';
import AreaContent from '../../component/common/AreaContent';
import AreaContentAll from '../../component/common/AreaContentAll';
import ShareContent from '../../component/common/ShareContent';
import CusTheme from '../theme/Theme';
import JShareModule from 'jshare-react-native'
import TimeContent from "../../component/common/TimeContent";

class ActionsManager {

    static pullViewRefs = [];

    /** 参数
     const params = {
        actions: [
            { title: 'Say hello', onPress: () => alert('Hello') },
            { title: 'Do nothing' },
            { title: 'Disabled', disabled: true },
        ],
        cancelAction:{
            title: 'Cancel'
        }
     }
     */

    static show(params, option = {}) {
        this.showPullView(<ActionContent {...params} />, option)
    }

    static showShare(moduleTitle, func) {
        this.showPullView(<ShareContent moduleTitle={moduleTitle} onPress={func} />, {})
    }

    static showArea(func, enableAll = false) {
        this.showPullView(<AreaContent onPress={func} enableAll={enableAll} />, {})
    }

    static showTime(times, start, end, func) {
        this.showPullView(
            <TimeContent
                onPress={func}
                data={times}
                startTime={start}
                endTime={end}
            />, {});
    }

    static showShareModule(params, callBack = () => {}) {
        const {moduleTitle, type, url, title, text} = params;
        const _moduleTitle = moduleTitle ? moduleTitle : '分享APP';
        ActionsManager.showShare(_moduleTitle, (item) => {
            let platform;
            switch (item) {
                case 1:
                    // 微信好友
                    platform = 'wechat_session';
                    break;
                case 2:
                    // 微信朋友圈
                    platform = 'wechat_timeLine';
                    break;
                case 3:
                    platform = 'qq';
                    break;

                default:
                    platform = 'wechat_session';
                    break;
            }
            params = {type, platform, url, title, text, imageUrl: 'Images.icon_setting'};
            JShareModule.share(params, (success) => {
                // console.log(success);

                switch (success.state) {
                    case 'success':
                        // ToastManager.show('分享成功!');
                        ActionsManager.getSharePoints(item);
                        break;
                    case 'fail':
                        ToastManager.show('分享失败!');
                        break;
                    case 'cancel':
                        ToastManager.show('取消分享!');
                        break;
                    case 'unknown':
                        // ToastManager.show('分享成功，未知状态!');
                        ActionsManager.getSharePoints(item, callBack);
                        break;
                    default:
                        ActionsManager.getSharePoints(item, callBack);
                        // ToastManager.show('分享成功!');
                        break;
                }
            }, (error) => {
                // console.log(error);
                ToastManager.show('未安装客户端，分享失败');
                // ActionsManager.getSharePoints(item, callBack);
            });
        })
    }

    static showPullView(component, option) {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()); // 过滤
        if (this.pullViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PullView
                    ref={v => this.pullViewRefs.push(v)}
                    side={'bottom'}
                    modal={false}
                    rootTransform={'none'}
                    containerStyle={{ backgroundColor: 'transparent', }}
                    onCloseRequest={() => this.hide()}
                    {...option}
                >
                    {component}
                </Overlay.PullView>
            )
        }
    }

    static hide() {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()); // 过滤
        if (this.pullViewRefs.length > 0) {
            const lastRef = this.pullViewRefs.pop();
            lastRef.close();
        }
    }

    static async getSharePoints(type, callBack = () => {}) {
        let url = ServicesApi.share_get_point;
        let data = {type};
        try {
            let result = await Services.post(url, data, true);
            if (result.code === 1) {
                callBack();
            } else {
                ToastManager.hide();
                ToastManager.show(result.msg);
            }
        } catch (e) {
            ToastManager.hide();
            ToastManager.show('error');
        }
    }
}

export default ActionsManager;