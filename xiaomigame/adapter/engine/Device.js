// check macro in CCSys.js
const XIAOMI_GAME = 110;
const OS_ANDROID = 'Android';
const OS_IOS = 'iOS';
const BROWSER_TYPE_XIAOMI_GAME = 'xiaomigame';
const systemInfo = {};

// IIFE: initSystemInfo
(function () {
    var env = qg.getSystemInfoSync();
    systemInfo.isNative = false;
    systemInfo.isBrowser = false;
    systemInfo.isMobile = true;
    systemInfo.platform = XIAOMI_GAME;
    systemInfo.language = env.language.substr(0, 2);
    systemInfo.languageCode = env.language.toLowerCase();
    var system = env.system.toLowerCase();
    if (env.platform === "android") {
        systemInfo.os = OS_ANDROID;
    }
    else if (env.platform === "ios") {
        systemInfo.os = OS_IOS;
    }
    else if (env.platform === 'devtools') {
        systemInfo.isMobile = false;
        if (system.indexOf('android') > -1) {
            systemInfo.os = OS_ANDROID;
        }
        else if (system.indexOf('ios') > -1) {
            systemInfo.os = OS_IOS;
        }
    }
    // Adaptation to Android P
    if (system === 'android p') {
        system = 'android p 9.0';
    }

    var version = /[\d\.]+/.exec(system);
    systemInfo.osVersion = version ? version[0] : system;
    systemInfo.osMainVersion = parseInt(systemInfo.osVersion);
    systemInfo.browserType = BROWSER_TYPE_XIAOMI_GAME;
    systemInfo.browserVersion = env.version;

    var w = env.windowWidth;
    var h = env.windowHeight;
    var ratio = env.pixelRatio || 1;
    systemInfo.windowPixelResolution = {
        width: ratio * w,
        height: ratio * h
    };

    systemInfo.localStorage = window.localStorage;

    var _supportWebGL = _supportWebp = false;
    try {
        var _canvas = document.createElement("canvas");
        _supportWebGL = _canvas.getContext("webgl");
        _supportWebp = _canvas.toDataURL('image/webp').startsWith('data:image/webp');
    }
    catch (err) { }

    systemInfo.capabilities = {
        "canvas": true,
        "opengl": !!_supportWebGL,
        "webp": _supportWebp
    };
    systemInfo.__audioSupport = {
        ONLY_ONE: false,
        WEB_AUDIO: false,
        DELAY_CREATE_CTX: false,
        format: ['.mp3']
    };
})();

window.__device = {
    getSystemInfo () {
        return systemInfo;
    },
}