/**
 * Created by Channing on 2014/10/14.
 */
class House extends egret.Sprite
{
    constructor()
    {
        super();
        this.initView();
    }

    private initView():void
    {
        var house:egret.Bitmap = ResourceUtils.createBitmapByName("houseImage");
        this.addChild(house);
    }
}

