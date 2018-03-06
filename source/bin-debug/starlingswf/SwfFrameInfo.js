var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Channing on 2014/9/29.
 */
/// <reference path="SwfAnimationInfo.ts" />
var SwfFrameInfo = (function () {
    function SwfFrameInfo() {
    }
    SwfFrameInfo.swfNum = SwfAnimationInfo.arr.join("");
    return SwfFrameInfo;
}());
__reflect(SwfFrameInfo.prototype, "SwfFrameInfo");
