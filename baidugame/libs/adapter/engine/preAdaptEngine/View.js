let viewProto = {
    _adjustViewportMeta () {
        // swan not support
    },

    setRealPixelResolution (width, height, resolutionPolicy) {
        // Reset the resolution size and policy
        this.setDesignResolutionSize(width, height, resolutionPolicy);
    },

    enableAutoFullScreen: function(enabled) {
        // swan not support
    },
};

module.exports = viewProto;