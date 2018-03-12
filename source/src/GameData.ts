/**
 * Created by Channing on 2014/9/17.
 */
class GameData{

    public static closeMusic:Boolean = false;
    public static closeBgMusic:Boolean = false;

    public static isClickBtn:Boolean = false;
    public static isStart:Boolean = false;
    public static num:Array<any> = ["1","0",".","0",".","4",".","1","8","0",":","3","0","0","0"];
    public static curScene:number = 1;
    public static isPause:Boolean = true;
    public static redGirlDistance:number = 0;
    public static sorce:number =0;
    public static blod:number = 5;
    // public static blod:number = 9999;
    public static enemySpeed:number = 0;
    public static stopCreateEnemy:number = 0;
    public static stopEnemyBoo:Boolean = false;
    public static count:number = 0;
    public static bgSpeed:number = 0;
    public static profectNum:number = 0;

    /**
     * 杀的怪数量
     */
    public static langNum:number = 0
    public static huliNum:number = 0
    public static bianfuNum:number = 0

    public static dazhaoTime:number = 50;
    public static isWin:Boolean = false;

    public static isStartClickOption:Boolean = false;
    
    public static dubleSorce:Boolean = false;
    public static curTimeNum:number = 0;
    public static sheDie:Boolean = false;
    public static sheTimeNum:number = 0;

    // GameData.curScene = 1;
    // GameData.sorce = 0;
    // GameData.langNum = 0;
    // GameData.huliNum = 0;
    // GameData.bianfuNum = 0;
    // GameData.isPause = true;
    // GameData.count = 0;
    // GameData.profectNum = 0;
    // GameData.stopCreateEnemy = 0;
    // GameData.redGirlDistance = 0;
    // GameData.blod = 5;
}