var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/9/29.
 */
var GS = (function () {
    function GS() {
    }
    GS.bb = 1010101010000010;
    return GS;
}());
__reflect(GS.prototype, "GS");
