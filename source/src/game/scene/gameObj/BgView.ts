/**
 * Created by Administrator on 2014/10/9.
 */
class BgView extends egret.Sprite {
    constructor() {
        super();
    }
    private bg1: BackGroundView;
    private bg2: BackGroundView;
    private bg1Height: number = 0;
    private bg2Height: number = 0;
    public initView(num: number): void {
        // 两张图拼接
        this.bg2 = new BackGroundView(num);
        this.addChild(this.bg2);

        this.bg1 = new BackGroundView(num);
        this.addChild(this.bg1);

        this.bg1Height = this.bg1.height;
        this.bg1.y = -this.bg1Height + Const.SCENT_HEIGHT;

        this.bg2Height = this.bg2.height;
        this.bg2.y = this.bg1.y - this.bg2Height;
    }

    public updata(): void {

        // 需要想想
        if (this.bg1.y >= Const.SCENT_HEIGHT) {
            this.bg1.y = this.bg2.y - this.bg1Height;
        }
        if (this.bg2.y >= Const.SCENT_HEIGHT) {
            this.bg2.y = this.bg1.y - this.bg2Height;
        }

        this.bg1.y += GameData.bgSpeed;
        this.bg2.y += GameData.bgSpeed;
    }

    public dispose(): void {
        this.removeChildren();
        this.bg1 = null;
        this.bg2 = null;
    }
}