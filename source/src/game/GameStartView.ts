/**
 * Created by Administrator on 2014/10/9.
 */
class GameStartView extends egret.Sprite{
    private gameSoundPop:MusicView;
    constructor()
    {
        super();
        this.initView();
    }
    private initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("bgImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.addChild(bg);

        var startBtn:MyButtonForGame = new MyButtonForGame("startBtnImage","startBtnImage");
        this.addChild(startBtn);
        startBtn.x= Const.SCENT_WIDTH/2- startBtn.width/2;
        startBtn.y = Const.SCENT_HEIGHT - startBtn.height -30;
        startBtn.setClick(this.onStartGameHandler.bind(this));

        var music_btn:MyButtonForGame = new MyButtonForGame("musicBtnImage","musicBtnImage");
        this.addChild(music_btn);
        music_btn.x = startBtn.x+startBtn.width+10;
        music_btn.y =  startBtn.y+10;
        music_btn.setClick(this.showGameSoundHandler.bind(this));

        var help_btn:MyButtonForGame = new MyButtonForGame("helpBtnImage","helpBtnImage");
        this.addChild(help_btn);
        help_btn.x = startBtn.x-10-help_btn.width;
        help_btn.y = startBtn.y+10;
        help_btn.setClick(this.showGameInfoHandler.bind(this));

        this.gameSoundPop = new MusicView();
        this.addChild(this.gameSoundPop);
        this.gameSoundPop.visible = false;
    }
    private showGameSoundHandler(e:egret.TouchEvent):void
    {
        this.gameSoundPop.visible = true;
        GameData.isClickBtn = true;
    }
    private showGameInfoHandler(e:egret.TouchEvent):void
    {
        this.removeAll();
        var gameInfo:GameInfoView = new GameInfoView();
        this.addChild(gameInfo);
    }
    private onStartGameHandler():void
    {
        GameSceneView._gameScene.play();
        this.removeAll();
    }
    private removeAll():void
    {
        this.removeChildren();
        this.gameSoundPop = null;
    }
}