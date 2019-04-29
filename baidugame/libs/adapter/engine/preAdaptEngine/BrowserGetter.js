let macro = require('./macro');
const isSubContext = !swan.getOpenDataContext;

function BrowserGetter () {
    this.adaptationType = null;
    this.meta = {
        "width": "device-width"
    };
}

Object.assign(BrowserGetter.prototype, {
    init () {
        if (isSubContext) {
            this.adaptationType = macro.BROWSER_TYPE_BAIDU_GAME_SUB;
        }
        else {
            this.adaptationType = macro.BROWSER_TYPE_BAIDU_GAME;
        }
    },
});

if (isSubContext) {
    let sharedCanvas = window.sharedCanvas || swan.getSharedCanvas();
    Object.assign(BrowserGetter.prototype, {
        availWidth () {
            return sharedCanvas.width;
        },

        availHeight () {
            return sharedCanvas.height;
        }
    }); 
}
else {
    Object.assign(BrowserGetter.prototype, {
        availWidth () {
            return window.innerWidth;
        },

        availHeight () {
            return window.innerHeight;
        }
    });    
}

module.exports = new BrowserGetter();