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
 * Created by husong on 14/11/7.
 */
var ReliveView = (function (_super) {
    __extends(ReliveView, _super);
    function ReliveView() {
        var _this = _super.call(this) || this;
        _this.initUI();
        return _this;
    }
    ReliveView.prototype.initUI = function () {
        var bg = GameUtils.createBitmapByName("newAssets.blackBg");
        bg.touchEnabled = true;
        bg.alpha = 0.3;
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
        this.btnRelive = new Button();
        this.btnRelive.setTexture(new ButtonSkin("newAssets.btn01_up", "newAssets.btn01_down"));
        this.btnRelive.setLableTexture("newAssets.fuhuo");
        this.btnRelive.x = Const.SCENT_WIDTH / 2 - this.btnRelive.width - 10;
        this.btnRelive.y = Const.SCENT_HEIGHT / 2 - this.btnRelive.height - 10;
        this.addChild(this.btnRelive);
        this.btnOver = new Button();
        this.btnOver.setTexture(new ButtonSkin("newAssets.btn02_up", "newAssets.btn02_down"));
        this.btnOver.setLableTexture("newAssets.jieshu");
        this.btnOver.x = Const.SCENT_WIDTH / 2 + 10;
        this.btnOver.y = Const.SCENT_HEIGHT / 2 - this.btnRelive.height - 10;
        this.addChild(this.btnOver);
    };
    ReliveView.prototype.setGameOver = function (func, funcObj) {
        this.btnOver.setClickHandler(func, funcObj);
    };
    ReliveView.prototype.setRelive = function (func, funcObj) {
        this.btnRelive.setClickHandler(func, funcObj);
    };
    return ReliveView;
}(egret.DisplayObjectContainer));
__reflect(ReliveView.prototype, "ReliveView");
