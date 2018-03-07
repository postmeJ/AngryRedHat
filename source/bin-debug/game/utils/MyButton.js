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
 * Created by Channing on 2014/9/17.
 */
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton(bgName, titleName) {
        var _this = _super.call(this) || this;
        _this.sp = new egret.Sprite();
        _this.addChild(_this.sp);
        _this.bg = ResourceUtils.createBitmapByName(bgName);
        _this.sp.addChild(_this.bg);
        _this.title = ResourceUtils.createBitmapByName(titleName);
        if (_this.title.texture == null) {
            _this.title.texture = RES.getRes(titleName);
        }
        _this.title.x = (_this.bg.width - _this.title.width) >> 1;
        _this.title.y = (_this.bg.height - _this.title.height) >> 1;
        _this.sp.addChild(_this.title);
        _this.noScaleX = _this.sp.x;
        _this.noScaleY = _this.sp.y;
        return _this;
    }
    MyButton.prototype.setClick = function (func) {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = func;
    };
    MyButton.prototype.onClickEvent = function () {
        var scaleX = (this.sp.width - this.sp.width * 0.8) / 2;
        var scaleY = (this.sp.height - this.sp.height * 0.8) / 2;
        this.tw = egret.Tween.get(this.sp);
        this.tw.to({ "scaleX": 0.7, "scaleY": 0.7, "x": scaleX, "y": scaleY }, 40).to({ "scaleX": 1, "scaleY": 1, "x": this.noScaleX, "y": this.noScaleY }, 40);
        //
        //        var delay = 350;
        //        var tw:egret.Tween = egret.Tween.get(this, {onChange: this.moveFrame, onChangeObj: this});
        //        this.y = Consts.GAME_HEIGHT/2;
        //
        //        tw.to({"scaleX": 1, "scaleY":1,"alpha": 1}, delay);
        this.onClick();
    };
    return MyButton;
}(egret.Sprite));
__reflect(MyButton.prototype, "MyButton");
