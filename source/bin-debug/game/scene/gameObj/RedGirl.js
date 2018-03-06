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
 * 小红帽
 * Created by Channing on 2014/10/11.
 */
var RedGirl = (function (_super) {
    __extends(RedGirl, _super);
    function RedGirl() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    RedGirl.prototype.initView = function () {
        this.girl = StarlingSwfFactory.getInstance().makeMc("xiaohongmao");
        this.addChild(this.girl);
        this.girl.gotoAndStop(0);
    };
    RedGirl.prototype.run = function () {
        this.girl.goToPlay("1");
    };
    RedGirl.prototype.gotoDie = function () {
        this.girl.goToPlay("2");
    };
    RedGirl.prototype.gotoWin = function () {
        this.girl.goToPlay("3");
    };
    RedGirl.prototype.dispose = function () {
        this.removeChildren();
    };
    return RedGirl;
}(egret.Sprite));
__reflect(RedGirl.prototype, "RedGirl");
