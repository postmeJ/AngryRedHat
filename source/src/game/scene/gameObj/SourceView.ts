/**
 * Created by Channing on 2014/10/15.
 */
class SourceView extends egret.Sprite
{
    private showSorce:SpecialNumber;
    constructor()
    {
        super();
        this.initView();
    }
    private initView():void
    {
        var sorceMc:egret.Bitmap = ResourceUtils.createBitmapByName("sorceMcImage");
        this.addChild(sorceMc);

        this.showSorce = new SpecialNumber("number-");
        this.showSorce.x =  sorceMc.width + 10;
        this.addChild(this.showSorce);
    }
    public setValue(sorce:number = 0):void
    {
        this.showSorce.setValue(sorce+"");
    }
}
