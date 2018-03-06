/**
 * Created by husong on 14/11/7.
 */
class ReliveView extends egret.DisplayObjectContainer {
    private btnRelive:Button;
    private btnOver:Button;
    constructor(){
        super();

        this.initUI();
    }

    private initUI():void {
        var bg = GameUtils.createBitmapByName("newAssets.blackBg");
        bg.touchEnabled = true;
        bg.alpha = 0.3;
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);

        this.btnRelive = new Button();
        this.btnRelive.setTexture(new ButtonSkin("newAssets.btn01_up","newAssets.btn01_down"));
        this.btnRelive.setLableTexture("newAssets.fuhuo");
        this.btnRelive.x = Const.SCENT_WIDTH/2 - this.btnRelive.width - 10;
        this.btnRelive.y = Const.SCENT_HEIGHT/2 - this.btnRelive.height - 10;
        this.addChild(this.btnRelive);

        this.btnOver = new Button();
        this.btnOver.setTexture(new ButtonSkin("newAssets.btn02_up","newAssets.btn02_down"));
        this.btnOver.setLableTexture("newAssets.jieshu");
        this.btnOver.x = Const.SCENT_WIDTH/2 + 10;
        this.btnOver.y = Const.SCENT_HEIGHT/2 - this.btnRelive.height - 10;
        this.addChild(this.btnOver);
    }

    public setGameOver(func,funcObj):void {
        this.btnOver.setClickHandler(func,funcObj);
    }

    public setRelive(func,funcObj):void {
        this.btnRelive.setClickHandler(func,funcObj);
    }


}