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
var GamePlayView = (function (_super) {
    __extends(GamePlayView, _super);
    function GamePlayView() {
        var _this = _super.call(this) || this;
        // this.sp一个新的容器
        _this.sp = new egret.Sprite();
        _this.sp.touchEnabled = true;
        _this.addChild(_this.sp);
        return _this;
    }
    GamePlayView.prototype.showGame = function (index) {
        GameData.isStartClickOption = true;
        GameData.isStart = false;
        /**
         * option btn
         */
        // egret的图片节点正确姿势:
        // sprite > bitmap
        var optionBtn = new egret.Sprite();
        var optionBmp = ResourceUtils.createBitmapByName("optionBtnImage");
        optionBtn.addChild(optionBmp);
        optionBtn.touchEnabled = true;
        optionBtn.x = Const.SCENT_WIDTH - optionBtn.width;
        optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOptionView, this);
        this.sp.removeChildren();
        switch (index) {
            case 1:
                var game1 = new GameFightOneView();
                this.sp.addChild(game1);
                this.target = game1;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_1_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 2:
                var game2 = new GameFightTwoView();
                this.sp.addChild(game2);
                this.target = game2;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_2_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 3:
                var game3 = new GameFightThreeView();
                this.sp.addChild(game3);
                this.target = game3;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_3_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 4:
                var game4 = new GameFightFourView();
                this.sp.addChild(game4);
                this.target = game4;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_4_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 5:
                var game5 = new GameFightFiveView();
                this.sp.addChild(game5);
                this.target = game5;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_5_Image");
                this.sp.addChild(this.thisContainer);
                break;
        }
        this.addChild(optionBtn);
        this.optionView = new OptionView();
        this.addChild(this.optionView);
        this.optionView.visible = false;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);
    };
    GamePlayView.prototype.startHandler = function (e) {
        if (this.optionView.visible == true)
            return;
        if (GameData.isClickBtn)
            return;
        GameData.isStart = true;
        this.sp.removeChild(this.thisContainer);
        // 本项目中所有的事情都及时的清理了 
        this.sp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);
        this.thisContainer = null;
        this.sp.touchEnabled = false;
        this.ready = StarlingSwfFactory.getInstance().makeMc("go");
        this.ready.x = Const.SCENT_WIDTH / 2;
        this.ready.y = Const.SCENT_HEIGHT / 2;
        //  anchorOffset没有设置???
        // 是否是在swf文件中处理了???
        // this.ready.anchorOffsetX = this.ready.width / 2
        // this.ready.anchorOffsetY = this.ready.height / 2
        // console.log('Const.SCENT_WIDTH/2', Const.SCENT_WIDTH/2)
        // console.log('Const.SCENT_HEIGHT/2', Const.SCENT_HEIGHT/2)
        // console.log('this.ready.x', this.ready.x)
        // console.log('this.ready.y', this.ready.y)
        // console.log('this.ready.anchorOffsetX', this.ready.anchorOffsetX)
        // console.log('this.ready.anchorOffsetY', this.ready.anchorOffsetY)
        // console.log('this.ready.width', this.ready.width)
        this.addChild(this.ready);
        this.ready.goToPlay("1");
        SoundUtils.instance().playNum();
        GameData.isStartClickOption = false;
        this.ready.setCompleteAction(this.complete1, this);
    };
    GamePlayView.prototype.showOptionView = function () {
        if (GameData.isStartClickOption) {
            this.optionView.visible = true;
            GameData.isPause = true;
        }
    };
    GamePlayView.prototype.complete1 = function () {
        this.ready.goToPlay("2");
        SoundUtils.instance().playGo();
        egret.setTimeout(this.complete2.bind(this), this, 300);
    };
    GamePlayView.prototype.complete2 = function () {
        GameData.isStartClickOption = true;
        GameData.isStart = true;
        GameData.isPause = false;
        SoundUtils.instance().playBg();
        this.target.redGirl.run();
        this.removeChild(this.ready);
    };
    return GamePlayView;
}(egret.Sprite));
__reflect(GamePlayView.prototype, "GamePlayView");
