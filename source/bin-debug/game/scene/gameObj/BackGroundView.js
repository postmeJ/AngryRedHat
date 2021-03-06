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
 * Created by Channing on 2014/10/9.
 */
var BackGroundView = (function (_super) {
    __extends(BackGroundView, _super);
    function BackGroundView(num) {
        var _this = _super.call(this) || this;
        _this.initView(num);
        return _this;
    }
    BackGroundView.prototype.initView = function (num) {
        var bg;
        var leftWall = new Hinder;
        var rightWall = new Hinder;
        switch (num) {
            case 1:
                bg = ResourceUtils.createBitmapByName("fight1BgImage");
                this.addChild(bg);
                leftWall.initView(1, 1);
                rightWall.initView(1, 2);
                break;
            case 2:
                bg = ResourceUtils.createBitmapByName("fight2BgImage");
                this.addChild(bg);
                leftWall.initView(2, 1);
                rightWall.initView(2, 2);
                break;
            case 3:
                bg = ResourceUtils.createBitmapByName("fight3BgImage");
                this.addChild(bg);
                leftWall.initView(3, 1);
                rightWall.initView(3, 2);
                break;
            case 4:
                bg = ResourceUtils.createBitmapByName("fight4BgImage");
                this.addChild(bg);
                leftWall.initView(4, 1);
                rightWall.initView(4, 2);
                break;
            case 5:
                bg = ResourceUtils.createBitmapByName("fight5BgImage");
                this.addChild(bg);
                leftWall.initView(5, 1);
                rightWall.initView(5, 2);
                break;
        }
        // 定位
        this.addChild(rightWall);
        this.addChild(leftWall);
        rightWall.x = Const.SCENT_WIDTH - rightWall.width;
    };
    return BackGroundView;
}(egret.Sprite));
__reflect(BackGroundView.prototype, "BackGroundView");
