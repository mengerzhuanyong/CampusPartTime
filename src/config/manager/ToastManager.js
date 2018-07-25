
import { Toast } from 'teaset';
import CusTheme from '../Theme';

class ToastManager {

    static show = (text) => {
        Toast.show({
            text: text,
            option: CusTheme.toastOptions
        });
    }

}

export default ToastManager