/**
 * Created by Administrator on 2014/10/9.
 */
class GameOverView extends egret.Sprite
{
    private bg:egret.Bitmap;
    private thisContainer:egret.Sprite;
    private sorce:SpecialNumber;

    private thisNum:number = 0;

    private num:number = 0;

    /**
     * 帧回调用的变量
     * 对应于t1,t2,t3
     */
    private t1Num:number = 0;
    private t2Num:number = 0;
    private t3Num:number = 0;

    /**
     * 三种怪数量score文本
     */
    private t1:SpecialNumber;
    private t2:SpecialNumber;
    private t3:SpecialNumber;

    /**
     * 三种怪的实时x位置
     */
    private huliW:number = 0;
    private langW:number = 0;
    private bianfuW:number = 0;

    /**
     * "超越了丛林中"+this.tNum+"%的小伙伴"
     */
    private tt:egret.TextField;

    /**
     * 随机算的超过多少人的变量
     */
    private ttNum:number = 0;
    /**
     * 帧回调用的变量
     * 对应于ttNum
     */
    private tNum:number = 0;

    private spGengduo:egret.Sprite;
    private spZaiLai:egret.Sprite;
    private spFenXiang:egret.Sprite;
    
    /**
     * shareImage的egret.Sprite
     */
    private sp:egret.Sprite;

    /**
     * 关卡判断使用的变量
     */
    private boo1:Boolean = false;
    private boo3:Boolean = false;
    private boo2:Boolean = false;
    
    constructor()
    {
        super();
        this.initView();
    }

    private initView():void
    {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.bg = ResourceUtils.createBitmapByName("overBgImage");
        this.thisContainer.addChild(this.bg);

        // enemy
        this.initEnemy(GameData.curScene);

        /**
         * score
         * 默认0分的情况下
         */
        this.sorce = new SpecialNumber("number-0");
        this.thisContainer.addChild(this.sorce);
        this.sorce.setValue(0+"");
        this.sorce.x = Const.SCENT_WIDTH/2-this.sorce.width/2;
        this.sorce.y = Const.SCENT_HEIGHT/6;

        // 心跳
        // http://edn.egret.com/cn/apidoc/egret/name/egret.Ticker
        // register() 注册帧回调事件，同一函数的重复监听会被忽略。推荐使用 egret.startTick 替代此方法。
        // http://developer.egret.com/cn/apidoc/index/name/egret.Ticker
        egret.Ticker.getInstance().register(this.showSorce,this);

        this.tt = new egret.TextField();
        this.addChild(this.tt);

        if(GameData.isWin)
        {
            var b:number = Math.floor(Math.random()*15+80);
        }else{
            var b:number = Math.floor(Math.random()*40+40);
        }

        // tt
        this.ttNum = b; // 超过多少人的变量
        this.tt.text = "超越了丛林中"+0+"%的小伙伴";
        this.tt.textColor = 0x000000;
        this.tt.bold = true;
        this.tt.size = 32;
        this.tt.x = this.thisContainer.width/2-this.tt.width/2-10;
        this.tt.y = 505;

        /**
         * 更多游戏
         */
        // 我的egret.Sprit()的理解
        // sprit是一个容器,不过这个容器主要提供给图片和作为布局的图片
        this.spGengduo = new egret.Sprite();
        this.thisContainer.addChild(this.spGengduo);
        // !!!
        // sprit > bitmap
        // spGengduo > gengduo
        var gengduo:egret.Bitmap = ResourceUtils.createBitmapByName("btngengduoyouxi");
        this.spGengduo.addChild(gengduo);
        this.spGengduo.touchEnabled = true;

        this.spGengduo.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toGengDuoView,this);

        //EgretShare.setShareContent("我的小红帽干掉了"+(GameData.langNum+GameData.huliNum+GameData.bianfuNum)+"只色狼,获得了"+GameData.sorce+"分,超越了"+b+"%的小伙伴.");

