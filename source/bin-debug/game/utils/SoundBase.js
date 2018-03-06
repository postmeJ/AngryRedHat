var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by FCX on 3/14/2016.
 */
var SoundBase = (function (_super) {
    __extends(SoundBase, _super);
    function SoundBase(url) {
        var _this = _super.call(this) || this;
        _this._soundURL = "bgSound";
        //默认播放位置，从头开始的
        _this._positon = 0;
        //默认不循环，设置为负数循环
        _this._loop = 1;
        //当前状态0位空，1位播放，2位暂停, 3表示加载完成,4表示加载失败
        _this._status = 0;
        if (url)
            _this._soundURL = url;
        _this._sound = new egret.Sound();
        _this._loadSound();
        return _this;
    }
    //加载音频
    SoundBase.prototype._loadSound = function () {
        if (RES.getRes(this._soundURL)) {
            // 加载
            this._sound = RES.getRes(this._soundURL);
        }
        else {
            //如果RES中未加载该资源，尝试绝对路径加载之。
            this._sound.once(egret.Event.COMPLETE, this.loadComplete, this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            // 启动从指定 URL 加载外部音频文件的过程???
            // url在哪里?
            // 难道是对应的url???
            this._sound.load(this._soundURL);
        }
    };
    //加载音频完成
    SoundBase.prototype.loadComplete = function (e) {
        this._status = 3;
        var waring = "加载完成";
        egret.log(waring);
        //删除加载失败的监听
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        this.dispatchEventWith(egret.Event.COMPLETE, false, waring);
    };
    //加载音频失败
    SoundBase.prototype.onLoadErr = function (e) {
        this._status = 4;
        var waring = "加载失败" + this._soundURL;
        egret.log(waring);
        //删除加载成功的监听
        this._sound.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, waring);
    };
    //设置url并重新加载
    SoundBase.prototype.setUrl = function (url) {
        this._soundURL = url;
        this._loadSound();
    };
    //设置循环
    SoundBase.prototype.looped = function (e) {
        console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring = "播放完成";
        if (this._loop >= 0) {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE, false, waring);
        }
        else {
            this.play();
        }
    };
    //获取状态
    SoundBase.prototype.getStatus = function () {
        return this._status;
    };
    //设置音量
    SoundBase.prototype.setVolume = function (volume) {
        console.log(this._status);
        if (1 === this._status)
            this._soundChannel.volume = volume / 100;
    };
    //显示播放时间
    SoundBase.prototype.showPosition = function () {
        if (1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    };
    //播放音频
    SoundBase.prototype.play = function () {
        if (4 === this._status) {
            this._loadSound();
            return;
        }
        this._status = 1;
        if (this._soundChannel)
            this._soundChannel.stop();
        this._soundChannel = this._sound.play(this._positon, 1);
        this._soundChannel.once(egret.Event.SOUND_COMPLETE, this.looped, this);
        return this._status;
    };
    //设置循环
    SoundBase.prototype.setLoop = function (loop) {
        if (loop === void 0) { loop = 1; }
        this._loop = loop;
        return loop;
    };
    //设置暂停
    SoundBase.prototype.pause = function () {
        var temp = this._status;
        if (1 === temp) {
            this._positon = this._soundChannel.position;
            this._soundChannel.stop();
            this._status = 2;
        }
        egret.log(this._positon);
        return temp;
    };
    //恢复
    SoundBase.prototype.resume = function () {
        var temp = this._status;
        if (2 === temp) {
            this.play();
        }
        egret.log(this._positon);
        return temp;
    };
    //停止
    SoundBase.prototype.stop = function () {
        this._status = 0;
        this._positon = 0;
        this._soundChannel.stop();
        this._soundChannel = null;
    };
    return SoundBase;
}(egret.DisplayObjectContainer));
__reflect(SoundBase.prototype, "SoundBase");
