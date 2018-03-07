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
 * Created by husong on 14/10/22.
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(buttonVO) {
        if (buttonVO === void 0) { buttonVO = null; }
        var _this = _super.call(this) || this;
        _this._buttonSkin = buttonVO;
        _this.upBmp = new egret.Bitmap();
        _this.upBmp.visible = true;
        _this.downBmp = new egret.Bitmap();
        _this.downBmp.visible = false;
        _this.lable = new egret.Bitmap();
        _this.touchEnabled = true;
        _this.addChild(_this.upBmp);
        _this.addChild(_this.downBmp);
        _this.addChild(_this.lable);
        _this.setTexture(buttonVO);
        _this.addHandlers();
        return _this;
    }
    Button.prototype.addHandlers = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    Button.prototype.touchHandler = function (event) {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.upBmp.visible = false;
                this.downBmp.visible = true;
                break;
            case egret.TouchEvent.TOUCH_END:
                this.upBmp.visible = true;
                this.downBmp.visible = false;
                break;
            case egret.TouchEvent.TOUCH_TAP:
                //                this.clickHandler(event);
                this.clickHandler.call(this.clickHandlerObj, event);
                break;
        }
    };
    Button.prototype.setTexture = function (buttonVO) {
        if (buttonVO) {
            this._buttonSkin = buttonVO;
            this.upBmp.texture = GameUtils.createTextureByName(buttonVO.upSkinName);
            this.downBmp.texture = GameUtils.createTextureByName(buttonVO.downSkinName);
        }
    };
    Button.prototype.setLableTexture = function (name) {
        this.lable.texture = GameUtils.createTextureByName(name);
        this.lable.x = this.width / 2 - this.lable.width / 2;
        this.lable.y = this.height / 2 - this.lable.height / 2;
    };
    Object.defineProperty(Button.prototype, "buttonSkin", {
        get: function () {
            return this._buttonSkin;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.setClickHandler = function (func, funcObj) {
        this.clickHandler = func;
        this.clickHandlerObj = funcObj;
    };
    return Button;
}(egret.Sprite));
__reflect(Button.prototype, "Button");
