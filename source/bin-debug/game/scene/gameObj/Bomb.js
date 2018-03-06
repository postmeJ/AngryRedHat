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
 * Created by Channing on 2014/10/11.
 */
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this) || this;
        _this.speed = 0;
        _this.angle = 0;
        _this.lastX = 0;
        _this.lastY = 0;
        _this.sp = ResourceUtils.createBitmapByName("bombImage");
        _this.addChild(_this.sp);
        _this.sp.x = _this.sp.width / 2;
        _this.sp.rotation = 90;
        _this.speed = 30;
        egret.Ticker.getInstance().register(_this.onFrame, _this);
        return _this;
    }
    Bomb.prototype.move = function () {
        this.rotation = Math.atan2(this.lastY - this.y, this.lastX - this.x) * 180 / Math.PI;
        this.angle = this.rotation;
    };
    Bomb.prototype.onFrame = function () {
        if (!this.visible)
            return;
        this.x += this.speed * Math.cos(this.angle / 180 * Math.PI);
        this.y += this.speed * Math.sin(this.angle / 180 * Math.PI);
        var n = Math.sqrt(Math.pow(this.x - this.lastX, 2) + Math.pow(this.y - this.lastY, 2));
        if (n < 15) {
            //播放爆炸动画
            this.visible = false;
        }
    };
    Bomb.prototype.dispose = function () {
        egret.Ticker.getInstance().unregister(this.onFrame, this);
        this.removeChildren();
        this.sp = null;
    };
    return Bomb;
}(egret.Sprite));
__reflect(Bomb.prototype, "Bomb");
