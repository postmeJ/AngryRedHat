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
