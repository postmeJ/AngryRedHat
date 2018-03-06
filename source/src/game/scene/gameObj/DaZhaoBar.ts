/**
 * Created by Channing on 2014/10/16.
 */
class DaZhaoBar extends egret.Sprite
{
    private r:egret.Rectangle;
    public w:number = 0;
    //固定遮罩的最小X
    private b:number = 0;
    public rx:number = 1;
    public boo:Boolean = false;
    constructor()
    {
        super();
    }
    public initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("dazhaoBarBg");
        this.addChild(bg);
        var bar:egret.Bitmap = ResourceUtils.createBitmapByName("dazhaoImage");
        this.addChild(bar);
        bg.x = -2;
        bg.y = 2;
        bar.y = bg.y+2;

        this.w = bar.width;
        this.r = new egret.Rectangle();
        this.b =bar.x-bar.width
        this.r.x = this.b;
        this.r.y = 0;
        this.r.width = bar.width;
        this.r.height = bar.height;
        bar.mask = this.r;
        egret.Ticker.getInstance().register(this.onFrameHandler,this);
    }
    private onFrameHandler():void
    {
        if(!this.boo) return;
        this.r.x=this.rx;
    }
    public setValue():void
    {
        if(this.boo) return;
        if(GameData.profectNum>GameData.dazhaoTime)
        {
            GameData.profectNum = GameData.dazhaoTime;
        }
        this.r.x = -(this.w-this.w*(GameData.profectNum/GameData.dazhaoTime));
    }
}
