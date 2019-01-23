require('./libs/adapter/builtin/index.js');
require('./libs/adapter/engine/Device.js');  // provide device related infos
__device.init(function () {
    var Parser = require('./libs/xmldom/dom-parser.js');
    window.DOMParser = Parser.DOMParser;
    require('./libs/swan-downloader.js');
    require('./src/settings.js');
    let settings = window._CCSettings;
    let SubPackPipe = require('./libs/subpackage-pipe');
    require('main.js');
    require(settings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.js');
    require('./libs/adapter/engine/index.js');

    swanDownloader.REMOTE_SERVER_ROOT = "";
    swanDownloader.SUBCONTEXT_ROOT = "";
    var pipeBeforeDownloader = cc.loader.md5Pipe || cc.loader.assetLoader;
    cc.loader.insertPipeAfter(pipeBeforeDownloader, swanDownloader);

    if (settings.subpackages) {
        var subPackPipe = new SubPackPipe(settings.subpackages);
        cc.loader.insertPipeAfter(pipeBeforeDownloader, subPackPipe);
    }

    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_BAIDU_GAME_SUB) {
        require('./libs/sub-context-adapter.js');
    }
    else {
        // Release Image objects after uploaded gl texture
        cc.macro.CLEANUP_IMAGE_CACHE = true;
    }

    window.boot();
});