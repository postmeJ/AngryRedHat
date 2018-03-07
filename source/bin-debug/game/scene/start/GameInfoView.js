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
