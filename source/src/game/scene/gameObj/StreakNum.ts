/**
 * Created by Channing on 2014/10/13.
 */
class StreakNum extends egret.Sprite
{
    private showSorce:SpecialNumber;
    private conboW:number = 0;
    constructor()
    {
        super();
        this.initView();
    }

    private initView():void
    {
        var combo:egret.Bitmap = ResourceUtils.createBitmapByName("comboImage");
        this.addChild(combo);
        this.conboW = combo.width;
        this.showSorce = new SpecialNumber("number-0");
        this.showSorce.x =  this.conboW/2 - this.showSorce.width/2;
        this.showSorce.y = combo.height+5;
        this.addChild(this.showSorce);
    }

    public setValue(sorce:number = 0):void
    {
        this.showSorce.x =  this.conboW/2 - this.showSorce.width/2;
        this.showSorce.setValue(sorce+"");
    }
}