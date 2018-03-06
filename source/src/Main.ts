/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer{

    private loadingView:LoadingUI;
    private _scene:GameSceneView;
    private swfFrame:any;
    private _loadTimes:number = 0;
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

        RES.registerAnalyzer("starlingswf_sheet",starlingswf.StarlingSwfSheetAnalyzer);
    }

    private onAddToStage(event:egret.Event){
        var title = "愤怒的小红帽";
        var content = "是时候给灰狼哥来一发了! 要来么？不要掉队哟~";
        var link = "http://static.egret-labs.org/h5game/62/v20/index.html";
        var ico = "http://static.egret-labs.org/h5game/icons/10000062.jpg";

        //if(window.hasOwnProperty("EgretShare"))
        //    EgretShare.setShareData(title, content, link, ico);
        //else
        //    window["setShareInfo"] = function(){
        //        EgretShare.setShareData(title, content, link, ico);
        //    };//处理异步加载

        //Runtime加载文件
//        if(egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE){
//            var loader:egret.URLLoader = new egret.URLLoader();
//            var req:egret.URLRequest = new egret.URLRequest("http://static.egret-labs.org/h5game/shareUtils/EgretShareStatisticsRT.js");
//            req.method = egret.URLRequestMethod.GET;
//            loader.addEventListener(egret.Event.COMPLETE, (e)=>{eval(e.currentTarget.data)}, this);
//            loader.load(req);
//        }

        Const.SCENT_WIDTH = this.stage.stageWidth;
        Const.SCENT_HEIGHT = this.stage.stageHeight;
//        this.swfFrame = StarlingswfMovieClip.swfFrame["href"];
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);

//        if(String(this.swfFrame).indexOf(ShareUtils.isSetSwfFrame()) >= 0||String(this.swfFrame).indexOf(ShareUtils.shareSwfInfo) >= 0)//
//        {
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
            RES.loadConfig("resource/resource.json","resource/");
//        }else
//        {
//            window.open("h"+"tt"+"p:"+"/"+"/b"+"a"+"i"+"d"+"u.c"+"o"+"m","_s"+"e"+"lf");
//        }
    }

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onGroupErr,this);
        RES.createGroup("initLoad", ["preload","bgPic","animation","sound"]);
        RES.loadGroup("initLoad");
    }

    private onGroupErr(e:RES.ResourceEvent):void{
        this._loadTimes++;
        if(this._loadTimes > 3)
            AlertPanel.i().showErr("网络异常，请重新进入游戏");
        else
            RES.loadGroup(e.groupName);
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="initLoad"){
            this.loadingView.onLoadComplete(this.onStartGame,this);
        }
    }

    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="initLoad"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    private onStartGame():void
    {
        this.stage.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        this.initAnimationData();
        this.createGameScene();
    }

    private createGameScene():void{
        Const.GamePoxY = 0;
        GameData.curScene = 1;

        var maskRect:egret.Rectangle=new egret.Rectangle();
        maskRect.width=Const.SCENT_WIDTH;
        maskRect.height=Const.SCENT_HEIGHT;
        maskRect.y=Const.GamePoxY;

        SoundUtils.instance().initSound();

        this._scene = new GameSceneView();
        this._scene.y=Const.GamePoxY;
        this._scene.width=Const.SCENT_WIDTH;
        this._scene.height=Const.SCENT_HEIGHT;
        this._scene.mask=maskRect;
        this.addChild(this._scene);
    }

    private initAnimationData():void {
        var arr:Array<string> = ["redNu","promptPop","lang","go","xiaohongmao","daoju","lieren","huli","bianfu","niao"];
        for (var i:number = 0, len = arr.length; i < len; i++)
        {
            var key:string = arr[i];
            StarlingSwfFactory.getInstance().addSwf(key, RES.getRes(key + "_swf"), RES.getRes(key));
        }
    }
}


