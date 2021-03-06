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
var GameFightOneView = (function (_super) {
    __extends(GameFightOneView, _super);
    function GameFightOneView() {
        var _this = _super.call(this) || this;
        _this.showXin = 0;
        GameData.bgSpeed = 3;
        GameData.enemySpeed = 6;
        _this.totalEnemyNum = 40; //
        _this.boshu = 1; // 波数
        _this.oneToTwo = 15;
        _this.curScene = 1;
        _this.timeBoo = 0;
        _this.showEnemyTime = 35; // 35个'帧时'
        _this.showResizeBtn = 35;
        _this.totalEnemy = 0; // 目前有多少的怪数量
        _this.freeTime = 3;
        // [15,40]
        _this.showXin = Math.floor(Math.random() * (_this.totalEnemyNum - _this.oneToTwo) + _this.oneToTwo);
        egret.Ticker.getInstance().register(_this.showEnemyFun, _this);
        return _this;
    }
    /**
     * 没有实际使用
     */
    GameFightOneView.prototype.showEnemyFun = function () {
        if (this.isShowTwoEnemy) {
            this.showEnemyFunNum++;
            if (this.showEnemyFunNum == 10) {
                this.showEnemyFunNum = 0;
                this.showEnemyTime = Math.floor(Math.random() * 20 + 20);
            }
        }
    };
    /**
     * 修改
     */
    GameFightOneView.prototype.showTime = function () {
        this.isShowTwoEnemy = true;
        GameData.enemySpeed = 7.5;
    };
    GameFightOneView.prototype.hitOver = function (e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        if (e.type == 1) {
            e.gotoDie();
            e.stopMove = true;
            GameData.langNum++;
        }
        else if (e.type == 6) {
            e.alphaToZero();
            e.stopMove = true;
            GameData.blod += 3;
            if (GameData.blod > 5)
                GameData.blod = 5;
            // if(GameData.blod>5) GameData.blod = 9999;
            this.blodBar.scaleBlodX();
        }
    };
    GameFightOneView.prototype.createEnemy = function () {
        if (this.boshu == 1) {
            this.initEnemy(1);
        }
        else if (this.boshu == 2) {
            this.initEnemy(1);
        }
    };
    GameFightOneView.prototype.initEnemy = function (type) {
        var enemy1 = new Enemy(type);
        this.totalEnemy++;
        // ??? redGirlDistance为什么在这个时候更新???
        GameData.redGirlDistance++;
        this.enemySp.addChild(enemy1);
        var b = Math.floor(Math.random() * 4 + 1);
        enemy1.row = b;
        enemy1.x = this.btnArr[b - 1].x + this.widthPoint;
        enemy1.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(enemy1.row, enemy1);
        // ??? y值在哪里
        if (this.isShowTwoEnemy) {
            var enemy2;
            if (this.totalEnemy == this.showXin) {
                enemy2 = new Enemy(6); // 药
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_d" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            var n = Math.floor(Math.random() * 4 + 1);
            if (n == 1) {
                var enemy3 = new Enemy(1); // 狼
                this.enemySp.addChild(enemy3);
                enemy3.name = "enemy2_1" + this.totalEnemy;
                this.isShowDaoJu(enemy3, enemy1);
            }
        }
    };
    GameFightOneView.prototype.isShowDaoJu = function (enemy2, enemy1) {
        if (enemy2 === void 0) { enemy2 = null; }
        if (enemy1 === void 0) { enemy1 = null; }
        var nn = enemy1.row;
        if (nn == 1) {
            var b = Math.floor(Math.random() * 3 + 2); // [2, 4] => [1,3]
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 2) {
            var b = Math.floor(Math.random() * 2 + 3); // [3, 4] => [2, 3]
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 3) {
            var b = Math.floor(Math.random() * 2 + 1); // [1, 2] => [0, 1]
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 4) {
            var b = Math.floor(Math.random() * 3 + 1); // [1, 3] => [0, 2]
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        this.pushEnemy(enemy2.row, enemy2);
    };
    // 4个通道保存不同的怪
    // 在GameFightView中
    // GameFightView.allArr = [this.oneEnemyArr, this.twoEnemyArr, this.threeEnemyArr, this.fourEnemyArr]
    GameFightOneView.prototype.pushEnemy = function (row, enemy) {
        if (row === void 0) { row = 0; }
        if (enemy === void 0) { enemy = null; }
        if (row == 1) {
            this.oneEnemyArr.push(enemy);
        }
        else if (row == 2) {
            this.twoEnemyArr.push(enemy);
        }
        else if (row == 3) {
            this.threeEnemyArr.push(enemy);
        }
        else if (row == 4) {
            this.fourEnemyArr.push(enemy);
        }
    };
    GameFightOneView.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = false;
        GameData.curScene = 2;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play();
    };
    GameFightOneView.prototype.initBoShu = function () {
        this.timeBoo = 0;
        if (this.totalEnemy >= this.totalEnemyNum) {
            this.stopGame = true;
            if (GameFightView.allArr[0].length == 0 && GameFightView.allArr[1].length == 0 &&
                GameFightView.allArr[2].length == 0 && GameFightView.allArr[3].length == 0) {
                this.gameWin();
            }
            return;
        }
        else if (this.totalEnemy == this.oneToTwo) {
            GameData.stopCreateEnemy = 1;
            // 一个计数器
            // 用于波数修改判断
            GameData.count++;
            GameData.redGirlDistance++;
            /**
             * 修改波数
             */
            // freeTime用于波数修改的间隔时间
            if (GameData.count > this.freeTime) {
                this.boshu = 2;
                GameData.count = 0;
                GameData.stopCreateEnemy = 0;
                this.showTime();
            }
        }
    };
    return GameFightOneView;
}(GameFightView));
__reflect(GameFightOneView.prototype, "GameFightOneView");