        /**
         * 再来一局
         */
        this.spZaiLai = new egret.Sprite();
        this.thisContainer.addChild(this.spZaiLai);
        var zailai:egret.Bitmap = ResourceUtils.createBitmapByName("btnzailaiyici");
        this.spZaiLai.addChild(zailai);
        this.spZaiLai.touchEnabled = true;
        this.spZaiLai.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toGameStartView,this);

        /**
         * 分享
         */
        this.spFenXiang = new egret.Sprite();
        this.thisContainer.addChild(this.spFenXiang);
        var fenxiang:egret.Bitmap = ResourceUtils.createBitmapByName("btnfenxiang");
        this.spFenXiang.addChild(fenxiang);
        this.spFenXiang.touchEnabled = true;
        this.spFenXiang.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toShareView,this);

        /**
         * 
         */
        this.spGengduo.y = this.spFenXiang.y = this.spZaiLai.y = 600;
        this.spGengduo.x = 12;
        this.spZaiLai.x = 170;
        this.spFenXiang.x = 330;

            //        if(!EgretShare.canShare){
        if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE){
            //            this.spGengduo.x = 82;
            //            this.spZaiLai.x = 260;
            this.thisContainer.removeChild(this.spGengduo);
            this.thisContainer.removeChild(this.spFenXiang);
        }

        /**
         * shareImage
         */
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("shareImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.sp.addChild(bg);
        this.sp.visible = false;
        this.sp.touchEnabled = true;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchShare,this);

        this.thisContainer.scaleX = this.thisContainer.scaleY = 0.9;
        this.thisContainer.x = Const.SCENT_WIDTH/2-this.thisContainer.width/2+30;
        this.thisContainer.y = Const.SCENT_HEIGHT/2-this.thisContainer.height/2+30;
    }

    
    /**
     * 修改和展示 等分和杀死不同的怪的数量
     * 
     * @private
     * @param {egret.Event} e 
     * @memberof GameOverView
     */
    private showSorce(e:egret.Event):void
    {      
        /**
         * for test
         */
        // GameData.sorce = 20000
        // GameData.langNum = 10
        // GameData.huliNum = 10
        // GameData.bianfuNum = 10
        this.num++;
        if(this.thisNum<GameData.sorce) {
            this.thisNum += this.num;
            if (this.thisNum > GameData.sorce) {
                this.thisNum = GameData.sorce;
            }
            this.sorce.setValue(this.thisNum + "");
            this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        }
        if(this.boo1)
        {
            if(this.t1Num<GameData.langNum)
            {
                this.t1Num+=3;
                if(this.t1Num>GameData.langNum)
                {
                    this.t1Num = GameData.langNum;
                }

                this.t1.setValue(this.t1Num+"");
                this.t1.x = this.langW-this.t1.width/2;
            }
        }

        if(this.boo2){
            if(this.t2Num<GameData.huliNum)
            {
                this.t2Num+=3; // why???
                if(this.t2Num>GameData.huliNum)
                {
                    this.t2Num = GameData.huliNum;
                }
                this.t2.setValue(this.t2Num+"");
                this.t2.x = this.huliW-this.t2.width/2;
            }
        }

        if(this.boo3)
        {
            if(this.t3Num<GameData.bianfuNum)
            {
                this.t3Num+=3;
                if(this.t3Num>GameData.bianfuNum)
                {
                    this.t3Num = GameData.bianfuNum;
                }

                this.t3.setValue(this.t3Num+"");
                this.t3.x = this.bianfuW-this.t3.width/2;
            }
        }

        if(this.tNum<this.ttNum)
        {
            this.tNum+=2;
            if(this.tNum>this.ttNum)
            {
                this.tNum = this.ttNum;
            }

            this.tt.text = "超越了丛林中"+this.tNum+"%的小伙伴";
            this.tt.x = this.thisContainer.width/2-this.tt.width/2-10;
        }
    }

    private toShareView(e:egret.TouchEvent):void
    {
        //EgretShare.share();
    }
    private toGengDuoView(e:egret.TouchEvent):void
    {   
        // 展示more game
        //EgretShare.moreGame();
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.toGengDuoView,this);
    }
    private toGameStartView(e:egret.TouchEvent):void
    {
        GameData.curScene = 1;
        GameData.sorce = 0;
        GameData.langNum = 0;
        GameData.huliNum = 0;
        GameData.bianfuNum = 0;
        GameData.isPause = true;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        GameData.blod = 5;

        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.toGengDuoView,this);
        this.spFenXiang.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.toShareView,this);
        this.spZaiLai.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.toGameStartView,this);

        // 删除子删除自己
        this.removeChildren();
        if(this.parent)
            this.parent.removeChild(this);
        
        GameSceneView._gameScene.start();
    }
    /**
     * 没有被使用
     * 
     * @private
     * @param {egret.TouchEvent} e 
     * @memberof GameOverView
     */
    private touchShare(e:egret.TouchEvent):void
    {
        this.sp.visible = false;
    }

    private initEnemy(num:number = 0):void
    {   
        if(num == 1||num == 2)
        {
            this.boo1 = true;
            var lang:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("lang");
            this.thisContainer.addChild(lang);
            lang.goToPlay("run");
            lang.y = 340;
            lang.x = 140+lang.width;
            this.langW = lang.x;

            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0+"");

            this.t1.x = lang.x-this.t1.width/2;
            this.t1.y = lang.y+lang.height*0.6-20;
        }
        else if(num == 3||num == 4)
        {
            this.boo1 = true;
            this.boo2 = true;

            var lang:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("huli");
            
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);

            lang.goToPlay("run");
            huli.goToPlay("run");
            
            huli.y = 320;
            lang.y = 340;
            lang.x = (220+lang.width)/2;
            huli.x = lang.x+lang.width+60;
            
            this.langW = lang.x;
            this.huliW = huli.x;
            
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0+"");
            
            this.t1.x = lang.x-this.t1.width/2;
            this.t1.y = lang.y+lang.height*0.6-20;
            
            this.t2 =  new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0+"");
            
            this.t2.x = huli.x-this.t2.width/2;
            this.t2.y = huli.y+lang.height*0.6;
        }
        else if(num == 5||num == 6)
        {
            this.boo1 = true;
            this.boo2 = true;
            this.boo3 = true;
            
            var lang:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("huli");
            var bianfu:StarlingSwfMovieClip = StarlingSwfFactory.getInstance().makeMc("bianfu");
            
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);
            this.thisContainer.addChild(bianfu);
            
            lang.goToPlay("run");
            huli.goToPlay("run");
            bianfu.goToPlay("run");
            
            huli.y = 320;
            bianfu.y = 335;
            lang.y = 340;
            
            lang.x = 90;
            huli.x = lang.x+lang.width+60;
            this.huliW = huli.x;
            this.langW = lang.x;
            bianfu.x = huli.x+huli.width+70;
            this.bianfuW = bianfu.x;

            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0+"");
            this.t1.x = lang.x-this.t1.width/2;
            this.t1.y = lang.y+lang.height*0.6-20;
            
            this.t2 =  new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0+"");
            this.t2.x = huli.x-this.t2.width/2;
            this.t2.y = huli.y+lang.height*0.6;
            
            this.t3 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t3);
            this.t3.setValue(0+"");
            this.t3.x = bianfu.x-this.t3.width/2;
            this.t3.y = bianfu.y+lang.height*0.6-15;
        }
    }
}