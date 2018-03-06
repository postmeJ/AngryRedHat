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
 * Created by Administrator on 2014/10/9.
 */
var Hinder = (function (_super) {
    __extends(Hinder, _super);
    function Hinder() {
        return _super.call(this) || this;
    }
    Hinder.prototype.initView = function (num, type) {
        var bmp;
        switch (num) {
            case 1:
                if (type == 1) {
                    bmp = ResourceUtils.createBitmapByName("wall1_1Image");
                    this.addChild(bmp);
                }
                else {
                    bmp = ResourceUtils.createBitmapByName("wall1_2Image");
                    this.addChild(bmp);
                }
                break;
            case 2:
                if (type == 1) {
                    bmp = ResourceUtils.createBitmapByName("wall2_1Image");
                    this.addChild(bmp);
                }
                else {
                    bmp = ResourceUtils.createBitmapByName("wall2_2Image");
                    this.addChild(bmp);
                }
                break;
            case 3:
                if (type == 1) {
                    bmp = ResourceUtils.createBitmapByName("wall3_1Image");
                    this.addChild(bmp);
                }
                else {
                    bmp = ResourceUtils.createBitmapByName("wall3_2Image");
                    this.addChild(bmp);
                }
                break;
            case 4:
                if (type == 1) {
                    bmp = ResourceUtils.createBitmapByName("wall4_1Image");
                    this.addChild(bmp);
                }
                else {
                    bmp = ResourceUtils.createBitmapByName("wall4_2Image");
                    this.addChild(bmp);
                }
                break;
            case 5:
                if (type == 1) {
                    bmp = ResourceUtils.createBitmapByName("wall5_1Image");
                    this.addChild(bmp);
                }
                else {
                    bmp = ResourceUtils.createBitmapByName("wall5_2Image");
                    this.addChild(bmp);
                }
                break;
        }
    };
    return Hinder;
}(egret.Sprite));
__reflect(Hinder.prototype, "Hinder");
