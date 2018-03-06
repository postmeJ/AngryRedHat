var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by husong on 14/10/22.
 */
var ButtonSkin = (function () {
    function ButtonSkin(upSkinName, downSkinName) {
        this._upSkinName = upSkinName;
        this._downSkinName = downSkinName;
    }
    Object.defineProperty(ButtonSkin.prototype, "upSkinName", {
        get: function () {
            return this._upSkinName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonSkin.prototype, "downSkinName", {
        get: function () {
            return this._downSkinName;
        },
        enumerable: true,
        configurable: true
    });
    return ButtonSkin;
}());
__reflect(ButtonSkin.prototype, "ButtonSkin");
