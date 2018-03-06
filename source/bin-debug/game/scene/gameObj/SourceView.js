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
