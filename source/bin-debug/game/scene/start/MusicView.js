var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by Channing on 2014/10/15.
 */
var MusicView = (function (_super) {
    __extends(MusicView, _super);
    function MusicView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    MusicView.prototype.initView = function () {
        var spMask = new egret.Sprite();
        this.addChild(spMask);
        var mask = ResourceUtils.createBitmapByName("maskImage");
        spMask.addChild(mask);
        spMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchThis, this);
        this.spContainer = new egret.Sprite();
        this.addChild(this.spContainer);
        var wd = Const.SCENT_WIDTH / 8;
        var hd = Const.SCENT_HEIGHT / 4;
        this.spContainer.x = wd;
        this.spContainer.y = hd;
        var bg = ResourceUtils.createBitmapByName("optionMusicBgImage");
        this.spContainer.addChild(bg);
        var close = new egret.Sprite();
        this.spContainer.addChild(close);
        var spclose = ResourceUtils.createBitmapByName("option7Image");
        close.addChild(spclose);
        close.touchEnabled = true;
        close.x = this.spContainer.width - close.width * 0.7;
        close.y = -close.height * 0.4;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
        var soundBooBg = new egret.Sprite();
        this.spContainer.addChild(soundBooBg);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        soundBooBg.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        soundBooBg.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        soundBooBg.x = 182;
        soundBooBg.y = 84;
        soundBooBg.touchEnabled = true;
        soundBooBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBgHandler, this);
        var soundBoo = new egret.Sprite();
        this.spContainer.addChild(soundBoo);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        soundBoo.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        soundBoo.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        soundBoo.x = 182;
        soundBoo.y = 148;
        soundBoo.touchEnabled = true;
        soundBoo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (GameData.closeBgMusic) {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
        }
        else {
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
        }
        if (GameData.closeMusic) {
            this.spguan.visible = true;
            this.spkai.visible = false;
        }
        else {
            this.spguan.visible = false;
            this.spkai.visible = true;
        }
    };
    MusicView.prototype.onTouchThis = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    MusicView.prototype.clickHandler = function (e) {
        if (!GameData.closeMusic) {
            this.spkai.visible = false;
            this.spguan.visible = true;
            GameData.closeMusic = true;
        }
        else {
            this.spkai.visible = true;
            this.spguan.visible = false;
            GameData.closeMusic = false;
        }
    };
    MusicView.prototype.clickBgHandler = function (e) {
        if (!GameData.closeBgMusic) {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
            GameData.closeBgMusic = true;
        }
        else {
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
            GameData.closeBgMusic = false;
        }
    };
    MusicView.prototype.closePop = function (e) {
        if (this.parent)
            GameData.isClickBtn = false;
        this.visible = false;
    };
    MusicView.prototype.removeAll = function () {
        this.removeChildren();
    };
    return MusicView;
}(egret.Sprite));
__reflect(MusicView.prototype, "MusicView");
