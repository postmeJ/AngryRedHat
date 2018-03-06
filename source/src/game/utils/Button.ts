/**
 * Created by husong on 14/10/22.
 */
class Button extends egret.Sprite {
    private upBmp:egret.Bitmap;
    private downBmp:egret.Bitmap;
    private _buttonSkin:ButtonSkin;
    private lable:egret.Bitmap;
    constructor(buttonVO:ButtonSkin = null) {
        super();
        this._buttonSkin = buttonVO;
        this.upBmp = new egret.Bitmap();
        this.upBmp.visible = true;
        this.downBmp = new egret.Bitmap();
        this.downBmp.visible = false;

        this.lable = new egret.Bitmap();

        this.touchEnabled = true;
        this.addChild(this.upBmp);
        this.addChild(this.downBmp);
        this.addChild(this.lable);
        this.setTexture(buttonVO);
        this.addHandlers();
    }

    private addHandlers():void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchHandler,this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.touchHandler,this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

    private touchHandler(event:egret.TouchEvent):void {
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.upBmp.visible = false;
                this.downBmp.visible = true;
                break;
            case egret.TouchEvent.TOUCH_END:
                this.upBmp.visible = true;
                this.downBmp.visible = false;
                break;
            case egret.TouchEvent.TOUCH_TAP:
//                this.clickHandler(event);
                this.clickHandler.call(this.clickHandlerObj,event);
                break;
        }
    }

    public setTexture(buttonVO:ButtonSkin):void {
        if(buttonVO) {
            this._buttonSkin = buttonVO;
            this.upBmp.texture = GameUtils.createTextureByName(buttonVO.upSkinName);
            this.downBmp.texture = GameUtils.createTextureByName(buttonVO.downSkinName);
        }
    }

    public setLableTexture(name:string):void {
        this.lable.texture = GameUtils.createTextureByName(name);
        this.lable.x = this.width/2 - this.lable.width/2;
        this.lable.y = this.height/2 - this.lable.height/2;
    }

    public get buttonSkin() {
        return this._buttonSkin;
    }

    public setClickHandler(func,funcObj):void {
        this.clickHandler = func;
        this.clickHandlerObj = funcObj;
    }
    private clickHandlerObj;
    private clickHandler:Function;
}
