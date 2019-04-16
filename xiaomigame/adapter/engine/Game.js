var _frameRate = 60;
const inputManager = _cc.inputManager;
const renderer = cc.renderer;
const game = cc.game;

Object.assign(game, {
    setFrameRate (frameRate) {
        _frameRate = frameRate;
        wx.setPreferredFramesPerSecond(frameRate);
    },

    getFrameRate () {
        return _frameRate;
    },

    _runMainLoop () {
        var self = this, callback, config = self.config,
            director = cc.director,
            skip = true, frameRate = config.frameRate;
    
        cc.debug.setDisplayStats(config.showFPS);
    
        callback = function () {
            if (!self._paused) {
                self._intervalId = window.requestAnimFrame(callback);
                director.mainLoop();
            }
        };
    
        self._intervalId = window.requestAnimFrame(callback);
        self._paused = false;
    },

    end () {},

    _initEvents () {
        var win = window, hiddenPropName;

        // register system events
        if (this.config.registerSystemEvent)
            inputManager.registerSystemEvent(this.canvas);

        if (typeof document.hidden !== 'undefined') {
            hiddenPropName = "hidden";
        } else if (typeof document.mozHidden !== 'undefined') {
            hiddenPropName = "mozHidden";
        } else if (typeof document.msHidden !== 'undefined') {
            hiddenPropName = "msHidden";
        } else if (typeof document.webkitHidden !== 'undefined') {
            hiddenPropName = "webkitHidden";
        }

        var hidden = false;

        function onHidden () {
            if (!hidden) {
                hidden = true;
                game.emit(game.EVENT_HIDE);
            }
        }
        // In order to adapt the most of platforms the onshow API.
        function onShown (arg0, arg1, arg2, arg3, arg4) {
            if (hidden) {
                hidden = false;
                game.emit(game.EVENT_SHOW, arg0, arg1, arg2, arg3, arg4);
            }
        }

        if (hiddenPropName) {
            var changeList = [
                "visibilitychange",
                "mozvisibilitychange",
                "msvisibilitychange",
                "webkitvisibilitychange",
                "qbrowserVisibilityChange"
            ];
            for (var i = 0; i < changeList.length; i++) {
                document.addEventListener(changeList[i], function (event) {
                    var visible = document[hiddenPropName];
                    // QQ App
                    visible = visible || event["hidden"];
                    if (visible)
                        onHidden();
                    else
                        onShown();
                });
            }
        } else {
            win.addEventListener("blur", onHidden);
            win.addEventListener("focus", onShown);
        }

        if (win.navigator.userAgent.indexOf("MicroMessenger") > -1) {
            win.onfocus = onShown;
        }

        if (CC_WECHATGAME && cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB) {
            wx.onShow && wx.onShow(onShown);
            wx.onHide && wx.onHide(onHidden);
        }

        if ("onpageshow" in window && "onpagehide" in window) {
            win.addEventListener("pagehide", onHidden);
            win.addEventListener("pageshow", onShown);
            // Taobao UIWebKit
            document.addEventListener("pagehide", onHidden);
            document.addEventListener("pageshow", onShown);
        }

        this.on(game.EVENT_HIDE, function () {
            game.pause();
        });
        this.on(game.EVENT_SHOW, function () {
            game.resume();
        });
    },
});