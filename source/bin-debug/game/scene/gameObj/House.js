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
var House = (function (_super) {
    __extends(House, _super);
    function House() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    House.prototype.initView = function () {
        var house = ResourceUtils.createBitmapByName("houseImage");
        this.addChild(house);
    };
    return House;
}(egret.Sprite));
__reflect(House.prototype, "House");
