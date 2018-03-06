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
 * StarlingSwfSpriteSheet解析器
 */
var starlingswf;
(function (starlingswf) {
    var StarlingSwfSheetAnalyzer = (function (_super) {
        __extends(StarlingSwfSheetAnalyzer, _super);
        function StarlingSwfSheetAnalyzer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StarlingSwfSheetAnalyzer.prototype.parseSpriteSheet = function (texture, data) {
            var frames = data.frames;
            if (!frames) {
                return;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            for (var name in frames) {
                var config = frames[name];
                spriteSheet.createTexture(name, config.x, config.y, config.w, config.h, -config.offX, -config.offY);
            }
            return spriteSheet;
        };
        return StarlingSwfSheetAnalyzer;
    }(RES.SheetAnalyzer));
    starlingswf.StarlingSwfSheetAnalyzer = StarlingSwfSheetAnalyzer;
    __reflect(StarlingSwfSheetAnalyzer.prototype, "starlingswf.StarlingSwfSheetAnalyzer");
})(starlingswf || (starlingswf = {}));
