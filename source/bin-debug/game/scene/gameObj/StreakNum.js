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
 * Created by Channing on 2014/10/13.
 */
var StreakNum = (function (_super) {
    __extends(StreakNum, _super);
    function StreakNum() {
        var _this = _super.call(this) || this;
        _this.conboW = 0;
        _this.initView();
        return _this;
    }
    StreakNum.prototype.initView = function () {
        var combo = ResourceUtils.createBitmapByName("comboImage");
        this.addChild(combo);
        this.conboW = combo.width;
        this.showSorce = new SpecialNumber("number-0");
        this.showSorce.x = this.conboW / 2 - this.showSorce.width / 2;
        this.showSorce.y = combo.height + 5;
        this.addChild(this.showSorce);
    };
    StreakNum.prototype.setValue = function (sorce) {
        if (sorce === void 0) { sorce = 0; }
        this.showSorce.x = this.conboW / 2 - this.showSorce.width / 2;
        this.showSorce.setValue(sorce + "");
    };
    return StreakNum;
}(egret.Sprite));
__reflect(StreakNum.prototype, "StreakNum");
