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
 * Created by Channing on 2014/10/14.
 */
var Daoju = (function (_super) {
    __extends(Daoju, _super);
    function Daoju(num) {
        if (num === void 0) { num = 0; }
        var _this = _super.call(this) || this;
        _this.initView(num);
        return _this;
    }
    Daoju.prototype.initView = function (num) {
        if (num === void 0) { num = 0; }
    };
    return Daoju;
}(egret.Sprite));
__reflect(Daoju.prototype, "Daoju");
