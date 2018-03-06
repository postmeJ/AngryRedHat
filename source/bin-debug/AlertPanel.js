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
 * Created by Saco on 2014/12/24.
 */
var AlertPanel = (function (_super) {
    __extends(AlertPanel, _super);
    function AlertPanel() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED, _this.initView, _this);
        return _this;
    }
    AlertPanel.prototype.initView = function () {
        this.initBG();
        this.initBtn();
        this.initTf();
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight / 2;
    };
    AlertPanel.prototype.initBG = function () {
        this._panelBg = new egret.Shape();
        this._panelBg.graphics.lineStyle(1, 0x666666, 1);
        this._panelBg.graphics.beginFill(0xffffff, 0.9);
        this._panelBg.graphics.drawRect(0, 0, 300, 200);
        this._panelBg.graphics.endFill();
        this._panelBg.width = 300;
        this._panelBg.height = 200;
        this.addChild(this._panelBg);
    };
    AlertPanel.prototype.initBtn = function () {
        this._btn = new egret.Shape();
        this._btn.graphics.lineStyle(1, 0x666666, 1);
        this._btn.graphics.beginFill(0xffffff);
        this._btn.graphics.drawRect(0, 0, 80, 40);
        this._btn.graphics.endFill();
        this._btn.width = 80;
        this._btn.height = 40;
        this._btn.x = 110;
        this._btn.y = 140;
        this._btn.touchEnabled = true;
        this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBtn, this);
        this.addChild(this._btn);
        this._btnLabel = new egret.TextField();
        this._btnLabel.size = 20;
        this._btnLabel.textColor = 0x333333;
        this._btnLabel.text = "确定";
        this._btnLabel.width = 80;
        this._btnLabel.height = 40;
        this._btnLabel.bold = true;
        this._btnLabel.x = this._btn.x;
        this._btnLabel.y = this._btn.y;
        this._btnLabel.textAlign = "center";
        this._btnLabel.verticalAlign = "middle";
        this.addChild(this._btnLabel);
    };
    AlertPanel.prototype.initTf = function () {
        this._msgTf = new egret.TextField(); //网络异常，请重新进入游戏
        this._msgTf.textAlign = "center";
        this._msgTf.verticalAlign = "middle";
        this._msgTf.width = 240;
        this._msgTf.height = 100;
        this._msgTf.x = 30;
        this._msgTf.y = 20;
        this._msgTf.textColor = 0x555555;
        this._msgTf.size = 25;
        this._msgTf.bold = true;
        this.addChild(this._msgTf);
    };
    AlertPanel.i = function () {
        if (!this._instance)
            this._instance = new AlertPanel();
        return this._instance;
    };
    AlertPanel.prototype.showErr = function (errMsg) {
        this._msgTf.text = errMsg;
        egret.MainContext.instance.stage.addChild(this);
    };
    AlertPanel.prototype.onClickBtn = function () {
        if (egret.RuntimeType.WEB == egret.Capabilities.runtimeType)
            this.reloadPage();
        else
            this.hide();
    };
    AlertPanel.prototype.reloadPage = function () {
        location.reload();
    };
    AlertPanel.prototype.hide = function () {
        if (this.parent)
            this.parent.removeChild(this);
    };
    return AlertPanel;
}(egret.DisplayObjectContainer));
__reflect(AlertPanel.prototype, "AlertPanel");
