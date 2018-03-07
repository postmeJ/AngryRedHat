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
 * Created by Administrator on 2014/10/9.
 */
var BgView = (function (_super) {
    __extends(BgView, _super);
    function BgView() {
        var _this = _super.call(this) || this;
        _this.bg1Height = 0;
        _this.bg2Height = 0;
        return _this;
    }
    BgView.prototype.initView = function (num) {
        // 两张图拼接
        this.bg2 = new BackGroundView(num);
        this.addChild(this.bg2);
        this.bg1 = new BackGroundView(num);
        this.addChild(this.bg1);
        this.bg1Height = this.bg1.height;
        this.bg1.y = -this.bg1Height + Const.SCENT_HEIGHT;
        this.bg2Height = this.bg2.height;
        this.bg2.y = this.bg1.y - this.bg2Height;
    };
    BgView.prototype.updata = function () {
        // 需要想想
        if (this.bg1.y >= Const.SCENT_HEIGHT) {
            this.bg1.y = this.bg2.y - this.bg1Height;
        }
        if (this.bg2.y >= Const.SCENT_HEIGHT) {
            this.bg2.y = this.bg1.y - this.bg2Height;
        }
        this.bg1.y += GameData.bgSpeed;
        this.bg2.y += GameData.bgSpeed;
    };
    BgView.prototype.dispose = function () {
        this.removeChildren();
        this.bg1 = null;
        this.bg2 = null;
    };
    return BgView;
}(egret.Sprite));
__reflect(BgView.prototype, "BgView");
