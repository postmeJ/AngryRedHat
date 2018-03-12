/**
 * Created by Administrator on 2014/10/9.
 */
class Enemy extends egret.Sprite {
    public row: number = 0;    //当前所在行
    public name: string = "";
    public over: Boolean = false;
    public stopMove: Boolean = false; //停止移动
    //是否可以被点击
    public isStopHasClick: Boolean = false
    private sp: StarlingSwfMovieClip;
    public bold: number = 0;
    public guo: number = 0;  //是否过关

    //当前怪物类型
    public type: number = 0;

    public onjump: Boolean = false;//是否可以跳跃

    // num type number
    constructor(num: number) {
        super();
        this.initView(num);
    }
    private initView(num: number): void {
        this.type = num;
        switch (num) {
            // 狼
            case 1:
                this.sp = StarlingSwfFactory.getInstance().makeMc("lang");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            
            // 猎人
            case 2:
                this.sp = StarlingSwfFactory.getInstance().makeMc("lieren");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            
            // 狐狸
            case 3:
                this.sp = StarlingSwfFactory.getInstance().makeMc("huli");
                this.sp.goToPlay("run");
                this.bold = 2;
                break;
            
            // 鸟
            case 4:
                this.sp = StarlingSwfFactory.getInstance().makeMc("niao");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            
            // 蝙蝠
            case 5:
                this.sp = StarlingSwfFactory.getInstance().makeMc("bianfu");
                this.sp.goToPlay("run");
                this.bold = 3;
                break;
            
            // 道具 药
            case 6:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("1"); // 药
                this.bold = 1;
                break;
            
            // 道具 电
            case 7:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("2"); // 电
                this.bold = 1;
                break;
            
            // 道具 靶
            case 8:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("3");; // 靶
                this.bold = 1;
                break;
            
            // 道具 箭
            case 9:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("4"); // 箭
                this.bold = 1;
                break;
        }
        this.addChild(this.sp);
    }
    public alphaToZero(): void {
        this.visible = false;
    }
    //鸟和狐狸
    public goToJjump(): void {
        this.sp.goToPlay("jump");
    }
    public goToStop(): void {
        this.sp.gotoAndStop(0);
    }
    public gotoDie(): void {
        this.sp.goToPlay("die");
    }
    public move(): void {
        if (this.stopMove) {
            this.goOut();
        }
        // console.log('----------')
        // console.log('this.name', this.name)
        // console.log('this.y', this.y)
        // console.log('----------')
        
        if (this.y < 820) {
            if (this.onjump) {
                this.y -= GameData.enemySpeed * 3;
                this.goToJjump();
                this.isStopHasClick = true;
                if (this.y <= 160) {
                    this.sp.goToPlay("run");
                    this.onjump = false;
                    this.isStopHasClick = false;
                    if (this.type == 4 || this.type == 5) {
                        var bb: number = Math.floor(Math.random() * 4 + 1);
                        if (bb != 1) return;
                        if (this.x == 10) {
                            this.x = 129;
                        } else if (this.x == 129) {
                            this.x = 248;
                        } else if (this.x == 248) {
                            this.x = 129;
                        } else if (this.x == 367) {
                            this.x = 248;
                        }
                    }
                }
                return;
            }
            if (!this.stopMove) {
                this.y += GameData.enemySpeed;
            }
        }
        else {
            this.y = 820;
            this.over = true;
        }
    }
    /**
     * 抛飞效果
     */
    private goOut(): void {
        if (this.row == 1) {
            this.x -= 15;
            this.y -= 15;
        }
        else if (this.row == 2) {
            this.x -= 15;
            this.y -= 20;
        }
        else if (this.row == 3) {
            this.x += 15;
            this.y -= 20;
        }
        else if (this.row == 4) {
            this.x += 15;
            this.y -= 15;
        }
    }
    public stopMoveEnemy(): void {
        this.stopMove = true;
    }
    public dispose(): void {
        this.removeChildren();
    }
}