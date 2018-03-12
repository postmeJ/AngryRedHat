var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Channing on 2014/9/17.
 */
var GameData = (function () {
    function GameData() {
    }
    GameData.closeMusic = false;
    GameData.closeBgMusic = false;
    GameData.isClickBtn = false;
    GameData.isStart = false;
    GameData.num = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "0", ":", "3", "0", "0", "0"];
    GameData.curScene = 1;
    GameData.isPause = true;
    GameData.redGirlDistance = 0;
    GameData.sorce = 0;
    GameData.blod = 5;
    // public static blod:number = 9999;
    GameData.enemySpeed = 0;
    GameData.stopCreateEnemy = 0;
    GameData.stopEnemyBoo = false;
    GameData.count = 0;
    GameData.bgSpeed = 0;
    GameData.profectNum = 0;
    /**
     * 杀的怪数量
     */
    GameData.langNum = 0;
    GameData.huliNum = 0;
    GameData.bianfuNum = 0;
    GameData.dazhaoTime = 50;
    GameData.isWin = false;
    GameData.isStartClickOption = false;
    GameData.dubleSorce = false;
    GameData.curTimeNum = 0;
    GameData.sheDie = false;
    GameData.sheTimeNum = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
