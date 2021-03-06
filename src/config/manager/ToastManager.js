import React, { Component } from 'react'
import { Toast } from 'teaset';
import CusTheme from '../theme/Theme';
import {ActivityIndicator} from "react-native";

class ToastManager {
    static customKey = null;

    static show = (text) => {
        text = text === 'error' ? '服务器请求失败，请稍后重试' : text;
        Toast.show({
            text: text,
            option: CusTheme.toastOptions
        });
    };

    static showCustom = (text, duration = 2000, icon) => {
        icon = icon ? {icon} : <ActivityIndicator size='large' color={Theme.toastIconTintColor}/>;
        if (ToastManager.customKey) {
            ToastManager.hideCustom();
        }
        ToastManager.customKey = Toast.show({
            text: text,
            icon: icon,
            duration: duration,
        });
    };

    static hideCustom = () => {
        if (!ToastManager.customKey) {
            return;
        }
        Toast.hide(ToastManager.customKey);
        ToastManager.customKey = null;
    };

    static success = (text) => {
        Toast.success(text);
    };

    static fail = (text) => {
        Toast.fail(text);
    };

    static hide = () => {
        Toast.hide();
    };

}

export default ToastManager