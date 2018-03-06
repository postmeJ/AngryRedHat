/**
 * Created by Channing on 2014/10/15.
 */
class OptionView extends egret.Sprite
{
    private helpSp:egret.Sprite;
    private spContainer:egret.Sprite;
    constructor(){
        super();

        this.initView();
    }

    private initView():void
    {
        var spMask:egret.Sprite = new egret.Sprite();
        this.addChild(spMask);
        var mask:egret.Bitmap = ResourceUtils.createBitmapByName("maskImage");
        spMask.addChild(mask);
        spMask.touchEnabled = true;
        spMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);

        this.spContainer = new egret.Sprite();
        this.addChild(this.spContainer);

        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("optionBgImage");
        this.spContainer.addChild(bg);

        var wd:number = Const.SCENT_WIDTH/8;
        var hd:number = Const.SCENT_HEIGHT/4;
        this.spContainer.x = wd;
        this.spContainer.y = hd;


        var zhinan:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(zhinan);
        var zhinanBmp:egret.Bitmap = ResourceUtils.createBitmapByName("zhinanImage");
        zhinan.addChild(zhinanBmp);
        zhinan.x = this.spContainer.width/2-zhinan.width/2;
        zhinan.y = 200;
        zhinan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHelp,this);
        zhinan.touchEnabled = true;

        this.helpSp = new egret.Sprite();
        this.addChild(this.helpSp);

        var close:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(close);
        var spclose:egret.Bitmap = ResourceUtils.createBitmapByName("option7Image");
        close.addChild(spclose);
        close.touchEnabled = true;
        close.x = this.spContainer.width-close.width*0.7;
        close.y = -close.height*0.4;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closePop,this);

        var soundBooBg:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(soundBooBg);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        soundBooBg.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        soundBooBg.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        soundBooBg.x = 182;
        soundBooBg.y = 84;
        soundBooBg.touchEnabled = true;
        soundBooBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBgHandler,this);

        var soundBoo:egret.Sprite = new egret.Sprite();
        this.spContainer.addChild(soundBoo);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        soundBoo.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        soundBoo.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        soundBoo.x = 182;
        soundBoo.y = 148;
        soundBoo.touchEnabled = true;
        soundBoo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);

        if(GameData.closeBgMusic){
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
        }else{
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
        }

        if(GameData.closeMusic){
            this.spguan.visible = true;
            this.spkai.visible = false;
        }else{
            this.spguan.visible = false;
            this.spkai.visible = true;
        }

    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    private touchHelp(e:egret.TouchEvent):void
    {
        if(this.helpSp.visible == false)
        {
            this.helpSp.visible = true;
            return;
        }
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("gameinfoImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.helpSp.addChild(bg);

        var close_btn:MyButton = new MyButton("closeGameBtnImage","closeGameBtnImage");
        this.helpSp.addChild(close_btn);
        var _swidth:number = Const.SCENT_WIDTH/2- close_btn.width/2;
        var _sheight:number = Const.SCENT_HEIGHT - close_btn.height;
        close_btn.x = _swidth;
        close_btn.y = _sheight;
        close_btn.setClick(this.showStartView.bind(this));
    }

    private showStartView():void
    {
        this.helpSp.visible = false;
    }

    private spguanbg:egret.Bitmap;
    private spkaibg:egret.Bitmap;
    private spguan:egret.Bitmap;
    private spkai:egret.Bitmap;
    private clickHandler(e:egret.TouchEvent):void
    {
        if(!GameData.closeMusic)
        {
            this.spkai.visible = false;
            this.spguan.visible = true;
            GameData.closeMusic = true;
        }else{
            this.spkai.visible = true;
            this.spguan.visible = false;
            GameData.closeMusic = false;
        }
    }
    private clickBgHandler(e:egret.TouchEvent):void
    {
        if(!GameData.closeBgMusic)
        {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
            GameData.closeBgMusic = true;
            SoundUtils.instance().stopBg()
        }else{
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
            GameData.closeBgMusic = false;
            SoundUtils.instance().playBg();
        }
    }
    private closePop(e:egret.TouchEvent):void
    {
        this.visible = false;
        if(GameData.isStart)
        {
            GameData.isPause = false;
        }
    }
}
