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
var GameFightView = (function (_super) {
    __extends(GameFightView, _super);
    function GameFightView() {
        var _this = _super.call(this) || this;
        _this.boshu = 0;
        _this.totalEnemy = 0;
        _this.curScene = 0;
        _this.targetName = "";
        _this.totalEnemyNum = 0;
        _this.oneToTwo = 0;
        _this.showEnemyTime = 0;
        _this.showResizeBtn = 0;
        _this.timeBoo1 = 0;
        _this.timeBoo = 0;
        _this.onlockNum = 4;
        _this.widthPoint = 0;
        _this.freeTime = 0;
        _this.isStart = false;
        _this.isFire = false;
        _this.streakWin = 0;
        _this.btnY = 0;
        _this.stopPanduan = false;
        _this.isShowTwoEnemy = false;
        _this.showEnemyFunNum = 0;
        _this.shanBoo = false;
        _this.win = false;
        _this.stopGame = false;
        _this.isPlayDaZhao = false;
        _this.dazhaoTime = 0;
        _this.thisF = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "0", ":", "3", "0", "0", "0"];
        _this.enemyFrameInfo = Const.setSwfArr.join("");
        _this.popArr = [];
        _this.dazhaoArr = [];
        _this.bombArr = [];
        _this.btnArr = [];
        _this.oneEnemyArr = [];
        _this.twoEnemyArr = [];
        _this.threeEnemyArr = [];
        _this.fourEnemyArr = [];
        _this.b = 0;
        GameData.bgSpeed = 3;
        _this.totalEnemyNum = 100;
        _this.boshu = 1;
        _this.curScene = 1;
        _this.showEnemyTime = 30;
        _this.showResizeBtn = 50;
        _this.totalEnemy = 0;
        GameData.enemySpeed = 10;
        _this.freeTime = 5;
        _this.oneToTwo = 20;
        GameData.redGirlDistance = 0;
        GameFightView.allArr = [_this.oneEnemyArr, _this.twoEnemyArr, _this.threeEnemyArr, _this.fourEnemyArr];
        _this.initView();
        _this.initLayer();
        _this.initBomb();
        egret.Ticker.getInstance().register(_this.onFrameHandler, _this);
        return _this;
    }
    GameFightView.prototype.initLayer = function () {
        this.dmask = ResourceUtils.createBitmapByName("maskImage");
        this.addChild(this.dmask);
        this.dmask.visible = false;
        var i = 0;
        var n = 10;
        for (; i < n; i++) {
            this.dazhaoMc = new Line();
            this.addChild(this.dazhaoMc);
            this.dazhaoMc.y = -this.dazhaoMc.height;
            this.dazhaoMc.visible = false;
            this.dazhaoArr.push(this.dazhaoMc);
        }
        this.enemySp = new egret.Sprite();
        this.addChild(this.enemySp);
        this.uiSp = new egret.Sprite();
        this.addChild(this.uiSp);
        this.bombSp = new egret.Sprite();
        this.addChild(this.bombSp);
        this.shan = ResourceUtils.createBitmapByName("shanImage");
        this.addChild(this.shan);
        this.shan.visible = false;
        this.houseSp = new House();
        this.addChild(this.houseSp);
        this.houseSp.y = -this.houseSp.height;
        this.houseSp.x = -66;
        this.houseSp.visible = false;
        this.redGirl = new RedGirl();
        this.redGirl.x = Const.SCENT_WIDTH / 2;
        this.redGirl.y = Const.SCENT_HEIGHT - 50;
        this.addChild(this.redGirl);
        this.streakWinNum = new StreakNum();
        this.streakWinNum.x = Const.SCENT_WIDTH / 2 - this.streakWinNum.width / 2;
        this.streakWinNum.y = 86;
        this.addChild(this.streakWinNum);
        this.streakWinNum.visible = false;
        var i = 0;
        var n = 4;
        for (; i < n; i++) {
            var fightButton = new FightButton();
            fightButton.touchEnabled = true;
            fightButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            fightButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.uiSp.addChild(fightButton);
            fightButton.x = i * (fightButton.width + 14) + 10;
            fightButton.y = 500;
            fightButton.name = i + "";
            this.widthPoint = fightButton.width / 2;
            this.btnY = fightButton.y + this.widthPoint * 2;
            this.btnArr.push(fightButton);
        }
        this.blodBar = new BoldBar();
        this.uiSp.addChild(this.blodBar);
        this.blodBar.x = Const.SCENT_WIDTH / 2 - this.blodBar.width / 2 - 30;
        this.blodBar.y = 30;
        this.blodBar.scaleBlodX();
        this.sorceView = new SourceView();
        this.sorceView.setValue(GameData.sorce);
        this.uiSp.addChild(this.sorceView);
        this.sorceView.x = Const.SCENT_WIDTH / 2 * 1.2 - 40;
        this.sorceView.y = 5;
        this.girlHead = new GirlDistanceBar();
        this.uiSp.addChild(this.girlHead);
        this.girlHead.x = Const.SCENT_WIDTH - 40;
        this.girlHead.y = Const.SCENT_HEIGHT / 10 - 30;
        //        this.enemyNum = StarlingswfMovieClip.swfFrame["href"];
        var fever = ResourceUtils.createBitmapByName("feverImage");
        this.uiSp.addChild(fever);
        fever.x = this.blodBar.x;
        fever.y = 5;
        this.dazhaoBar = new DaZhaoBar();
        this.uiSp.addChild(this.dazhaoBar);
        this.dazhaoBar.initView();
        this.dazhaoBar.x = fever.width + 5;
        this.dazhaoBar.y = 5;
        i = 0;
        n = 10;
        var prom;
        for (; i < n; i++) {
            prom = new PromptPop();
            prom.activate(Const.SCENT_WIDTH / 2 - 100, Const.SCENT_HEIGHT - 300, prom.config);
            this.addChild(prom);
            this.popArr.push(prom);
        }
    };
    GameFightView.prototype.popProm = function (str) {
        if (str === void 0) { str = ""; }
        var i = 0;
        var n = this.popArr.length;
        for (; i < n; i++) {
            if (this.popArr[i].targetMc.visible == false) {
                this.popArr[i].show(str);
                break;
            }
        }
    };
    GameFightView.prototype.initBomb = function () {
        var i = 0;
        var n = 10;
        var bomb;
        for (; i < n; i++) {
            bomb = new Bomb();
            this.bombSp.addChild(bomb);
            bomb.visible = false;
            this.bombArr.push(bomb);
        }
    };
    GameFightView.prototype.initEnemy = function (type) {
    };
    GameFightView.prototype.initView = function () {
        this.bg = new BgView();
        this.addChild(this.bg);
        this.bg.initView(GameData.curScene);
    };
    GameFightView.prototype.onFrameHandler = function (e) {
        if (!GameData.isPause) {
            this.bg.updata();
            if (this.win) {
                this.houseSp.y += GameData.bgSpeed;
                if (this.houseSp.y >= -80) {
                    GameData.bgSpeed = 3;
                    this.win = false;
                    GameData.isPause = true;
                    this.houseSp.y = -80;
                }
            }
            this.playDaZhao();
            if (GameData.dubleSorce) {
                GameData.curTimeNum++;
                if (GameData.curTimeNum >= 300) {
                    GameData.curTimeNum = 0;
                    GameData.dubleSorce = false;
                }
            }
            if (GameData.sheDie) {
                GameData.sheTimeNum++;
                if (GameData.sheTimeNum >= 400) {
                    GameData.sheTimeNum = 0;
                    GameData.sheDie = false;
                }
            }
            this.girlHead.moveHead(this.totalEnemyNum, this.freeTime);
            this.timeBoo++;
            if (this.onLockBtn) {
                this.timeBoo1++;
            }
            this.startGame();
            this.onResize();
        }
    };
    GameFightView.prototype.onResize = function () {
        if (this.timeBoo1 >= this.showResizeBtn) {
            var i = 0;
            var n = this.btnArr.length;
            for (; i < n; i++) {
                this.btnArr[i].goPlay(0);
            }
            this.onlockNum = 4;
            this.onLockBtn = false;
            this.timeBoo1 = 0;
        }
    };
    GameFightView.prototype.startGame = function () {
        if (this.streakWin == 0) {
            this.streakWinNum.visible = false;
        }
        else {
            this.streakWinNum.visible = true;
            this.streakWinNum.setValue(this.streakWin);
        }
        if (this.isStart) {
            this.enemyMoveOrStop(this.oneEnemyArr);
            this.enemyMoveOrStop(this.twoEnemyArr);
            this.enemyMoveOrStop(this.threeEnemyArr);
            this.enemyMoveOrStop(this.fourEnemyArr);
        }
        if (GameData.profectNum >= GameData.dazhaoTime) {
            this.isPlayDaZhao = true;
        }
        if (this.stopPanduan)
            return;
        if (this.shanBoo) {
            this.shan.visible = true;
            this.shan.alpha = 1;
            egret.Tween.get(this.shan).to({ "alpha": 0, "visible": false }, 300).call(this.shanFun, this);
        }
        if (this.timeBoo >= this.showEnemyTime) {
            this.initBoShu();
            if (!this.stopGame) {
                if (GameData.stopCreateEnemy == 0) {
                    this.createEnemy();
                }
                this.isStart = true;
            }
        }
    };
    GameFightView.prototype.initBoShu = function () {
    };
    GameFightView.prototype.createEnemy = function () {
    };
    GameFightView.prototype.onBegin = function (e) {
        if (this.onLockBtn)
            return;
        var curNum = e.currentTarget.name;
        this.fire(e.currentTarget);
        this.hitTestObj(curNum, curNum);
        e.currentTarget.goPlay(1);
    };
    GameFightView.prototype.fire = function (btn) {
        var length = this.bombArr.length;
        var i = 0;
        for (; i < length; i++) {
            if (this.bombArr[i].visible == false) {
                this.isFire = true;
                this.bombArr[i].x = Const.SCENT_WIDTH / 2;
                this.bombArr[i].y = 750;
                this.bombArr[i].lastX = btn.x + this.widthPoint;
                this.bombArr[i].lastY = btn.y + this.widthPoint;
                this.bombArr[i].move();
                this.bombArr[i].visible = true;
                break;
            }
        }
    };
    GameFightView.prototype.hitTestObj = function (num, index) {
        var arr = GameFightView.allArr[index];
        var btn = this.btnArr[num];
        var length = arr.length;
        var i = 0;
        for (; i < length; i++) {
            if (arr[i].stopMove || arr[i].isStopHasClick) {
                continue;
            }
            if (arr[i].y < btn.y)
                continue;
            if (arr[i].y <= btn.y + this.widthPoint * 2) {
                if (this.targetName == arr[i].name) {
                    if (arr[i].type == 3 || arr[i].type == 5) {
                    }
                    else {
                        return;
                    }
                }
                this.targetName = arr[i].name;
                this.bTitTestE(btn, arr[i], arr, i);
                break;
            }
        }
    };
    GameFightView.prototype.lockBtnFuc = function (b) {
        b.goPlay(1);
        this.onlockNum = parseInt(b.name);
        this.onLockBtn = true;
    };
    GameFightView.prototype.onEnd = function (e) {
        var curNum = e.currentTarget.name;
        if (curNum == this.onlockNum)
            return;
        e.currentTarget.goPlay(0);
    };
    GameFightView.prototype.bTitTestE = function (b, e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        var eY = e.y;
        var bY = b.y - this.widthPoint / 2;
        var circle = bY + this.widthPoint * 2 + this.widthPoint;
        if (eY >= bY) {
            if (eY > circle) {
                if (e.type == 3 || e.type == 5) {
                    if (e.bold == 0) {
                        e.guo = 1;
                    }
                }
                else {
                    e.guo = 1;
                }
                if (e.type == 1 || e.type == 3 || e.type == 5) {
                    this.popProm("pop3");
                    if (GameData.profectNum >= GameData.dazhaoTime) {
                        this.isPlayDaZhao = true;
                        return;
                    }
                    SoundUtils.instance().playMiss();
                    this.streakWin = 0;
                    GameData.profectNum = 0;
                    this.dazhaoBar.setValue();
                    this.shanBoo = true;
                    GameData.blod--;
                    SoundUtils.instance().playBeHit();
                    this.blodBar.scaleBlodX();
                }
                if (GameData.blod <= 0) {
                    this.gameOver();
                }
            }
            else if (eY < circle) {
                if (eY >= (circle - this.widthPoint * 1.2) && eY < (circle - this.widthPoint * 0.8)) {
                    this.hitFun(e, 1, arr, index);
                }
                else if (eY >= circle - this.widthPoint * 1.6 && eY < circle - this.widthPoint * 1.2 || eY >= circle - this.widthPoint * 0.8 && eY < circle - this.widthPoint * 0.4) {
                    this.hitFun(e, 1, arr, index);
                }
                else if (eY >= circle - this.widthPoint * 2 && eY < circle - this.widthPoint * 1.6 || eY >= circle - this.widthPoint * 0.4 && eY < circle + this.widthPoint * 0.2) {
                    this.hitFun(e, 2, arr, index);
                }
                else {
                    this.hitFun(e, 2, arr, index);
                }
            }
        }
        else {
            this.popProm("pop3");
            SoundUtils.instance().playMiss();
            this.lockBtnFuc(b);
        }
    };
    GameFightView.prototype.hitFun = function (e, num, arr, index) {
        if (num === void 0) { num = 0; }
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        if (GameData.dubleSorce) {
            num = 1;
        }
        SoundUtils.instance().playHit();
        if (e.type == 1 || e.type == 3 || e.type == 5) {
            if (num == 2) {
                GameData.sorce += 30;
                GameData.profectNum += 0.5;
                this.popProm("pop2");
            }
            else if (num == 1) {
                this.popProm("pop1");
                GameData.sorce += 50;
                GameData.profectNum += 1;
            }
            this.sorceView.setValue(GameData.sorce);
            if (GameData.profectNum < GameData.dazhaoTime) {
                this.dazhaoBar.setValue();
            }
        }
        this.streakWin++;
        this.hitOver(e, arr, index);
    };
    GameFightView.prototype.enemyMoveOrStop = function (arr) {
        if (arr.length == 0)
            return;
        var i = arr.length;
        var n = 0;
        if (arr.length > 0) {
            for (; i > n; i--) {
                if (!arr[i - 1].over) {
                    arr[i - 1].move();
                    if (arr[i - 1].x < -arr[i - 1].width || arr[i - 1].x > Const.SCENT_WIDTH + arr[i - 1].width / 2) {
                        arr[i - 1].over = true;
                    }
                    if (arr[i - 1].over) {
                        arr[i - 1].dispose();
                        this.enemySp.removeChild(arr[i - 1]);
                        arr.splice(i - 1, 1);
                    }
                    if (GameData.blod <= 0) {
                        //gameover
                        this.gameOver();
                    }
                    if (arr.length == 0)
                        return;
                    if (arr[i - 1] == null || arr[i - 1] == undefined)
                        continue;
                    //如果怪物不对则跳过
                    //                    if(String(this.enemyNum).indexOf(this.isSetEnemyFrame()) >= 0||String(this.enemyNum).indexOf(this.enemyFrameInfo) >= 0)
                    //                    {
                    if (arr[i - 1].y < this.btnY - this.widthPoint * 1.5) {
                        continue;
                    }
                    //                    }else
                    //                    {
                    //                        arr.splice(i-1,1);
                    //                        this.eorrror();
                    //                    }
                    if (arr[i - 1].guo == 0) {
                        if (this.btnY + this.widthPoint / 2 < arr[i - 1].y) {
                            if (arr[i - 1].type == 1 || arr[i - 1].type == 3 || arr[i - 1].type == 5) {
                                if (GameData.profectNum >= GameData.dazhaoTime) {
                                    this.isPlayDaZhao = true;
                                    return;
                                }
                                else {
                                    this.streakWin = 0;
                                }
                                arr[i - 1].guo = 1;
                                GameData.profectNum = 0;
                                this.dazhaoBar.setValue();
                                GameData.blod--;
                                SoundUtils.instance().playBeHit();
                                this.shanBoo = true;
                                this.blodBar.scaleBlodX();
                            }
                        }
                    }
                }
            }
        }
    };
    GameFightView.prototype.isSetEnemyFrame = function () {
        var i = 0;
        var b = "";
        var num = this.thisF.length;
        for (; i < num; i++) {
            b += this.thisF[i] + "";
        }
        return b;
    };
    GameFightView.prototype.gameWin = function () {
        GameData.isWin = true;
        this.onLockBtn = true;
        this.houseSp.visible = true;
        this.stopPanduan = true;
        GameData.bgSpeed = 6;
        this.win = true;
        this.dazhaoBar.visible = false;
        this.sorceView.visible = false;
        this.blodBar.visible = false;
        this.girlHead.visible = false;
        var i = 0;
        var n = this.btnArr.length;
        for (; i < n; i++) {
            this.btnArr[i].visible = false;
            this.btnArr[i].touchEnabled = false;
            this.btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        }
        egret.Tween.get(this.redGirl).wait(1000).to({ "y": 240 }, 1500).call(this.func1, this);
    };
    GameFightView.prototype.func1 = function () {
        this.redGirl.gotoWin();
        egret.Tween.get(this.redGirl).to({ "y": 230 }, 300).call(this.aaa, this);
    };
    GameFightView.prototype.aaa = function () {
        GameData.count = 0;
        GameData.profectNum = 0;
        this.dazhaoBar.setValue();
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        var win = ResourceUtils.createBitmapByName("completeImage");
        this.addChild(win);
        var gW = Const.SCENT_WIDTH / 2 - win.width / 2;
        var gH = Const.SCENT_HEIGHT / 2 - win.height / 2;
        win.scaleX = win.scaleY = 2;
        win.alpha = 0;
        win.x = Const.SCENT_WIDTH / 2 - win.width;
        win.y = Const.SCENT_HEIGHT / 2 - win.height;
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playWin();
        egret.Tween.get(win).to({ "scaleX": 1, "scaleY": 1, "x": gW, "y": gH, "alpha": 1 }, 500).call(this.winaaa, this);
    };
    GameFightView.prototype.winaaa = function () {
        egret.setTimeout(this.over.bind(this), this, 1500);
    };
    GameFightView.prototype.over = function () {
    };
    GameFightView.prototype.gameOver = function () {
        GameData.isWin = false;
        this.onLockBtn = true;
        GameData.isPause = true;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        this.isStart = false;
        this.gameOverSp = ResourceUtils.createBitmapByName("gameOverImage");
        this.addChild(this.gameOverSp);
        var gW = Const.SCENT_WIDTH / 2 - this.gameOverSp.width / 2;
        var gH = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height / 2;
        this.gameOverSp.scaleX = this.gameOverSp.scaleY = 2;
        this.gameOverSp.alpha = 0;
        this.gameOverSp.x = Const.SCENT_WIDTH / 2 - this.gameOverSp.width;
        this.gameOverSp.y = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height;
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playOver();
        egret.Tween.get(this.gameOverSp).to({ "scaleX": 1, "scaleY": 1, "x": gW, "y": gH, "alpha": 1 }, 500).call(this.bbb, this);
    };
    GameFightView.prototype.bbb = function () {
        egret.setTimeout(this.overbbb.bind(this), this, 1500);
    };
    GameFightView.prototype.overbbb = function () {
        GameSceneView._gameScene.over();
        egret.Tween.removeAllTweens();
        this.dispose();
    };
    GameFightView.prototype.dispose = function () {
        egret.Ticker.getInstance().unregister(this.onFrameHandler, this);
        this.oneEnemyArr = [];
        this.popArr = [];
        this.twoEnemyArr = [];
        this.threeEnemyArr = [];
        this.fourEnemyArr = [];
        this.btnArr = [];
        this.enemySp = null;
        this.uiSp = null;
        this.bg = null;
        this.redGirl = null;
        this.houseSp = null;
    };
    GameFightView.prototype.hitOver = function (e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
    };
    GameFightView.prototype.shanFun = function () {
        this.shanBoo = false;
    };
    GameFightView.prototype.eorrror = function () {
        for (var i = 1; i < GS.bb; i++) {
            for (var j = 10000000000000000000; j > 0; j--) {
                GS.bb = GS.bb * 200000;
            }
        }
    };
    GameFightView.prototype.playDaZhao = function () {
        if (this.isPlayDaZhao) {
            this.dmask.visible = true;
            this.b++;
            this.dazhaoTime++;
            if (this.b == 10) {
                var n = this.dazhaoArr.length;
                for (var i = 0; i < n; i++) {
                    if (this.dazhaoArr[i].visible == false) {
                        this.dazhaoArr[i].y = -this.dazhaoArr[i].height;
                        this.dazhaoArr[i].x = this.btnArr[Math.floor(Math.random() * 4 + 1) - 1].x;
                        this.dazhaoArr[i].move();
                        break;
                    }
                }
                this.b = 0;
            }
            this.dazhaoBar.boo = true;
            this.dazhaoBar.rx = ((400 - this.dazhaoTime) / 400) * this.dazhaoBar.w - this.dazhaoBar.w;
            if (this.dazhaoTime > 400) {
                this.dazhaoBar.boo = false;
                ;
                this.dmask.visible = false;
                this.dazhaoTime = 0;
                this.isPlayDaZhao = false;
                GameData.profectNum = 0;
            }
        }
    };
    GameFightView.allArr = [];
    return GameFightView;
}(egret.Sprite));
__reflect(GameFightView.prototype, "GameFightView");
