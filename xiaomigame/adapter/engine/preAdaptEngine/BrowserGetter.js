let macro = require('./macro');

function BrowserGetter () {
    this.adaptationType = macro.BROWSER_TYPE_XIAOMI_GAME;
    this.meta = {
        "width": "device-width"
    };
}

Object.assign(BrowserGetter.prototype, {
    init () {
        // do nothing...
    },

    availWidth () {
        return window.innerWidth;
    },

    availHeight () {
        return window.innerHeight;
    },
});

module.exports = new BrowserGetter();