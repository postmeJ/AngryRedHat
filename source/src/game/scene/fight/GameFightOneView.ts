/**
 * Created by Administrator on 2014/10/9.
 */
class GameFightOneView extends GameFightView
{
    private showXin:number = 0;
    constructor()
    {
        super();
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 40;//
        this.boshu = 1;
        this.oneToTwo = 15;//
        this.curScene = 1;
        GameData.enemySpeed = 6;
        
        this.timeBoo = 0;
        
        this.showEnemyTime = 35;

        this.showResizeBtn = 35;
        this.totalEnemy = 0;
        this.freeTime = 3;
        // [15,40]
        this.showXin = Math.floor(Math.random()*(this.totalEnemyNum-this.oneToTwo)+this.oneToTwo);
        egret.Ticker.getInstance().register(this.showEnemyFun,this);
    }
    private showEnemyFun():void
    {
        if(this.isShowTwoEnemy)
        {
            this.showEnemyFunNum++;
            if(this.showEnemyFunNum == 10)
            {
                this.showEnemyFunNum = 0;
                this.showEnemyTime = Math.floor(Math.random()*20+20);
            }
        }
    }
    public showTime():void
    {
        this.isShowTwoEnemy = true;
        GameData.enemySpeed = 7.5;
    }

    public hitOver(e:Enemy,arr:Array<any> = [],index:number = 0):void
    {
        if(e.type == 1) { // enemy die
            e.gotoDie();
            e.stopMove = true;
            GameData.langNum++;
        }else if(e.type == 6) { // 加血???
            e.alphaToZero();
            e.stopMove = true;
            GameData.blod+=3
            if(GameData.blod>5) GameData.blod = 5;
            this.blodBar.scaleBlodX();
        }
    }
    public createEnemy():void
    {
        if(this.boshu == 1)
        {
            this.initEnemy(1);
        }
        else if(this.boshu == 2)
        {
            this.initEnemy(1);
        }
    }
    public initEnemy(type:number)
    {
        var enemy1:Enemy = new Enemy(type);
        this.totalEnemy++;

        // ??? redGirlDistance为什么在这个时候更新???
        GameData.redGirlDistance++;
        this.enemySp.addChild(enemy1);
        var b:number = Math.floor(Math.random()*4+1);
        enemy1.row = b;
        enemy1.x = this.btnArr[b-1].x+this.widthPoint;
        enemy1.name="enemy1_1"+this.totalEnemy;
        this.pushEnemy(enemy1.row,enemy1);

        if(this.isShowTwoEnemy)
        {
            var enemy2:Enemy;

            if(this.totalEnemy == this.showXin)
            {
                enemy2 = new Enemy(6);
                this.enemySp.addChild(enemy2);
                enemy2.name="enemy2_d"+this.totalEnemy;
                this.isShowDaoJu(enemy2,enemy1);
                return;
            }

            var n:number = Math.floor(Math.random()*4+1);
            if(n == 1)
            {
                var enemy3 = new Enemy(1);
                this.enemySp.addChild(enemy3);
                enemy3.name="enemy2_1"+this.totalEnemy;
                this.isShowDaoJu(enemy3,enemy1);
            }
        }
    }
    public isShowDaoJu(enemy2:Enemy = null,enemy1:Enemy = null):void
    {
        var nn:number = enemy1.row;
        if(nn == 1)
        {
            var b:number =  Math.floor(Math.random()*3 + 2);
            enemy2.row = b;
            enemy2.x = this.btnArr[b-1].x+this.widthPoint;
        }else if(nn == 2)
        {
            var b:number = Math.floor(Math.random()*2+3);
            enemy2.row = b;
            enemy2.x = this.btnArr[b-1].x+this.widthPoint;
        }else if(nn ==3)
        {
            var b:number = Math.floor(Math.random()*2+1);
            enemy2.row = b;
            enemy2.x = this.btnArr[b-1].x+this.widthPoint;
        }else if(nn ==4)
        {
            var b:number = Math.floor(Math.random()*3+1);
            enemy2.row = b;
            enemy2.x = this.btnArr[b-1].x+this.widthPoint;
        }
        this.pushEnemy(enemy2.row,enemy2);
    }
    // 4个通道保存不同的怪
    // 在GameFightView中
    // GameFightView.allArr = [this.oneEnemyArr, this.twoEnemyArr, this.threeEnemyArr, this.fourEnemyArr]
    public pushEnemy(row:number = 0,enemy:Enemy = null):void
    {
        if(row == 1)
        {
            this.oneEnemyArr.push(enemy);
        }
        else if(row == 2)
        {
            this.twoEnemyArr.push(enemy);
        }
        else if(row == 3)
        {
            this.threeEnemyArr.push(enemy);
        }
        else if(row == 4)
        {
            this.fourEnemyArr.push(enemy);
        }
    }

    public over():void
    {
        egret.Ticker.getInstance().unregister(this.showEnemyFun,this);
        this.isStart = false;
        GameData.curScene = 2;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play();
    }

    public initBoShu():void
    {
        this.timeBoo = 0;
        if(this.totalEnemy >= this.totalEnemyNum)
        {
            this.stopGame = true;
            if(GameFightView.allArr[0].length == 0&&GameFightView.allArr[1].length == 0&&
                GameFightView.allArr[2].length == 0&&GameFightView.allArr[3].length == 0)
            {
                this.gameWin();
            }
            return;
        }else if(this.totalEnemy == this.oneToTwo)
        {
            GameData.stopCreateEnemy = 1;
            GameData.count++;
            GameData.redGirlDistance++;
            if(GameData.count>this.freeTime)
            {
                this.boshu = 2;
                GameData.count = 0;
                GameData.stopCreateEnemy = 0;
                this.showTime();
            }
        }
    }
}