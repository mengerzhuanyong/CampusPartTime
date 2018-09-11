
import { Toast } from 'teaset';
import CusTheme from '../theme/Theme';

class ToastManager {

    static show = (text) => {
        Toast.show({
            text: text,
            option: CusTheme.toastOptions
        });
    }

}

export default ToastManager