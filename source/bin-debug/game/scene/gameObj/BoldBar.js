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
 * 主角血量
 * Created by Channing on 2014/10/15.
 */
var BoldBar = (function (_super) {
    __extends(BoldBar, _super);
    function BoldBar() {
        var _this = _super.call(this) || this;
        _this.w = 0;
        _this.initView();
        return _this;
    }
    BoldBar.prototype.initView = function () {
        var barBg = ResourceUtils.createBitmapByName("blodBarBgImage");
        this.addChild(barBg);
        var blodBar = ResourceUtils.createBitmapByName("blodBarImage");
        this.addChild(blodBar);
        blodBar.x = 38;
        blodBar.y = 8;
        /**
         * rectangle
         */
        this.w = blodBar.width;
        this.r = new egret.Rectangle();
        this.r.x = 0;
        this.r.y = 0;
        this.r.width = blodBar.width;
        console.log('blodBar.width', blodBar.width);
        this.r.height = blodBar.height;
        blodBar.mask = this.r;
    };
    BoldBar.prototype.scaleBlodX = function () {
        this.r.x = -(this.w - this.w * (GameData.blod / 5));
    };
    return BoldBar;
}(egret.Sprite));
__reflect(BoldBar.prototype, "BoldBar");
