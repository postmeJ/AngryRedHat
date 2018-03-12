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
 * Created by Channing on 2014/10/15.
 */
var GirlDistanceBar = (function (_super) {
    __extends(GirlDistanceBar, _super);
    function GirlDistanceBar() {
        var _this = _super.call(this) || this;
        _this._heightBar = 0;
        _this.initView();
        return _this;
    }
    GirlDistanceBar.prototype.initView = function () {
        var bar = ResourceUtils.createBitmapByName("distanceBarImage");
        this.addChild(bar);
        this.head = ResourceUtils.createBitmapByName("redGirlHeadImage");
        this.addChild(this.head);
        bar.x = this.head.width / 2;
        this._heightBar = bar.height;
        this.head.y = this._heightBar;
    };
    // freeTime波数的间隔时间???
    /**
     *
     * @param totalNum      怪物出怪次数（2个同事出现算一次）
     * @param freeTime      间隔的时间
     */
    GirlDistanceBar.prototype.moveHead = function (totalNum, freeTime) {
        if (totalNum === void 0) { totalNum = 0; }
        if (freeTime === void 0) { freeTime = 0; }
        this.head.y = this._heightBar - this._heightBar * (GameData.redGirlDistance / (totalNum + freeTime));
    };
    return GirlDistanceBar;
}(egret.Sprite));
__reflect(GirlDistanceBar.prototype, "GirlDistanceBar");
