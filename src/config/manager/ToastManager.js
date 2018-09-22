import React, { Component } from 'react'
import { Toast } from 'teaset';
import CusTheme from '../theme/Theme';
import {ActivityIndicator} from "react-native";

class ToastManager {
    static customKey = null;

    static show = (text) => {
        Toast.show({
            text: text,
            option: CusTheme.toastOptions
        });
    };

    static showCustom = (text, icon) => {
        icon = icon ? {icon} : <ActivityIndicator size='large' color={CusTheme.toastIconTintColor}/>;
        if (ToastManager.customKey) {
            return;
        }
        ToastManager.customKey = Toast.show({
            text: text,
            icon: icon,
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