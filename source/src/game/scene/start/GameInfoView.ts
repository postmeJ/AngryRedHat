/**
 * Created by Channing on 2014/10/9.
 */
class GameInfoView extends egret.Sprite
{
    constructor()
    {
        super();
        this.initView();
    }
    private initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("gameinfoImage");
        this.addChild(bg);

        var startBtn:MyButtonForGame = new MyButtonForGame("startBtnImage","startBtnImage");
        this.addChild(startBtn);
        startBtn.y = Const.SCENT_HEIGHT - startBtn.height;
        startBtn.x= Const.SCENT_WIDTH/2- startBtn.width/2;
        startBtn.setClick(this.onStartGameHandler.bind(this));
    }
    private onStartGameHandler():void
    {
        GameSceneView._gameScene.play();
        this.removeChildren();
    }
}