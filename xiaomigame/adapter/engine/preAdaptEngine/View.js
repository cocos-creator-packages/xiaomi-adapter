let viewProto = {
    _adjustViewportMeta () {
        // xiaomigame not support
    },

    setRealPixelResolution (width, height, resolutionPolicy) {
        // Reset the resolution size and policy
        this.setDesignResolutionSize(width, height, resolutionPolicy);
    },

    enableAutoFullScreen: function(enabled) {
        // xiaomigame not support
    },
};

module.exports = viewProto;