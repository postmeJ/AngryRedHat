/**
 * Created by Channing on 2014/10/11.
 */
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
// 弓箭
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
    /**
     * 修改angle
     *
     * @memberof Bomb
     */
    Bomb.prototype.move = function () {
        this.rotation = Math.atan2(this.lastY - this.y, this.lastX - this.x) * 180 / Math.PI;
        this.angle = this.rotation;
    };
    Bomb.prototype.onFrame = function () {
        if (!this.visible)
            return;
        this.x += this.speed * Math.cos(this.angle / 180 * Math.PI);
        this.y += this.speed * Math.sin(this.angle / 180 * Math.PI);
        // 斜边小的时候,就不显示了
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
