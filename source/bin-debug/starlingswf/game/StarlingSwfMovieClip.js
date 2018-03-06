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
 * Created by Administrator on 2014/6/16.
 */
var StarlingSwfMovieClip = (function (_super) {
    __extends(StarlingSwfMovieClip, _super);
    function StarlingSwfMovieClip(frames, labels, displayObjects, ownerSwf) {
        var _this = _super.call(this, frames, labels, displayObjects, ownerSwf) || this;
        _this.frameActions = {};
        _this.preFrame = -1;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    StarlingSwfMovieClip.prototype.onRemove = function () {
        this.stop();
    };
    StarlingSwfMovieClip.prototype.setFrameAction = function ($frame, $action, $actionObj, $param) {
        if ($param === void 0) { $param = null; }
        this.frameActions[$frame] = [$action, $actionObj, $param];
    };
    StarlingSwfMovieClip.prototype.setCompleteAction = function ($action, $actionObj) {
        this.complateFunc = $action;
        this.complateObj = $actionObj;
        this.addEventListener(egret.Event.COMPLETE, this.onPlayend, this);
    };
    StarlingSwfMovieClip.prototype.onPlayend = function () {
        if (this.complateFunc) {
            this.complateFunc.call(this.complateObj);
        }
    };
    StarlingSwfMovieClip.prototype.goToPlay = function (frame) {
        this.preFrame = -1;
        this.currFrameName = frame;
        this.gotoAndPlay(frame);
    };
    StarlingSwfMovieClip.prototype.update = function () {
        _super.prototype.update.call(this);
        var currFrame = this.getCurrentFrame();
        if (this.preFrame != currFrame) {
            this.preFrame = currFrame;
            if (this.frameActions && this.frameActions[currFrame]) {
                var arr = this.frameActions[currFrame];
                if (arr[2])
                    arr[0].call(arr[1], arr[2]);
                else
                    arr[0].call(arr[1]);
            }
        }
    };
    StarlingSwfMovieClip.prototype.dispose = function () {
        this.stop();
        this.removeEventListener(egret.Event.COMPLETE, this.onPlayend, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.complateFunc = null;
        this.complateObj = null;
        this.frameActions = null;
    };
    return StarlingSwfMovieClip;
}(starlingswf.SwfMovieClip));
__reflect(StarlingSwfMovieClip.prototype, "StarlingSwfMovieClip");
