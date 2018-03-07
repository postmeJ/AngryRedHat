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
 * Created by Channing on 2014/10/13.
 */
var GameFightFourView = (function (_super) {
    __extends(GameFightFourView, _super);
    function GameFightFourView() {
        var _this = _super.call(this) || this;
        _this.showXin = 0;
        _this.showXin1 = 74;
        _this.shandian = 0;
        _this.shandian1 = 20;
        _this.dunpai = 0;
        GameData.bgSpeed = 3;
        _this.totalEnemyNum = 120;
        _this.boshu = 1;
        _this.oneToTwo = 5;
        _this.curScene = 4;
        GameData.enemySpeed = 8;
        _this.timeBoo = 0;
        _this.showEnemyTime = 60;
        _this.showResizeBtn = 20;
        _this.totalEnemy = 0;
        _this.freeTime = 2;
        _this.showXin = Math.floor(Math.random() * (_this.totalEnemyNum - _this.oneToTwo) + _this.oneToTwo);
        _this.shandian = Math.floor(Math.random() * (_this.totalEnemyNum - _this.oneToTwo) + _this.oneToTwo);
        _this.dunpai = Math.floor(Math.random() * (_this.totalEnemyNum - _this.oneToTwo) + _this.oneToTwo);
        if (_this.showXin == _this.shandian) {
            _this.shandian = 45;
        }
        egret.Ticker.getInstance().register(_this.showEnemyFun, _this);
        return _this;
    }
    GameFightFourView.prototype.showEnemyFun = function () {
        if (this.isShowTwoEnemy) {
            this.showEnemyFunNum++;
            if (this.showEnemyFunNum == 10) {
                this.showEnemyFunNum = 0;
                this.showEnemyTime = Math.floor(Math.random() * 15 + 25);
            }
        }
    };
    GameFightFourView.prototype.showTime = function () {
        this.isShowTwoEnemy = true;
        GameData.enemySpeed = 8.5;
    };
    GameFightFourView.prototype.hitOver = function (e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        if (e.type == 1) {
            e.gotoDie();
            e.stopMove = true;
            GameData.langNum++;
        }
        else if (e.type == 2) {
            e.gotoDie();
            e.stopMove = true;
            this.shanBoo = true;
            GameData.blod--;
            this.blodBar.scaleBlodX();
        }
        else if (e.type == 3) {
            if (e.bold == 0) {
                e.gotoDie();
                e.stopMove = true;
                GameData.huliNum++;
            }
            else {
                e.onjump = true;
            }
            e.bold = 0;
        }
        else if (e.type == 4) {
            e.gotoDie();
            e.stopMove = true;
            this.shanBoo = true;
            GameData.blod--;
            this.blodBar.scaleBlodX();
        }
        else if (e.type == 6) {
            e.alphaToZero();
            e.stopMove = true;
            GameData.blod += 3;
            if (GameData.blod > 5)
                GameData.blod = 5;
            this.blodBar.scaleBlodX();
        }
        else if (e.type == 7) {
            e.alphaToZero();
            GameData.profectNum += 10;
            e.stopMove = true;
        }
        else if (e.type == 8) {
            e.alphaToZero();
            e.stopMove = true;
            GameData.dubleSorce = true;
        }
    };
    //创建怪
    GameFightFourView.prototype.createEnemy = function () {
        if (this.boshu == 1) {
            this.initEnemy(3);
        }
        else if (this.boshu == 2) {
            this.initEnemy(2);
        }
    };
    GameFightFourView.prototype.initEnemy = function (type) {
        if (type == 3) {
            this.typeOne(type);
        }
        else if (type == 2) {
            this.typeTwo(type);
        }
    };
    GameFightFourView.prototype.isShowDaoJu = function (enemy2, enemy1) {
        if (enemy2 === void 0) { enemy2 = null; }
        if (enemy1 === void 0) { enemy1 = null; }
        var nn = enemy1.row;
        var b = 0;
        if (nn == 1) {
            b = Math.floor(Math.random() * 3 + 2);
            enemy2.row = b;
            enemy2.x = this.btnArr[enemy2.row - 1].x + this.widthPoint;
        }
        else if (nn == 2) {
            b = Math.floor(Math.random() * 2 + 3);
            enemy2.row = b;
            enemy2.x = this.btnArr[enemy2.row - 1].x + this.widthPoint;
        }
        else if (nn == 3) {
            b = Math.floor(Math.random() * 2 + 1);
            enemy2.row = b;
            enemy2.x = this.btnArr[enemy2.row - 1].x + this.widthPoint;
        }
        else if (nn == 4) {
            b = Math.floor(Math.random() * 3 + 1);
            enemy2.row = b;
            enemy2.x = this.btnArr[enemy2.row - 1].x + this.widthPoint;
        }
        this.pushEnemy(enemy2.row, enemy2);
    };
    GameFightFourView.prototype.pushEnemy = function (row, enemy) {
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
    GameFightFourView.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = false;
        GameData.curScene = 5;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play();
    };
    GameFightFourView.prototype.initBoShu = function () {
        this.timeBoo = 0;
        if (this.totalEnemy >= this.totalEnemyNum) {
            this.stopGame = true;
            if (GameFightView.allArr[0].length == 0 && GameFightView.allArr[1].length == 0 &&
                GameFightView.allArr[2].length == 0 && GameFightView.allArr[3].length == 0) {
                //游戏结束
                this.gameWin();
            }
            return;
        }
        else if (this.totalEnemy == this.oneToTwo) {
            //第一波和第二波间隔
            GameData.stopCreateEnemy = 1;
            GameData.count++;
            GameData.redGirlDistance++;
            if (GameData.count > this.freeTime) {
                this.boshu = 2;
                GameData.count = 0;
                GameData.stopCreateEnemy = 0;
                this.showTime();
            }
        }
    };
    GameFightFourView.prototype.typeOne = function (type) {
        if (type === void 0) { type = 0; }
        var aa = Math.floor(Math.random() * 2 + 3);
        var enemy1 = new Enemy(aa);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(enemy1);
        var b = Math.floor(Math.random() * 4 + 1);
        enemy1.row = b;
        enemy1.x = this.btnArr[enemy1.row - 1].x + this.widthPoint;
        enemy1.name = "enemy1" + this.totalEnemy;
        this.pushEnemy(enemy1.row, enemy1);
    };
    GameFightFourView.prototype.typeTwo = function (type) {
        if (type === void 0) { type = 0; }
        var n = Math.floor(Math.random() * 7 + 1);
        if (n == 1) {
            var enemy1 = new Enemy(2);
        }
        else if (n == 2) {
            var enemy1 = new Enemy(4);
        }
        else {
            var enemy1 = new Enemy(1);
        }
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(enemy1);
        var b = Math.floor(Math.random() * 4 + 1);
        enemy1.row = b;
        enemy1.x = this.btnArr[enemy1.row - 1].x + this.widthPoint;
        enemy1.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(enemy1.row, enemy1);
        if (this.isShowTwoEnemy) {
            var enemy2;
            if (this.totalEnemy == this.showXin || this.totalEnemy == this.showXin1) {
                enemy2 = new Enemy(6);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_d0" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            else if (this.totalEnemy == this.shandian || this.totalEnemy == this.shandian1) {
                enemy2 = new Enemy(7);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_d1" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            else if (this.totalEnemy == this.dunpai) {
                enemy2 = new Enemy(8);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_d2" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            var n = Math.floor(Math.random() * 5 + 1);
            if (n == 1) {
                var aa = Math.floor(Math.random() * 4 + 1);
                var enemy2 = new Enemy(aa);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_1" + aa + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
            else if (n == 2) {
                var enemy2 = new Enemy(1);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_2" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
        }
    };
    return GameFightFourView;
}(GameFightView));
__reflect(GameFightFourView.prototype, "GameFightFourView");
