/**
 * 小红帽
 * Created by Channing on 2014/10/11.
 */
class RedGirl extends egret.Sprite {

    private girl:StarlingSwfMovieClip;
    constructor() {
        super();

        this.initView();
    }

    private initView():void
    {
        this.girl = StarlingSwfFactory.getInstance().makeMc("xiaohongmao");
        this.addChild(this.girl);
        this.girl.gotoAndStop(0);
    }
    public run():void
    {
        this.girl.goToPlay("1");
    }
    public gotoDie():void
    {
        this.girl.goToPlay("2");
    }

    public gotoWin():void
    {
        this.girl.goToPlay("3");
    }

    public dispose():void
    {
        this.removeChildren();
    }
}
