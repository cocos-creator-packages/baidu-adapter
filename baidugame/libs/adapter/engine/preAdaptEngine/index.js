window.__preAdapter = {
    systemInfo: require('./SystemInfo'),

    browserGetter: require('./BrowserGetter'),

    viewProto: require('./View'),

    containerStrategyProto: require('./ContainerStrategy'),
};

window.__preAdapter.init = function (cb) {
    let systemInfo = window.__preAdapter.systemInfo;
    // send main context info to subDomain
    if (swan.getOpenDataContext) {
        swan.getOpenDataContext().postMessage({
            fromAdapter: true,
            event: 'main-context-info',
            sysInfo: JSON.stringify(systemInfo),
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
        });
        cb && cb();
    }
    else {
        swan.onMessage(function (data) {
            if (data.fromAdapter) {
                if (data.event === 'main-context-info') {
                    let info = JSON.parse(data.sysInfo);
                    // info addon systemInfo
                    Object.assign(info, systemInfo);
                    Object.assign(systemInfo, info);

                    Object.defineProperty(window, 'innerWidth', {
                        enumerable: true,
                        get () {
                            return data.innerWidth;
                        },
                    });
                    Object.defineProperty(window, 'innerHeight', {
                        enumerable: true,
                        get () {
                            return data.innerHeight;
                        },
                    });
                    Object.defineProperty(window, 'devicePixelRatio', {
                        enumerable: true,
                        get () {
                            return data.devicePixelRatio;
                        },
                    });
                    
                    cb && cb();
                }
            }
        });
    }
};