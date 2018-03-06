/**
 * Created by Administrator on 2014/10/16.
 */
class Line extends egret.Sprite
{
    private sp:egret.Bitmap;
    public boo:Boolean = false;
    constructor()
    {
        super();
        this.sp = ResourceUtils.createBitmapByName("lineImage");
        this.addChild(this.sp);
        this.sp.x = this.sp.width/2;

        egret.Ticker.getInstance().register(this.onFrame,this);
    }

    public move():void
    {
        this.visible = true;
        this.boo = true;
    }
    public onFrame(e:egret.Event):void
    {
        if(this.boo)
        {
            this.y+=GameData.enemySpeed*3;
            if(this.y>Const.SCENT_HEIGHT)
            {
                this.visible = false;
                this.boo = false;
            }
        }
    }
}