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
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        var _this = _super.call(this) || this;
        _this.thisNum = 0;
        _this.num = 0;
        /**
         * 帧回调用的变量
         * 对应于t1,t2,t3
         */
        _this.t1Num = 0;
        _this.t2Num = 0;
        _this.t3Num = 0;
        /**
         * 三种怪的实时x位置
         */
        _this.huliW = 0;
        _this.langW = 0;
        _this.bianfuW = 0;
        /**
         * 随机算的超过多少人的变量
         */
        _this.ttNum = 0;
        /**
         * 帧回调用的变量
         * 对应于ttNum
         */
        _this.tNum = 0;
        /**
         * 关卡判断使用的变量
         */
        _this.boo1 = false;
        _this.boo3 = false;
        _this.boo2 = false;
        _this.initView();
        return _this;
    }
    GameOverView.prototype.initView = function () {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.bg = ResourceUtils.createBitmapByName("overBgImage");
        this.thisContainer.addChild(this.bg);
        // enemy
        this.initEnemy(GameData.curScene);
        /**
         * score
         * 默认0分的情况下
         */
        this.sorce = new SpecialNumber("number-0");
        this.thisContainer.addChild(this.sorce);
        this.sorce.setValue(0 + "");
        this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        this.sorce.y = Const.SCENT_HEIGHT / 6;
        // 心跳
        // http://edn.egret.com/cn/apidoc/egret/name/egret.Ticker
        // register() 注册帧回调事件，同一函数的重复监听会被忽略。推荐使用 egret.startTick 替代此方法。
        // http://developer.egret.com/cn/apidoc/index/name/egret.Ticker
        egret.Ticker.getInstance().register(this.showSorce, this);
        this.tt = new egret.TextField();
        this.addChild(this.tt);
        if (GameData.isWin) {
            var b = Math.floor(Math.random() * 15 + 80);
        }
        else {
            var b = Math.floor(Math.random() * 40 + 40);
        }
        // tt
        this.ttNum = b; // 超过多少人的变量
        this.tt.text = "超越了丛林中" + 0 + "%的小伙伴";
        this.tt.textColor = 0x000000;
        this.tt.bold = true;
        this.tt.size = 32;
        this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10;
        this.tt.y = 505;
        /**
         * 更多游戏
         */
        // 我的egret.Sprit()的理解
        // sprit是一个容器,不过这个容器主要提供给图片和作为布局的图片
        this.spGengduo = new egret.Sprite();
        this.thisContainer.addChild(this.spGengduo);
        // !!!
        // sprit > bitmap
        // spGengduo > gengduo
        var gengduo = ResourceUtils.createBitmapByName("btngengduoyouxi");
        this.spGengduo.addChild(gengduo);
        this.spGengduo.touchEnabled = true;
        this.spGengduo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        //EgretShare.setShareContent("我的小红帽干掉了"+(GameData.langNum+GameData.huliNum+GameData.bianfuNum)+"只色狼,获得了"+GameData.sorce+"分,超越了"+b+"%的小伙伴.");
        /**
         * 再来一局
         */
        this.spZaiLai = new egret.Sprite();
        this.thisContainer.addChild(this.spZaiLai);
        var zailai = ResourceUtils.createBitmapByName("btnzailaiyici");
        this.spZaiLai.addChild(zailai);
        this.spZaiLai.touchEnabled = true;
        this.spZaiLai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        /**
         * 分享
         */
        this.spFenXiang = new egret.Sprite();
        this.thisContainer.addChild(this.spFenXiang);
        var fenxiang = ResourceUtils.createBitmapByName("btnfenxiang");
        this.spFenXiang.addChild(fenxiang);
        this.spFenXiang.touchEnabled = true;
        this.spFenXiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        /**
         *
         */
        this.spGengduo.y = this.spFenXiang.y = this.spZaiLai.y = 600;
        this.spGengduo.x = 12;
        this.spZaiLai.x = 170;
        this.spFenXiang.x = 330;
        //        if(!EgretShare.canShare){
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            //            this.spGengduo.x = 82;
            //            this.spZaiLai.x = 260;
            this.thisContainer.removeChild(this.spGengduo);
            this.thisContainer.removeChild(this.spFenXiang);
        }
        /**
         * shareImage
         */
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        var bg = ResourceUtils.createBitmapByName("shareImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.sp.addChild(bg);
        this.sp.visible = false;
        this.sp.touchEnabled = true;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShare, this);
        this.thisContainer.scaleX = this.thisContainer.scaleY = 0.9;
        this.thisContainer.x = Const.SCENT_WIDTH / 2 - this.thisContainer.width / 2 + 30;
        this.thisContainer.y = Const.SCENT_HEIGHT / 2 - this.thisContainer.height / 2 + 30;
    };
    /**
     * 修改和展示 等分和杀死不同的怪的数量
     *
     * @private
     * @param {egret.Event} e
     * @memberof GameOverView
     */
    GameOverView.prototype.showSorce = function (e) {
        /**
         * for test
         */
        // GameData.sorce = 20000
        // GameData.langNum = 10
        // GameData.huliNum = 10
        // GameData.bianfuNum = 10
        this.num++;
        if (this.thisNum < GameData.sorce) {
            this.thisNum += this.num;
            if (this.thisNum > GameData.sorce) {
                this.thisNum = GameData.sorce;
            }
            this.sorce.setValue(this.thisNum + "");
            this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        }
        if (this.boo1) {
            if (this.t1Num < GameData.langNum) {
                this.t1Num += 3;
                if (this.t1Num > GameData.langNum) {
                    this.t1Num = GameData.langNum;
                }
                this.t1.setValue(this.t1Num + "");
                this.t1.x = this.langW - this.t1.width / 2;
            }
        }
        if (this.boo2) {
            if (this.t2Num < GameData.huliNum) {
                this.t2Num += 3; // why???
                if (this.t2Num > GameData.huliNum) {
                    this.t2Num = GameData.huliNum;
                }
                this.t2.setValue(this.t2Num + "");
                this.t2.x = this.huliW - this.t2.width / 2;
            }
        }
        if (this.boo3) {
            if (this.t3Num < GameData.bianfuNum) {
                this.t3Num += 3;
                if (this.t3Num > GameData.bianfuNum) {
                    this.t3Num = GameData.bianfuNum;
                }
                this.t3.setValue(this.t3Num + "");
                this.t3.x = this.bianfuW - this.t3.width / 2;
            }
        }
        if (this.tNum < this.ttNum) {
            this.tNum += 2;
            if (this.tNum > this.ttNum) {
                this.tNum = this.ttNum;
            }
            this.tt.text = "超越了丛林中" + this.tNum + "%的小伙伴";
            this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10;
        }
    };
    GameOverView.prototype.toShareView = function (e) {
        //EgretShare.share();
    };
    GameOverView.prototype.toGengDuoView = function (e) {
        // 展示more game
        //EgretShare.moreGame();
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
    };
    GameOverView.prototype.toGameStartView = function (e) {
        GameData.curScene = 1;
        GameData.sorce = 0;
        GameData.langNum = 0;
        GameData.huliNum = 0;
        GameData.bianfuNum = 0;
        GameData.isPause = true;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        GameData.blod = 5;
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        this.spFenXiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spZaiLai.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        // 删除子删除自己
        this.removeChildren();
        if (this.parent)
            this.parent.removeChild(this);
        GameSceneView._gameScene.start();
    };
    /**
     * 没有被使用
     *
     * @private
     * @param {egret.TouchEvent} e
     * @memberof GameOverView
     */
    GameOverView.prototype.touchShare = function (e) {
        this.sp.visible = false;
    };
    GameOverView.prototype.initEnemy = function (num) {
        if (num === void 0) { num = 0; }
        if (num == 1 || num == 2) {
            this.boo1 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            this.thisContainer.addChild(lang);
            lang.goToPlay("run");
            lang.y = 340;
            lang.x = 140 + lang.width;
            this.langW = lang.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
        }
        else if (num == 3 || num == 4) {
            this.boo1 = true;
            this.boo2 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli = StarlingSwfFactory.getInstance().makeMc("huli");
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);
            lang.goToPlay("run");
            huli.goToPlay("run");
            huli.y = 320;
            lang.y = 340;
            lang.x = (220 + lang.width) / 2;
            huli.x = lang.x + lang.width + 60;
            this.langW = lang.x;
            this.huliW = huli.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0 + "");
            this.t2.x = huli.x - this.t2.width / 2;
            this.t2.y = huli.y + lang.height * 0.6;
        }
        else if (num == 5 || num == 6) {
            this.boo1 = true;
            this.boo2 = true;
            this.boo3 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli = StarlingSwfFactory.getInstance().makeMc("huli");
            var bianfu = StarlingSwfFactory.getInstance().makeMc("bianfu");
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);
            this.thisContainer.addChild(bianfu);
            lang.goToPlay("run");
            huli.goToPlay("run");
            bianfu.goToPlay("run");
            huli.y = 320;
            bianfu.y = 335;
            lang.y = 340;
            lang.x = 90;
            huli.x = lang.x + lang.width + 60;
            this.huliW = huli.x;
            this.langW = lang.x;
            bianfu.x = huli.x + huli.width + 70;
            this.bianfuW = bianfu.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0 + "");
            this.t2.x = huli.x - this.t2.width / 2;
            this.t2.y = huli.y + lang.height * 0.6;
            this.t3 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t3);
            this.t3.setValue(0 + "");
            this.t3.x = bianfu.x - this.t3.width / 2;
            this.t3.y = bianfu.y + lang.height * 0.6 - 15;
        }
    };
    return GameOverView;
}(egret.Sprite));
__reflect(GameOverView.prototype, "GameOverView");
