function adaptView (viewProto) {
    Object.assign(viewProto, {
        _adjustViewportMeta () {
            // swan not support
        },
    
        setRealPixelResolution (width, height, resolutionPolicy) {
            // Reset the resolution size and policy
            this.setDesignResolutionSize(width, height, resolutionPolicy);
        },
    
        enableAutoFullScreen: function(enabled) {
            cc.warn('cc.view.enableAutoFullScreen() is not supported on baidugame platform.');
        },
    });
}

module.exports = adaptView;