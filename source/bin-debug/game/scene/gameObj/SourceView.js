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
var SourceView = (function (_super) {
    __extends(SourceView, _super);
    function SourceView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    SourceView.prototype.initView = function () {
        var sorceMc = ResourceUtils.createBitmapByName("sorceMcImage");
        this.addChild(sorceMc);
        this.showSorce = new SpecialNumber("number-");
        this.showSorce.x = sorceMc.width + 10;
        this.addChild(this.showSorce);
    };
    SourceView.prototype.setValue = function (sorce) {
        if (sorce === void 0) { sorce = 0; }
        this.showSorce.setValue(sorce + "");
    };
    return SourceView;
}(egret.Sprite));
__reflect(SourceView.prototype, "SourceView");
