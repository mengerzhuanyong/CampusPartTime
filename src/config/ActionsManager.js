/**
 * 校园空兼 -
 * https://menger.me
 * @大梦
 */
/**
 * 校园空兼 -
 * https://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {View, Text} from 'react-native';
import {ActionSheet, Overlay, Label} from 'teaset';
import {fontSize, bouncer} from '../util/Tool';
import AreaContent from '../component/common/AreaContent';
import ShareContent from '../component/common/ShareContent';
import Theme from './Theme';
import JShareModule from 'jshare-react-native'

class ActionsManager {

    static pullViewRefs = [];

    /** 参数
     * const params = {
        actions: [
            { title: 'Say hello', onPress: () => alert('Hello') },
            { title: 'Do nothing' },
            { title: 'Disabled', disabled: true },
        ],
        cancelAction:{
            title: 'Cancel'
        }
     }
     **/

        // 先使用teaset自带的组件，后续自定义组件
    static show = (params) => {
        const actions = params.actions;
        const cancelAction = params.cancelAction;
        ActionSheet.show(actions, cancelAction);
    };

    static showShare(moduleTitle, func) {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()); // 过滤
        if (this.pullViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PullView
                    ref={v => this.pullViewRefs.push(v)}
                    side={'bottom'}
                    modal={false}
                    rootTransform={'none'}
                    containerStyle={Theme.bgTransparentStyle}
                    onCloseRequest={() => this.hide()}
                >
                    <ShareContent moduleTitle={moduleTitle} onPress={func}/>
                </Overlay.PullView>
            )
        }
    }

    static showArea(func) {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()); // 过滤
        if (this.pullViewRefs.length === 0) {
            Overlay.show(
                <Overlay.PullView
                    ref={v => this.pullViewRefs.push(v)}
                    side={'bottom'}
                    modal={false}
                    rootTransform={'none'}
                    containerStyle={Theme.bgTransparentStyle}
                    onCloseRequest={() => this.hide()}
                >
                    <AreaContent onPress={func}/>
                </Overlay.PullView>
            )
        }
    }

    static showShareModule(params) {
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
                console.log(success);
                switch (success.state) {
                    case 'success':
                        ToastManager.show('分享成功!');
                        break;
                    case 'fail':
                        ToastManager.show('分享失败!');
                        break;
                    case 'cancel':
                        ToastManager.show('取消分享!');
                        break;
                    case 'unknown':
                        ToastManager.show('分享成功，未知状态!');
                        break;
                    default:
                        ToastManager.show('分享成功!');
                        break;
                }

            }, (error) => {
                console.log(error);
                ToastManager.show('未安装客户端，分享失败');
            });
        })
    }

    static hide() {
        this.pullViewRefs = bouncer(this.pullViewRefs.slice()); // 过滤
        if (this.pullViewRefs.length > 0) {
            const lastRef = this.pullViewRefs.pop();
            lastRef.close();
        }
    }
}


export default ActionsManager