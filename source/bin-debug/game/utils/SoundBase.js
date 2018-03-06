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
        //Ĭ�ϲ���λ�ã���ͷ��ʼ��
        _this._positon = 0;
        //Ĭ�ϲ�ѭ��������Ϊ����ѭ��
        _this._loop = 1;
        //��ǰ״̬0λ�գ�1λ���ţ�2λ��ͣ, 3��ʾ��������,4��ʾ����ʧ��
        _this._status = 0;
        if (url)
            _this._soundURL = url;
        _this._sound = new egret.Sound();
        _this._loadSound();
        return _this;
    }
    //������Ƶ
    SoundBase.prototype._loadSound = function () {
        if (RES.getRes(this._soundURL)) {
            this._sound = RES.getRes(this._soundURL);
        }
        else {
            //����RES��δ���ظ���Դ�����Ծ���·������֮��
            this._sound.once(egret.Event.COMPLETE, this.loadComplete, this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            this._sound.load(this._soundURL);
        }
    };
    //������Ƶ����
    SoundBase.prototype.loadComplete = function (e) {
        this._status = 3;
        var waring = "��������";
        egret.log(waring);
        //ɾ������ʧ�ܵļ���
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        this.dispatchEventWith(egret.Event.COMPLETE, false, waring);
    };
    //������Ƶʧ��
    SoundBase.prototype.onLoadErr = function (e) {
        this._status = 4;
        var waring = "����ʧ��" + this._soundURL;
        egret.log(waring);
        //ɾ�����سɹ��ļ���
        this._sound.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, waring);
    };
    //����url�����¼���
    SoundBase.prototype.setUrl = function (url) {
        this._soundURL = url;
        this._loadSound();
    };
    //����ѭ��
    SoundBase.prototype.looped = function (e) {
        console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring = "��������";
        if (this._loop >= 0) {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE, false, waring);
        }
        else {
            this.play();
        }
    };
    //��ȡ״̬
    SoundBase.prototype.getStatus = function () {
        return this._status;
    };
    //��������
    SoundBase.prototype.setVolume = function (volume) {
        console.log(this._status);
        if (1 === this._status)
            this._soundChannel.volume = volume / 100;
    };
    //��ʾ����ʱ��
    SoundBase.prototype.showPosition = function () {
        if (1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    };
    //������Ƶ
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
    //����ѭ��
    SoundBase.prototype.setLoop = function (loop) {
        if (loop === void 0) { loop = 1; }
        this._loop = loop;
        return loop;
    };
    //������ͣ
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
    //�ָ�
    SoundBase.prototype.resume = function () {
        var temp = this._status;
        if (2 === temp) {
            this.play();
        }
        egret.log(this._positon);
        return temp;
    };
    //ֹͣ
    SoundBase.prototype.stop = function () {
        this._status = 0;
        this._positon = 0;
        this._soundChannel.stop();
        this._soundChannel = null;
    };
    return SoundBase;
}(egret.DisplayObjectContainer));
__reflect(SoundBase.prototype, "SoundBase");
