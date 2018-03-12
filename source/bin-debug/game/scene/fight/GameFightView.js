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
var GameFightView = (function (_super) {
    __extends(GameFightView, _super);
    function GameFightView() {
        var _this = _super.call(this) || this;
        // 波数
        _this.boshu = 0;
        _this.totalEnemy = 0;
        // 场景
        _this.curScene = 0;
        // enemy name, yao name ...
        _this.targetName = "";
        _this.totalEnemyNum = 0;
        _this.oneToTwo = 0;
        _this.showEnemyTime = 0;
        _this.showResizeBtn = 0;
        _this.timeBoo1 = 0;
        _this.timeBoo = 0;
        _this.onlockNum = 4;
        // fight btn width / 2
        _this.widthPoint = 0;
        _this.freeTime = 0;
        _this.isStart = false;
        _this.isFire = false;
        _this.streakWin = 0;
        _this.btnY = 0;
        _this.stopPanduan = false;
        _this.isShowTwoEnemy = false;
        _this.showEnemyFunNum = 0;
        // 是否显示'伤'
        _this.shanBoo = false;
        _this.win = false;
        _this.stopGame = false;
        _this.isPlayDaZhao = false;
        _this.dazhaoTime = 0;
        _this.thisF = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "0", ":", "3", "0", "0", "0"];
        // 'static.egret-labs.org'
        _this.enemyFrameInfo = Const.setSwfArr.join("");
        // pop array
        _this.popArr = [];
        _this.dazhaoArr = [];
        // 箭 array
        _this.bombArr = [];
        // fightButton array
        _this.btnArr = [];
        // 每个通道的enemy array
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
        _this.freeTime = 5; // 波数时间???
        _this.oneToTwo = 20;
        GameData.redGirlDistance = 0;
        GameFightView.allArr = [_this.oneEnemyArr, _this.twoEnemyArr, _this.threeEnemyArr, _this.fourEnemyArr];
        _this.initView(); // background
        _this.initLayer();
        _this.initBomb();
        // onUpdate
        egret.Ticker.getInstance().register(_this.onFrameHandler, _this);
        return _this;
    }
    GameFightView.prototype.initLayer = function () {
        this.dmask = ResourceUtils.createBitmapByName("maskImage");
        this.addChild(this.dmask);
        this.dmask.visible = false; // ???
        // 大招???
        // 还没有大招
        var i = 0;
        var n = 10;
        for (; i < n; i++) {
            this.dazhaoMc = new Line();
            this.addChild(this.dazhaoMc);
            this.dazhaoMc.y = -this.dazhaoMc.height;
            this.dazhaoMc.visible = false;
            this.dazhaoArr.push(this.dazhaoMc);
        }
        // enemy容器
        this.enemySp = new egret.Sprite();
        this.addChild(this.enemySp);
        // 固定的ui容器
        // 
        this.uiSp = new egret.Sprite();
        this.addChild(this.uiSp);
        // 弓箭的容器
        this.bombSp = new egret.Sprite();
        this.addChild(this.bombSp);
        /**
         * 受伤提示
         * parent: this gameFightView [son]
         */
        this.shan = ResourceUtils.createBitmapByName("shanImage");
        this.addChild(this.shan);
        this.shan.visible = false;
        /**
         * house
         * parent: this gameFightView [son]
         */
        this.houseSp = new House();
        this.addChild(this.houseSp);
        this.houseSp.y = -this.houseSp.height;
        this.houseSp.x = -66;
        this.houseSp.visible = false;
        /**
         * red girl
         * parent: this gameFightView [son]
         */
        this.redGirl = new RedGirl();
        this.redGirl.x = Const.SCENT_WIDTH / 2;
        this.redGirl.y = Const.SCENT_HEIGHT - 50;
        // this.redGirl2 = new RedGirl();
        // this.redGirl2.x = Const.SCENT_WIDTH / 2 - 50;
        // this.redGirl2.y = Const.SCENT_HEIGHT - 50;
        this.addChild(this.redGirl);
        // this.addChild(this.redGirl2);
        this.streakWinNum = new StreakNum();
        this.streakWinNum.x = Const.SCENT_WIDTH / 2 - this.streakWinNum.width / 2;
        this.streakWinNum.y = 86;
        this.addChild(this.streakWinNum);
        this.streakWinNum.visible = false;
        /**
         * 4 button and button handler
         */
        // 在哪里被addChild
        var i = 0;
        var n = 4;
        for (; i < n; i++) {
            var fightButton = new FightButton();
            fightButton.touchEnabled = true;
            // 因为是add listener, 不能主动添加参数
            fightButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            fightButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.uiSp.addChild(fightButton);
            fightButton.x = i * (fightButton.width + 14) + 10;
            fightButton.y = 500;
            fightButton.name = i + "";
            // this.widthPoint 半
            this.widthPoint = fightButton.width / 2;
            this.btnY = fightButton.y + this.widthPoint * 2;
            this.btnArr.push(fightButton);
        }
        /**
         * 血条
         * parent uiSp
         */
        this.blodBar = new BoldBar();
        this.uiSp.addChild(this.blodBar);
        this.blodBar.x = Const.SCENT_WIDTH / 2 - this.blodBar.width / 2 - 30;
        this.blodBar.y = 30;
        this.blodBar.scaleBlodX();
        /**
         * 分数
         * parent uiSp
         */
        this.sorceView = new SourceView();
        this.sorceView.setValue(GameData.sorce);
        this.uiSp.addChild(this.sorceView);
        this.sorceView.x = Const.SCENT_WIDTH / 2 * 1.2 - 40;
        this.sorceView.y = 5;
        /**
         * girl distance bar
         * parent uiSp
         */
        this.girlHead = new GirlDistanceBar();
        this.uiSp.addChild(this.girlHead);
        this.girlHead.x = Const.SCENT_WIDTH - 40;
        this.girlHead.y = Const.SCENT_HEIGHT / 10 - 30;
        /**
         * fever
         * parent uiSp
         */
        //        this.enemyNum = StarlingswfMovieClip.swfFrame["href"];
        var fever = ResourceUtils.createBitmapByName("feverImage");
        this.uiSp.addChild(fever);
        fever.x = this.blodBar.x;
        fever.y = 5;
        /**
         * dazhao
         * parent uiSp
         */
        this.dazhaoBar = new DaZhaoBar();
        this.uiSp.addChild(this.dazhaoBar);
        this.dazhaoBar.initView();
        this.dazhaoBar.x = fever.width + 5;
        this.dazhaoBar.y = 5;
        // 还没有使用到
        /**
         * promptPop
         * parent this gameFightView[son]
         */
        // 模拟对象池
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
    /**
     * 提示
     *
     * @param {string} [str=""]
     * @memberof GameFightView
     */
    GameFightView.prototype.popProm = function (str) {
        if (str === void 0) { str = ""; }
        var i = 0;
        var n = this.popArr.length; // 10
        // 
        for (; i < n; i++) {
            if (this.popArr[i].targetMc.visible == false) {
                this.popArr[i].show(str);
                break;
            }
        }
    };
    /**
     * 初始化弓箭
     * parent this.bombArr
     *
     * @memberof GameFightView
     */
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
    /**
     * initView
     * 初始化地图
     * this.bg parent this[son]
     *
     * @memberof GameFightView
     */
    GameFightView.prototype.initView = function () {
        this.bg = new BgView();
        this.addChild(this.bg);
        this.bg.initView(GameData.curScene);
    };
    // onUpdate
    GameFightView.prototype.onFrameHandler = function (e) {
        if (!GameData.isPause) {
            /**
             *  更新地图
             */
            this.bg.updata();
            /**
             * win
             * this.win判断,而不是GameData.isWin
             * 可能出于场景切换的问题来考虑
             */
            if (this.win) {
                this.houseSp.y += GameData.bgSpeed;
                if (this.houseSp.y >= -80) {
                    GameData.bgSpeed = 3;
                    this.win = false;
                    GameData.isPause = true;
                    this.houseSp.y = -80;
                }
            }
            /**
             * dazhao
             */
            this.playDaZhao();
            /**
             * 双分???
             * gameData.curTimeNum用于双分时间
             */
            if (GameData.dubleSorce) {
                GameData.curTimeNum++;
                if (GameData.curTimeNum >= 300) {
                    GameData.curTimeNum = 0;
                    GameData.dubleSorce = false;
                }
            }
            /**
             * sheDie 角色死亡?
             * 还能复活???在GameFightFiveView中使用
             * GameData.sheTimeNum用于角色死亡时间
             */
            if (GameData.sheDie) {
                GameData.sheTimeNum++;
                if (GameData.sheTimeNum >= 400) {
                    GameData.sheTimeNum = 0;
                    GameData.sheDie = false;
                }
            }
            /**
             * GirlDistanceBar的girl head
             * 更新ui上的距离视图
             */
            this.girlHead.moveHead(this.totalEnemyNum, this.freeTime);
            // timeBoo???
            this.timeBoo++;
            if (this.onLockBtn) {
                this.timeBoo1++;
            }
            this.startGame();
            this.onResize();
        }
    };
    // ???
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
        // 是否显示'伤'
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
        this.fire(e.currentTarget); // fight btn
        this.hitTestObj(curNum, curNum);
        e.currentTarget.goPlay(1);
    };
    /**
     * 开火射箭
     * 调用move()
     * @param btn
     */
    GameFightView.prototype.fire = function (btn) {
        var length = this.bombArr.length; // 10
        var i = 0;
        // 没有对象池
        // 而是固定个数10个
        // 
        for (; i < length; i++) {
            if (this.bombArr[i].visible == false) {
                this.isFire = true;
                // 每次都重新设置原点
                this.bombArr[i].x = Const.SCENT_WIDTH / 2;
                this.bombArr[i].y = 750;
                // 中心点
                this.bombArr[i].lastX = btn.x + this.widthPoint;
                this.bombArr[i].lastY = btn.y + this.widthPoint;
                this.bombArr[i].move();
                this.bombArr[i].visible = true;
                break;
            }
        }
    };
    /**
     * 是否需要进行之后的判断
     *
     * @param {number} num
     * @param {number} index
     * @returns {void}
     * @memberof GameFightView
     */
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
            // 
            if (arr[i].y <= btn.y + this.widthPoint * 2) {
                // <Enemy>arr[i]).name每一个enemy的name都是不同的
                if (this.targetName == arr[i].name) {
                    // 狐狸, 蝙蝠
                    // 需要攻击2下
                    if (arr[i].type == 3 || arr[i].type == 5) {
                    }
                    else {
                        return;
                    }
                }
                // 
                this.targetName = arr[i].name;
                // fight btn
                // 某一个通道的某一个enemy
                // 某一通道的enemy arr
                // 这个enemy的index值
                this.bTitTestE(btn, arr[i], arr, i);
                break;
            }
        }
    };
    // 锁定某一个fight btn???
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
    /**
     * 判断是否得分,游戏结束等
     *
     * @param {FightButton} b
     * @param {Enemy} e
     * @param {Array<any>} [arr=[]]
     * @param {number} [index=0]
     * @returns {void}
     * @memberof GameFightView
     */
    GameFightView.prototype.bTitTestE = function (b, e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        var eY = e.y;
        var bY = b.y - this.widthPoint / 2;
        // b.y - this.widthPoint / 2 + this.widthPoint * 2 + this.widthPoint
        var circle = bY + this.widthPoint * 2 + this.widthPoint;
        /**
         * enemy.y >= 基准判断
         */
        if (eY >= bY) {
            /**
             * 已过
             */
            if (eY > circle) {
                // 狐狸, 蝙蝠
                if (e.type == 3 || e.type == 5) {
                    if (e.bold == 0) {
                        e.guo = 1;
                    }
                }
                else {
                    e.guo = 1;
                }
                // 狼, 狐狸, 蝙蝠
                if (e.type == 1 || e.type == 3 || e.type == 5) {
                    this.popProm("pop3");
                    // 大招???
                    if (GameData.profectNum >= GameData.dazhaoTime) {
                        this.isPlayDaZhao = true;
                        return;
                    }
                    SoundUtils.instance().playMiss();
                    this.streakWin = 0;
                    GameData.profectNum = 0;
                    this.dazhaoBar.setValue();
                    // :748重复???
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
                // 不同类型的等分判断
                // http://blog.csdn.net/lidiansheng/article/details/7962770
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
    /**
     * 判断分数,更新分数UI
     *
     * @param {Enemy} e
     * @param {number} [num=0]
     * @param {Array<any>} [arr=[]]
     * @param {number} [index=0]
     * @memberof GameFightView
     */
    GameFightView.prototype.hitFun = function (e, num, arr, index) {
        if (num === void 0) { num = 0; }
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        // 双分???
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
        // 连续射死???
        this.streakWin++;
        // 子类中实现了
        this.hitOver(e, arr, index);
    };
    /**
     * 通道的enemy移动或停止
     *
     * @param {Array<Enemy>} arr
     * @returns {void}
     * @memberof GameFightView
     */
    GameFightView.prototype.enemyMoveOrStop = function (arr) {
        if (arr.length == 0)
            return;
        var i = arr.length;
        var n = 0;
        if (arr.length > 0) {
            for (; i > n; i--) {
                if (!arr[i - 1].over) {
                    arr[i - 1].move();
                    /**
                     * over
                     */
                    // ??? 为什么是x
                    // (<Enemy>arr[i - 1]).x < -(<Enemy>arr[i - 1]).width
                    // (<Enemy>arr[i - 1]).x > Const.SCENT_WIDTH + (<Enemy>arr[i - 1]).width / 2
                    if (arr[i - 1].x < -arr[i - 1].width || arr[i - 1].x > Const.SCENT_WIDTH + arr[i - 1].width / 2) {
                        arr[i - 1].over = true;
                    }
                    if (arr[i - 1].over) {
                        arr[i - 1].dispose();
                        this.enemySp.removeChild(arr[i - 1]);
                        arr.splice(i - 1, 1);
                    }
                    // 重复调用???
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
                    /**
                     * 判断enemy是否过
                     */
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
                                // 重复调用???
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
    /**
     * 没有被调用
     *
     * @returns {string}
     * @memberof GameFightView
     */
    GameFightView.prototype.isSetEnemyFrame = function () {
        var i = 0;
        var b = "";
        var num = this.thisF.length;
        for (; i < num; i++) {
            b += this.thisF[i] + "";
        }
        return b;
    };
    /**
     * 在5个子类中调用
     */
    GameFightView.prototype.gameWin = function () {
        GameData.isWin = true;
        this.onLockBtn = true;
        this.houseSp.visible = true;
        this.stopPanduan = true;
        // 修改了bgSpeed???
        GameData.bgSpeed = 6;
        this.win = true;
        this.dazhaoBar.visible = false;
        this.sorceView.visible = false;
        this.blodBar.visible = false;
        this.girlHead.visible = false;
        /**
         * 取消攻击按钮事件
         */
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
        // 修改了redGirl的swf动画效果
        this.redGirl.gotoWin();
        // 240 -> 230 + 回头 
        egret.Tween.get(this.redGirl).to({ "y": 230 }, 300).call(this.aaa, this);
    };
    GameFightView.prototype.aaa = function () {
        GameData.count = 0;
        GameData.profectNum = 0;
        this.dazhaoBar.setValue();
        // 不应该在这里设置
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        /**
         * win bitmap
         * stage clear
         */
        var win = ResourceUtils.createBitmapByName("completeImage");
        this.addChild(win);
        // 为何不直接固定中心点
        var gW = Const.SCENT_WIDTH / 2 - win.width / 2;
        var gH = Const.SCENT_HEIGHT / 2 - win.height / 2;
        win.scaleX = win.scaleY = 2;
        win.alpha = 0;
        win.x = Const.SCENT_WIDTH / 2 - win.width;
        win.y = Const.SCENT_HEIGHT / 2 - win.height;
        // TODO: 音乐有些问题
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
        /**
         * 重置
         */
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
        // removeAllTweens
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
    // 在子class中实现了
    GameFightView.prototype.hitOver = function (e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
    };
    GameFightView.prototype.shanFun = function () {
        this.shanBoo = false;
    };
    /**
     * 没有使用
     */
    GameFightView.prototype.eorrror = function () {
        for (var i = 1; i < GS.bb; i++) {
            for (var j = 10000000000000000000; j > 0; j--) {
                GS.bb = GS.bb * 200000;
            }
        }
    };
    GameFightView.prototype.playDaZhao = function () {
        // console.log('----------')
        // console.log('playDaZhao')
        // console.log('----------')
        // this.isPlayDaZhao = true
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
