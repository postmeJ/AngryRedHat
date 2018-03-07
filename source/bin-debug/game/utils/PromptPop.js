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
 * 静态提示弹窗类
 * Created by Channing on 2014/10/11.
 */
var PromptPop = (function (_super) {
    __extends(PromptPop, _super);
    function PromptPop() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.isInto = false;
        _this.isAway = false;
        _this.isHide = false;
        _this.stay = 0;
        _this.tX = 0;
        _this.tY = 0;
        //提示窗体数据
        _this.config = {
            "isHide": true,
            "stayTime": 800,
            "tx": 0,
            "ty": 0
        };
        return _this;
    }
    PromptPop.prototype.activate = function (tx, ty, configType) {
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        if (configType === void 0) { configType = null; }
        //初始化字体,背景,缓动数据
        this.config["tx"] = tx;
        this.config["ty"] = ty;
        this.settings(configType);
        this.targetMc = StarlingSwfFactory.getInstance().makeMc("tip");
        this.addChild(this.targetMc);
        this.targetMc.x = this.tX;
        this.targetMc.y = this.tY;
        this.targetMc.visible = false;
    };
    PromptPop.prototype.show = function (index, tweenType) {
        if (tweenType === void 0) { tweenType = null; }
        //trace(isHide);
        if (this.targetMc == null)
            return;
        if (index == null) {
            //            alert("请填入背景索引");
        }
        if (tweenType) {
            if (tweenType["isHide"] != null)
                this.isHide = tweenType["isHide"];
            if (tweenType["stayTime"] != null)
                this.stay = tweenType["stayTime"];
            if (tweenType["tx"] != null)
                this.tX = tweenType["tx"];
            if (tweenType["ty"] != null)
                this.tY = tweenType["ty"];
        }
        this.setMc(index); //设置背景
        //根据参数开始缓动
        this.tweenStar();
    };
    PromptPop.prototype.tweenStar = function () {
        //        if (this.tw) this.tw.pause(this.tw);
        this.isInto = true; //正在进入
        this.isShow = true; //正在显示
        this.isAway = false; //未消失
        this.targetMc.x = this.tX;
        this.targetMc.y = this.tY;
        this.targetMc.alpha = 1;
        this.targetMc.visible = true;
        this.tw = egret.Tween.get(this.targetMc).call(this.tweenStop, this);
        this.tw.to({ y: this.tY - 200, alpha: 1 }, 200);
    };
    PromptPop.prototype.tweenStop = function () {
        this.isInto = false; //进入结束
        if (this.isHide) {
            this.isAway = true; //开始消失
            this.tw = egret.Tween.get(this.targetMc).call(this.tweenOver, this);
            this.tw.to({ alpha: 0, delay: 1, visible: false }, this.stay);
        }
        this.settings(); //初始化缓动设置
    };
    PromptPop.prototype.tweenOver = function () {
        this.isShow = false; //显示结束
        this.isAway = false; //消失结束
        //settings() ;
    };
    PromptPop.prototype.hide = function (delay) {
        if (delay === void 0) { delay = 0; }
        this.isHide = true;
        this.stay = delay;
        //if (!isInto && !isAway) {
        this.tweenStop();
        //}
    };
    PromptPop.prototype.settings = function (configType) {
        if (configType === void 0) { configType = null; }
        if (configType != null) {
            for (var c in this.config) {
                this.config[c] = configType[c] != null ? configType[c] : this.config[c];
            }
        }
        this.isHide = this.config["isHide"];
        this.stay = this.config["stayTime"];
        this.tX = this.config["tx"];
        this.tY = this.config["ty"];
    };
    PromptPop.prototype.setMc = function (index) {
        this.targetMc.goToPlay(index);
    };
    Object.defineProperty(PromptPop.prototype, "isSHOW", {
        get: function () {
            return this.isShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromptPop.prototype, "isINTO", {
        get: function () {
            return this.isInto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromptPop.prototype, "isAWAY", {
        get: function () {
            return this.isAway;
        },
        enumerable: true,
        configurable: true
    });
    PromptPop.prototype.removeAll = function () {
    };
    return PromptPop;
}(egret.Sprite));
__reflect(PromptPop.prototype, "PromptPop");
