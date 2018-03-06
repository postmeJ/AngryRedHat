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
