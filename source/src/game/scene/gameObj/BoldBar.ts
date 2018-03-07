/**
 * 主角血量
 * Created by Channing on 2014/10/15.
 */
class BoldBar extends egret.Sprite
{
    private r:egret.Rectangle;
    private w:number = 0;
    constructor()
    {
        super();
        this.initView();
    }

    private initView():void
    {
        var barBg:egret.Bitmap = ResourceUtils.createBitmapByName("blodBarBgImage");
        this.addChild(barBg);

        var blodBar:egret.Bitmap = ResourceUtils.createBitmapByName("blodBarImage");
        this.addChild(blodBar);

        blodBar.x = 38;
        blodBar.y = 8;
        this.w = blodBar.width;
        this.r = new egret.Rectangle();
        this.r.x = 0;
        this.r.y = 0;
        this.r.width = blodBar.width;

        console.log('blodBar.width', blodBar.width);

        this.r.height = blodBar.height;
        blodBar.mask = this.r;
    }

    public scaleBlodX():void
    {   
        this.r.x = -(this.w-this.w*(GameData.blod/5));
        console.log('this.r.x', this.r.x)
    }
}
