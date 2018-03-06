var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/9/29.
 */
var StarlingswfMovieClip = (function () {
    function StarlingswfMovieClip() {
    }
    StarlingswfMovieClip.swfFrame = egret.getDefinitionByName(SwfFrameInfo.swfNum);
    return StarlingswfMovieClip;
}());
__reflect(StarlingswfMovieClip.prototype, "StarlingswfMovieClip");
