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
 * Created by Administrator on 2014/10/16.
 */
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super.call(this) || this;
        _this.boo = false;
        _this.sp = ResourceUtils.createBitmapByName("lineImage");
        _this.addChild(_this.sp);
        _this.sp.x = _this.sp.width / 2;
        egret.Ticker.getInstance().register(_this.onFrame, _this);
        return _this;
    }
    Line.prototype.move = function () {
        this.visible = true;
        this.boo = true;
    };
    Line.prototype.onFrame = function (e) {
        if (this.boo) {
            this.y += GameData.enemySpeed * 3;
            if (this.y > Const.SCENT_HEIGHT) {
                this.visible = false;
                this.boo = false;
            }
        }
    };
    return Line;
}(egret.Sprite));
__reflect(Line.prototype, "Line");
