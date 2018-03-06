var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/10/16.
 */
var SoundUtils = (function () {
    function SoundUtils() {
        if (SoundUtils._instance != null)
            throw new Error("singleton");
    }
    SoundUtils.instance = function () {
        return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    };
    SoundUtils.prototype.initSound = function () {
        this.bgSound = new SoundBase("bgSound");
        this.winSound = new SoundBase("winSound");
        this.missSound = new SoundBase("missSound");
        this.hitSound = new SoundBase("hitSound");
        this.goSound = new SoundBase("hitSound");
        this.overSound = new SoundBase("overSound");
        this.beHitSound = new SoundBase("beHitSound");
        this.numSound = new SoundBase("numSound");
    };
    SoundUtils.prototype.playNum = function () {
        if (GameData.closeMusic)
            return;
        this.numSound.play();
    };
    SoundUtils.prototype.playBeHit = function () {
        if (GameData.closeMusic)
            return;
        this.beHitSound.play();
    };
    SoundUtils.prototype.playOver = function () {
        if (GameData.closeMusic)
            return;
        this.overSound.play();
    };
    SoundUtils.prototype.playGo = function () {
        if (GameData.closeMusic)
            return;
        this.goSound.play();
    };
    SoundUtils.prototype.playHit = function () {
        if (GameData.closeMusic)
            return;
        this.hitSound.play();
    };
    SoundUtils.prototype.playMiss = function () {
        if (GameData.closeMusic)
            return;
        this.missSound.play();
    };
    SoundUtils.prototype.playWin = function () {
        if (GameData.closeMusic)
            return;
        this.winSound.play();
    };
    SoundUtils.prototype.playBg = function () {
        if (GameData.closeBgMusic) {
            this.bgSound.pause();
            return;
        }
        this.bgSound.play();
        this.beHitSound.setLoop(1);
    };
    SoundUtils.prototype.stopBg = function () {
        this.bgSound.pause();
    };
    return SoundUtils;
}());
__reflect(SoundUtils.prototype, "SoundUtils");
