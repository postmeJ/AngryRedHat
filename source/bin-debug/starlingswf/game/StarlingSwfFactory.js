var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/6/16.
 */
var StarlingSwfFactory = (function () {
    function StarlingSwfFactory() {
        this.swfAssetsManager = new starlingswf.SwfAssetManager();
        this.swfAssetsNames = new Array();
        this.swfAssets = new Array();
        this.swfData = {};
    }
    /**
     * 单例
     * @returns {StarlingSwfFactory}
     */
    StarlingSwfFactory.getInstance = function () {
        // 这种写法让我有些意外
        // 确保只有一个实例
        if (StarlingSwfFactory._instance == null) {
            StarlingSwfFactory._instance = new StarlingSwfFactory();
        }
        return StarlingSwfFactory._instance;
    };
    StarlingSwfFactory.prototype.addSwf = function (name, swfData, spriteSheep) {
        if (this.swfAssetsNames.indexOf(name) != -1)
            return;
        if (swfData == null || spriteSheep == null) {
            console.log("SWF加载失败:" + name);
            return;
        }
        this.swfAssetsManager.addSpriteSheet(name, spriteSheep);
        var swf = new starlingswf.Swf(swfData, this.swfAssetsManager, 24);
        swf.name = name;
        StarlingSwfUtils.addSwf(swf);
        this.swfAssetsNames.push(name);
        this.swfAssets.push(swf);
    };
    StarlingSwfFactory.prototype.stopSwfs = function (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var swf = StarlingSwfUtils.getSwf(arr[i]);
            if (swf) {
                swf.swfUpdateManager.stop();
            }
        }
    };
    StarlingSwfFactory.prototype.playSwfs = function (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var swf = StarlingSwfUtils.getSwf(arr[i]);
            if (swf) {
                swf.swfUpdateManager.play();
            }
        }
    };
    StarlingSwfFactory.prototype.clearSwfs = function () {
        while (this.swfAssets.length) {
            StarlingSwfUtils.removeSwf(this.swfAssets.pop());
        }
        while (this.swfAssetsNames.length) {
            this.swfAssetsNames.pop();
        }
        this.swfAssetsManager = new starlingswf.SwfAssetManager();
    };
    StarlingSwfFactory.prototype.clear = function () {
        this.clearSwfs();
    };
    StarlingSwfFactory.prototype.makeMc = function (name) {
        var mc = StarlingSwfUtils.createMovie("mc_" + name, null, StarlingSwfMovieClip);
        if (mc == null) {
            console.log("SWF创建失败: " + name);
        }
        return mc;
    };
    StarlingSwfFactory.prototype.makeImage = function (name) {
        return StarlingSwfUtils.createImage("img_" + name);
    };
    StarlingSwfFactory.prototype.getTexture = function (name) {
        return StarlingSwfUtils.getTexture("img_" + name);
    };
    return StarlingSwfFactory;
}());
__reflect(StarlingSwfFactory.prototype, "StarlingSwfFactory");
