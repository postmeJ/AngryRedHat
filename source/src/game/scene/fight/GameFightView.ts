/**
 * Created by Channing on 2014/10/9.
 */
class GameFightView extends egret.Sprite {

    // 波数
    public boshu: number = 0;

    public totalEnemy: number = 0;

    // 场景
    public curScene: number = 0;

    // '总的'背景
    public bg: BgView;

    // 
    private enemyNum: any;

    // enemy name, yao name ...
    public targetName: string = "";

    public totalEnemyNum: number = 0

    public oneToTwo: number = 0

    public showEnemyTime: number = 0;
    public showResizeBtn: number = 0;
    public timeBoo1: number = 0;
    public timeBoo: number = 0;
    public onlockNum: number = 4;
    public onLockBtn: Boolean;

    // fight btn width / 2
    public widthPoint: number = 0;

    public freeTime: number = 0;

    public isStart: Boolean = false;
    
    public isFire: Boolean = false;

    public streakWin: number = 0;
    
    public btnY: number = 0;
    
    public streakWinNum: StreakNum;
    
    public stopPanduan: Boolean = false;
    
    public isShowTwoEnemy: Boolean = false;
    
    public showEnemyFunNum: number = 0;
    
    // 是否显示'伤'
    public shanBoo: Boolean = false;

    public win: Boolean = false;

    public stopGame: Boolean = false;
    public isPlayDaZhao: Boolean = false;
    public dazhaoTime: number = 0

    public redGirl: RedGirl;

    
    public enemySp: egret.Sprite;
    public bombSp: egret.Sprite;
    
    // ui总sprite
    public uiSp: egret.Sprite;
    
    public gameOverSp: egret.Bitmap;
    
    public houseSp: House;
    
    public blodBar: BoldBar;
    
    public sorceView: SourceView
    
    public girlHead: GirlDistanceBar;

    // 伤
    public shan: egret.Bitmap;

    public dazhaoBar: DaZhaoBar;
    // mask, 用于刚开始的提示
    public dmask: egret.Bitmap;

