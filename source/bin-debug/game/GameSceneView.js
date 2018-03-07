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
var GameSceneView = (function (_super) {
    __extends(GameSceneView, _super);
    function GameSceneView() {
        var _this = _super.call(this) || this;
        GameSceneView._gameScene = _this;
        _this.initView();
        return _this;
    }
    GameSceneView.prototype.initView = function () {
        // Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.start();
    };
    GameSceneView.prototype.start = function () {
        this.removeAll();
        var gameStart = new GameStartView();
        this.thisContainer.addChild(gameStart);
    };
    GameSceneView.prototype.play = function () {
        this.removeAll();
        var gamePlay = new GamePlayView();
        this.thisContainer.addChild(gamePlay);
        gamePlay.showGame(GameData.curScene);
    };
    GameSceneView.prototype.over = function () {
        this.removeAll();
        var gameOver = new GameOverView();
        this.thisContainer.addChild(gameOver);
    };
    GameSceneView.prototype.removeAll = function () {
        this.thisContainer.removeChildren();
    };
    return GameSceneView;
}(egret.Sprite));
__reflect(GameSceneView.prototype, "GameSceneView");
