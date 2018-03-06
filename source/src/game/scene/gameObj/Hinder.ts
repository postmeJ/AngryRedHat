/**
 * Created by Administrator on 2014/10/9.
 */
class Hinder extends egret.Sprite
{
    constructor()
    {
        super();
    }
    public initView(num:number,type:number):void
    {
        var bmp:egret.Bitmap;
        switch (num)
        {
            case 1:
                if(type == 1)
                {
                    bmp = ResourceUtils.createBitmapByName("wall1_1Image");
                    this.addChild(bmp);
                }
                else
                {
                    bmp = ResourceUtils.createBitmapByName("wall1_2Image");
                    this.addChild(bmp);
                }
                break;
            case 2:
                if(type == 1)
                {
                    bmp = ResourceUtils.createBitmapByName("wall2_1Image");
                    this.addChild(bmp);
                }
                else
                {
                    bmp = ResourceUtils.createBitmapByName("wall2_2Image");
                    this.addChild(bmp);
                }
                break;
            case 3:
                if(type == 1)
                {
                    bmp = ResourceUtils.createBitmapByName("wall3_1Image");
                    this.addChild(bmp);
                }
                else
                {
                    bmp = ResourceUtils.createBitmapByName("wall3_2Image");
                    this.addChild(bmp);
                }
                break;
            case 4:
                if(type == 1)
                {
                    bmp = ResourceUtils.createBitmapByName("wall4_1Image");
                    this.addChild(bmp);
                }
                else
                {
                    bmp = ResourceUtils.createBitmapByName("wall4_2Image");
                    this.addChild(bmp);
                }
                break;
            case 5:
                if(type == 1)
                {
                    bmp = ResourceUtils.createBitmapByName("wall5_1Image");
                    this.addChild(bmp);
                }
                else
                {
                    bmp = ResourceUtils.createBitmapByName("wall5_2Image");
                    this.addChild(bmp);
                }
                break;
        }
    }
}