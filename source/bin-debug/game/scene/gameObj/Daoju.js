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
