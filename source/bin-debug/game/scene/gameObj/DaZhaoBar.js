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
 * Created by Channing on 2014/10/16.
 */
var DaZhaoBar = (function (_super) {
    __extends(DaZhaoBar, _super);
    function DaZhaoBar() {
        var _this = _super.call(this) || this;
        _this.w = 0;
        //固定遮罩的最小X
        _this.b = 0;
        _this.rx = 1;
        _this.boo = false;
        return _this;
    }
    DaZhaoBar.prototype.initView = function () {
        var bg = ResourceUtils.createBitmapByName("dazhaoBarBg");
        this.addChild(bg);
        var bar = ResourceUtils.createBitmapByName("dazhaoImage");
        this.addChild(bar);
        bg.x = -2;
        bg.y = 2;
        bar.y = bg.y + 2;
        this.w = bar.width;
        this.r = new egret.Rectangle();
        this.b = bar.x - bar.width;
        this.r.x = this.b;
        this.r.y = 0;
        this.r.width = bar.width;
        this.r.height = bar.height;
        bar.mask = this.r;
        egret.Ticker.getInstance().register(this.onFrameHandler, this);
    };
    DaZhaoBar.prototype.onFrameHandler = function () {
        if (!this.boo)
            return;
        this.r.x = this.rx;
    };
    DaZhaoBar.prototype.setValue = function () {
        if (this.boo)
            return;
        if (GameData.profectNum > GameData.dazhaoTime) {
            GameData.profectNum = GameData.dazhaoTime;
        }
        this.r.x = -(this.w - this.w * (GameData.profectNum / GameData.dazhaoTime));
    };
    return DaZhaoBar;
}(egret.Sprite));
__reflect(DaZhaoBar.prototype, "DaZhaoBar");
