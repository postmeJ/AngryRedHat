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
 * Created by Channing on 2014/10/9.
 */
var GameInfoView = (function (_super) {
    __extends(GameInfoView, _super);
    function GameInfoView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    GameInfoView.prototype.initView = function () {
        var bg = ResourceUtils.createBitmapByName("gameinfoImage");
        this.addChild(bg);
        var startBtn = new MyButtonForGame("startBtnImage", "startBtnImage");
        this.addChild(startBtn);
        startBtn.y = Const.SCENT_HEIGHT - startBtn.height;
        startBtn.x = Const.SCENT_WIDTH / 2 - startBtn.width / 2;
        startBtn.setClick(this.onStartGameHandler.bind(this));
    };
    GameInfoView.prototype.onStartGameHandler = function () {
        GameSceneView._gameScene.play();
        this.removeChildren();
    };
    return GameInfoView;
}(egret.Sprite));
__reflect(GameInfoView.prototype, "GameInfoView");
