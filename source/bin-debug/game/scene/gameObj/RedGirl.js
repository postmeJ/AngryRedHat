var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
