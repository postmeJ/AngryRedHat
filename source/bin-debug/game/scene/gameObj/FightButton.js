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
 * Created by Channing on 2014/10/10.
 */
var FightButton = (function (_super) {
    __extends(FightButton, _super);
    function FightButton() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    FightButton.prototype.initView = function () {
        this.button = StarlingSwfFactory.getInstance().makeMc("bazi");
        this.addChild(this.button);
        this.button.gotoAndStop(0);
    };
    FightButton.prototype.goPlay = function (num) {
        this.button.gotoAndStop(num);
    };
    return FightButton;
}(egret.Sprite));
__reflect(FightButton.prototype, "FightButton");
