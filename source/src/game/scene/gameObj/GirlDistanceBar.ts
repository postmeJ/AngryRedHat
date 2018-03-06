/**
 * Created by Channing on 2014/10/15.
 */
class GirlDistanceBar extends egret.Sprite
{
    private head:egret.Bitmap;
    private _heightBar:number = 0;
    constructor()
    {
        super();

        this.initView();
    }
    private initView():void
    {
        var bar:egret.Bitmap = ResourceUtils.createBitmapByName("distanceBarImage");
        this.addChild(bar);
        this.head = ResourceUtils.createBitmapByName("redGirlHeadImage");
        this.addChild(this.head);
        bar.x = this.head.width/2;
        this._heightBar = bar.height;
        this.head.y = this._heightBar;
    }

    /**
     *
     * @param totalNum      怪物出怪次数（2个同事出现算一次）
     * @param freeTime      间隔的时间
     */
    public moveHead(totalNum:number = 0,freeTime:number = 0):void
    {
        this.head.y = this._heightBar-this._heightBar*(GameData.redGirlDistance/(totalNum+freeTime));
    }
}
