import * as webpackStuff from './modules/webpackModules.js'
import toast from './ui/toasts.js'
import SCApi from "./modules/SCApi.js";
import {initializeSettings} from './ui/settings/index.js'
import {showConfirmationModal, showPopup} from './ui/modals.js'
const init = async function () {
    toast("Loading SmartCord...", {timeout: 10000})
    const c = {
        log: function (msg) {
            console.log("%c[SmartCord]", "color: red;", msg);
        },
        info: function (msg) {
            console.info("%c[SmartCord]", "color: red;", msg);
        },
        warn: function (msg) {
            console.warn("%c[SmartCord]", "color: red;", msg);
        },
        error: function (msg) {
            console.error("%c[SmartCord]", "color: red;", msg);
        },
    };
    window.SC = { 
        logger: c, 
        version: '2.0',
        webpackModules: webpackStuff,
        api: SCApi,
        newToast: toast,
        showConfirmationModal: showConfirmationModal,
        showPopup: showPopup
     };
    await new Promise(r => setTimeout(r, 10000));
    initializeSettings();
    showPopup("SmartCord 2.0", "**Warning**: SmartCord 2.0 is still in experimental development. I'm not responsible for any damage caused by it. Thanks for checking out!"); 
    toast("Welcome to SmartCord 2.0")
}
init()