    public dazhaoMc: Line;
    public thisF: Array<any> = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "0", ":", "3", "0", "0", "0"];

    // 'static.egret-labs.org'
    public enemyFrameInfo: string = Const.setSwfArr.join("");

    // pop array
    public popArr: Array<PromptPop> = [];

    public dazhaoArr: Array<Line> = [];
   
    // 箭 array
    public bombArr: Array<Bomb> = [];
    
    // fightButton array
    public btnArr: Array<FightButton> = [];

    // 每个通道的enemy array
    public oneEnemyArr: Array<Enemy> = [];
    public twoEnemyArr: Array<Enemy> = [];
    public threeEnemyArr: Array<Enemy> = [];
    public fourEnemyArr: Array<Enemy> = [];

    public static allArr: Array<any> = [];
    
    constructor() {
        super();
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 100;
        this.boshu = 1;
        this.curScene = 1;
        this.showEnemyTime = 30;
        this.showResizeBtn = 50;
        this.totalEnemy = 0;
        GameData.enemySpeed = 10;

        this.freeTime = 5; // 波数时间???
        
        this.oneToTwo = 20;
        
        GameData.redGirlDistance = 0;
        GameFightView.allArr = [this.oneEnemyArr, this.twoEnemyArr, this.threeEnemyArr, this.fourEnemyArr];
        
        this.initView(); // background
        this.initLayer();
        this.initBomb();
        // onUpdate
        egret.Ticker.getInstance().register(this.onFrameHandler, this);
    }
    public initLayer(): void {
        this.dmask = ResourceUtils.createBitmapByName("maskImage");
        this.addChild(this.dmask);
        this.dmask.visible = false; // ???

        // 大招???
        // 还没有大招
        var i: number = 0;
        var n: number = 10;
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
        var i: number = 0;
        var n: number = 4;
        for (; i < n; i++) {
            var fightButton: FightButton = new FightButton();
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
        var fever: egret.Bitmap = ResourceUtils.createBitmapByName("feverImage");
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
        var prom: PromptPop;
        for (; i < n; i++) {
            prom = new PromptPop();
            prom.activate(Const.SCENT_WIDTH / 2 - 100, Const.SCENT_HEIGHT - 300, prom.config);
            this.addChild(prom);
            this.popArr.push(prom);
        }
    }

    /**
     * 提示
     * 
     * @param {string} [str=""] 
     * @memberof GameFightView
     */
    public popProm(str: string = ""): void {
        var i: number = 0;
        var n: number = this.popArr.length; // 10
        
        // 
        for (; i < n; i++) {
            if (this.popArr[i].targetMc.visible == false) {
                this.popArr[i].show(str);
                break;
            }
        }
    }
    /**
     * 初始化弓箭
     * parent this.bombArr
     * 
     * @memberof GameFightView
     */
    public initBomb(): void {
        var i: number = 0;
        var n: number = 10;
        var bomb: Bomb;
        for (; i < n; i++) {
            bomb = new Bomb();
            this.bombSp.addChild(bomb);
            bomb.visible = false;
            this.bombArr.push(bomb);
        }
    }
    public initEnemy(type: number) {
    }
    /**
     * initView
     * 初始化地图
     * this.bg parent this[son]
     * 
     * @memberof GameFightView
     */
    public initView(): void {
        this.bg = new BgView();
        this.addChild(this.bg);
        this.bg.initView(GameData.curScene);
    }

    // onUpdate
    public onFrameHandler(e: egret.Event): void {
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
                    this.houseSp.y = -80
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
    }
    // ???
    public onResize(): void {
        if (this.timeBoo1 >= this.showResizeBtn) {
            var i: number = 0;
            var n: number = this.btnArr.length;
            for (; i < n; i++) {
                (<FightButton>this.btnArr[i]).goPlay(0);
            }
            this.onlockNum = 4;
            this.onLockBtn = false;
            this.timeBoo1 = 0;
        }
    }
    public startGame(): void {
        if (this.streakWin == 0) {
            this.streakWinNum.visible = false;
        } else {
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
        if (this.stopPanduan) return;

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
    }
    public initBoShu(): void {
    }
    public createEnemy(): void {
    }
    public onBegin(e: egret.TouchEvent): void {
        if (this.onLockBtn) return;
        var curNum: number = <number>e.currentTarget.name;
        this.fire(e.currentTarget); // fight btn
        this.hitTestObj(curNum, curNum);
        (<FightButton>e.currentTarget).goPlay(1);
    }
    /**
     * 开火射箭
     * 调用move()
     * @param btn 
     */
    public fire(btn: FightButton): void {
        var length: number = this.bombArr.length; // 10
        var i: number = 0;

        // 没有对象池
        // 而是固定个数10个
        // 
        for (; i < length; i++) {
            if (this.bombArr[i].visible == false) {
                this.isFire = true;
                
                // 每次都重新设置原点
                (<Bomb>this.bombArr[i]).x = Const.SCENT_WIDTH / 2;
                (<Bomb>this.bombArr[i]).y = 750;

                // 中心点
                (<Bomb>this.bombArr[i]).lastX = btn.x + this.widthPoint;
                (<Bomb>this.bombArr[i]).lastY = btn.y + this.widthPoint;
                
                (<Bomb>this.bombArr[i]).move();
                (<Bomb>this.bombArr[i]).visible = true;
                break;
            }
        }
    }
    
    /**
     * 是否需要进行之后的判断
     * 
     * @param {number} num 
     * @param {number} index 
     * @returns {void} 
     * @memberof GameFightView
     */
    public hitTestObj(num: number, index: number): void {
        var arr: Array<any> = GameFightView.allArr[index];
        var btn: FightButton = <FightButton>this.btnArr[num];
        var length: number = arr.length;
        var i: number = 0;

        for (; i < length; i++) {
            if ((<Enemy>arr[i]).stopMove || (<Enemy>arr[i]).isStopHasClick) {
                continue;
            }
            if ((<Enemy>arr[i]).y < btn.y) continue;

            // 
            if ((<Enemy>arr[i]).y <= btn.y + this.widthPoint * 2) {
                // <Enemy>arr[i]).name每一个enemy的name都是不同的
                if (this.targetName == (<Enemy>arr[i]).name) {
                    // 狐狸, 蝙蝠
                    // 需要攻击2下
                    if ((<Enemy>arr[i]).type == 3 || (<Enemy>arr[i]).type == 5) {

                    } 
                    // 狼, 猎人, 鸟, 
                    // 药, 电, 靶, 箭
                    // 一次就可以了
                    else {
                        return;
                    }
                }

                // 
                this.targetName = (<Enemy>arr[i]).name;

                // fight btn
                // 某一个通道的某一个enemy
                // 某一通道的enemy arr
                // 这个enemy的index值
                this.bTitTestE(btn, <Enemy>arr[i], arr, i);
                break;
            }
        }
    }

    // 锁定某一个fight btn???
    public lockBtnFuc(b: FightButton): void {
        b.goPlay(1);
        this.onlockNum = parseInt(b.name);
        this.onLockBtn = true;
    }

    public onEnd(e: egret.TouchEvent): void {
        var curNum: number = <number>e.currentTarget.name;
        if (curNum == this.onlockNum) return;
        (<FightButton>e.currentTarget).goPlay(0);
    }

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
    public bTitTestE(b: FightButton, e: Enemy, arr: Array<any> = [], index: number = 0): void {
        var eY: number = e.y;
        var bY: number = b.y - this.widthPoint / 2;
        // b.y - this.widthPoint / 2 + this.widthPoint * 2 + this.widthPoint
        var circle: number = bY + this.widthPoint * 2 + this.widthPoint;

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
                // 其他
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

            /**
             * 等分
             */
            else if (eY < circle) {
                // 不同类型的等分判断
                // http://blog.csdn.net/lidiansheng/article/details/7962770
                if (eY >= (circle - this.widthPoint * 1.2) && eY < (circle - this.widthPoint * 0.8)) {
                    this.hitFun(e, 1, arr, index);
                }
                // eY >= circle - this.widthPoint * 1.6 && eY < circle - this.widthPoint * 1.2
                // eY >= circle - this.widthPoint * 0.8 && eY < circle - this.widthPoint * 0.4
                else if (eY >= circle - this.widthPoint * 1.6 && eY < circle - this.widthPoint * 1.2 || eY >= circle - this.widthPoint * 0.8 && eY < circle - this.widthPoint * 0.4) {
                    this.hitFun(e, 1, arr, index);
                }
                // eY >= circle - this.widthPoint * 2 && eY < circle - this.widthPoint * 1.6
                // eY >= circle - this.widthPoint * 0.4 && eY < circle + this.widthPoint * 0.2
                else if (eY >= circle - this.widthPoint * 2 && eY < circle - this.widthPoint * 1.6 || eY >= circle - this.widthPoint * 0.4 && eY < circle + this.widthPoint * 0.2) {
                    this.hitFun(e, 2, arr, index);
                }
                else {
                    this.hitFun(e, 2, arr, index);
                }
            }
        }
        // ???
        else {
            this.popProm("pop3");
            SoundUtils.instance().playMiss()
            this.lockBtnFuc(b);
        }
    }

    /**
     * 判断分数,更新分数UI
     * 
     * @param {Enemy} e 
     * @param {number} [num=0] 
     * @param {Array<any>} [arr=[]] 
     * @param {number} [index=0] 
     * @memberof GameFightView
     */
    public hitFun(e: Enemy, num: number = 0, arr: Array<any> = [], index: number = 0): void {
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
            } else if (num == 1) {
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
    }

    /**
     * 通道的enemy移动或停止
     * 
     * @param {Array<Enemy>} arr 
     * @returns {void} 
     * @memberof GameFightView
     */
    public enemyMoveOrStop(arr: Array<Enemy>): void {
        if (arr.length == 0) return;
        
        var i: number = arr.length;
        var n: number = 0;

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
                    if ((<Enemy>arr[i - 1]).x < -(<Enemy>arr[i - 1]).width || (<Enemy>arr[i - 1]).x > Const.SCENT_WIDTH + (<Enemy>arr[i - 1]).width / 2) {
                        (<Enemy>arr[i - 1]).over = true;
                    }

                    if ((<Enemy>arr[i - 1]).over) {
                        (<Enemy>arr[i - 1]).dispose();
                        this.enemySp.removeChild((<Enemy>arr[i - 1]));
                        arr.splice(i - 1, 1);
                    }
                    // 重复调用???
                    if (GameData.blod <= 0) {
                        //gameover
                        this.gameOver();
                    }
                    if (arr.length == 0) return;
                    if (arr[i - 1] == null || arr[i - 1] == undefined) continue;

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
                    if ((<Enemy>arr[i - 1]).guo == 0) {
                        if (this.btnY + this.widthPoint / 2 < (<Enemy>arr[i - 1]).y) {
                            if ((<Enemy>arr[i - 1]).type == 1 || (<Enemy>arr[i - 1]).type == 3 || (<Enemy>arr[i - 1]).type == 5) {
                                
                                if (GameData.profectNum >= GameData.dazhaoTime) {
                                    this.isPlayDaZhao = true;
                                    return;
                                } 
                                
                                else {
                                    this.streakWin = 0;
                                }

                                (<Enemy>arr[i - 1]).guo = 1;
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
    }
    /**
     * 没有被调用
     * 
     * @returns {string} 
     * @memberof GameFightView
     */
    public isSetEnemyFrame(): string {
        var i: number = 0;
        var b: string = "";
        var num: number = this.thisF.length;
        for (; i < num; i++) {
            b += this.thisF[i] + "";
        }
        return b;
    }
    /**
     * 在5个子类中调用
     */
    public gameWin(): void {
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
        var i: number = 0;
        var n: number = this.btnArr.length;
        for (; i < n; i++) {
            this.btnArr[i].visible = false;
            this.btnArr[i].touchEnabled = false;
            this.btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        }
        egret.Tween.get(this.redGirl).wait(1000).to({ "y": 240 }, 1500).call(this.func1, this);
    }
    private func1(): void {
        // 修改了redGirl的swf动画效果
        this.redGirl.gotoWin();
        // 240 -> 230 + 回头 
        egret.Tween.get(this.redGirl).to({ "y": 230 }, 300).call(this.aaa, this);
    }

    private aaa(): void {
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
        var win: egret.Bitmap = ResourceUtils.createBitmapByName("completeImage");
        this.addChild(win);
        // 为何不直接固定中心点
        var gW: number = Const.SCENT_WIDTH / 2 - win.width / 2;
        var gH: number = Const.SCENT_HEIGHT / 2 - win.height / 2;
        win.scaleX = win.scaleY = 2;
        win.alpha = 0;

        win.x = Const.SCENT_WIDTH / 2 - win.width;
        win.y = Const.SCENT_HEIGHT / 2 - win.height;

        // TODO: 音乐有些问题
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playWin();
        egret.Tween.get(win).to({ "scaleX": 1, "scaleY": 1, "x": gW, "y": gH, "alpha": 1 }, 500).call(this.winaaa, this);
    }
    private winaaa(): void {
        egret.setTimeout(this.over.bind(this), this, 1500);
    }
    public over(): void {
    }
    public gameOver(): void {
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
        var gW: number = Const.SCENT_WIDTH / 2 - this.gameOverSp.width / 2;
        var gH: number = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height / 2;
        this.gameOverSp.scaleX = this.gameOverSp.scaleY = 2;
        this.gameOverSp.alpha = 0;

        this.gameOverSp.x = Const.SCENT_WIDTH / 2 - this.gameOverSp.width;
        this.gameOverSp.y = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height;
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playOver();
        egret.Tween.get(this.gameOverSp).to({ "scaleX": 1, "scaleY": 1, "x": gW, "y": gH, "alpha": 1 }, 500).call(this.bbb, this);
    }
    private bbb(): void {
        egret.setTimeout(this.overbbb.bind(this), this, 1500);
    }
    private overbbb(): void {
        GameSceneView._gameScene.over();
        // removeAllTweens
        egret.Tween.removeAllTweens();
        this.dispose();
    }
    public dispose(): void {
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
    }
    // 在子class中实现了
    public hitOver(e: Enemy, arr: Array<any> = [], index: number = 0): void {
    }
    private shanFun(): void {
        this.shanBoo = false;
    }
    /**
     * 没有使用
     */
    private eorrror(): void {
        for (var i: number = 1; i < GS.bb; i++) {
            for (var j: number = 10000000000000000000; j > 0; j--) {
                GS.bb = GS.bb * 200000;
            }
        }
    }
    public b: number = 0;
    private playDaZhao(): void {
        // console.log('----------')
        // console.log('playDaZhao')
        // console.log('----------')
        // this.isPlayDaZhao = true

        if (this.isPlayDaZhao) {
            this.dmask.visible = true;
            this.b++;
            this.dazhaoTime++;
            if (this.b == 10) {
                var n: number = this.dazhaoArr.length;
                for (var i: number = 0; i < n; i++) {
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
                this.dazhaoBar.boo = false;;
                this.dmask.visible = false;
                this.dazhaoTime = 0;
                this.isPlayDaZhao = false;
                GameData.profectNum = 0;
            }
        }
    }
}