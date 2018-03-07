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
 * Created by Administrator on 2014/10/9.
 */
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    GameStartView.prototype.initView = function () {
        var bg = ResourceUtils.createBitmapByName("bgImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);
        var startBtn = new MyButtonForGame("startBtnImage", "startBtnImage");
        this.addChild(startBtn);
        startBtn.x = Const.SCENT_WIDTH / 2 - startBtn.width / 2;
        startBtn.y = Const.SCENT_HEIGHT - startBtn.height - 30;
        startBtn.setClick(this.onStartGameHandler.bind(this));
        var music_btn = new MyButtonForGame("musicBtnImage", "musicBtnImage");
        this.addChild(music_btn);
        music_btn.x = startBtn.x + startBtn.width + 10;
        music_btn.y = startBtn.y + 10;
        music_btn.setClick(this.showGameSoundHandler.bind(this));
        var help_btn = new MyButtonForGame("helpBtnImage", "helpBtnImage");
        this.addChild(help_btn);
        help_btn.x = startBtn.x - 10 - help_btn.width;
        help_btn.y = startBtn.y + 10;
        help_btn.setClick(this.showGameInfoHandler.bind(this));
        this.gameSoundPop = new MusicView();
        this.addChild(this.gameSoundPop);
        this.gameSoundPop.visible = false;
    };
    GameStartView.prototype.showGameSoundHandler = function (e) {
        this.gameSoundPop.visible = true;
        GameData.isClickBtn = true;
    };
    GameStartView.prototype.showGameInfoHandler = function (e) {
        this.removeAll();
        var gameInfo = new GameInfoView();
        this.addChild(gameInfo);
    };
    GameStartView.prototype.onStartGameHandler = function () {
        GameSceneView._gameScene.play();
        this.removeAll();
    };
    GameStartView.prototype.removeAll = function () {
        this.removeChildren();
        this.gameSoundPop = null;
    };
    return GameStartView;
}(egret.Sprite));
__reflect(GameStartView.prototype, "GameStartView");
