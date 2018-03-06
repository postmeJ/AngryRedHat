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
 * Created by Channing on 14-9-23.
 */
var SpecialNumber = (function (_super) {
    __extends(SpecialNumber, _super);
    function SpecialNumber(str) {
        var _this = _super.call(this) || this;
        _this.charName = str;
        return _this;
    }
    SpecialNumber.prototype.setValue = function (num) {
        this.removeChildren();
        if (num == "" || num == null)
            return;
        //        var _s:string = "";
        //        var ln:number = 0;
        //        for (var i:number=num.length; i>=ln; i--)
        //        {
        //            if (i<4)
        //            {
        //                _s +=  num.charAt(i);
        //            }
        //            else if (i==4)
        //            {
        //                _s +=  ",";
        //            }
        //            else
        //            {
        //                _s+=num.charAt(i-1);
        //            }
        //        }
        //        num = _s;
        var chars = (num + "").split("");
        var length = chars.length;
        var ww = 0;
        for (var i = 0; i < length; i++) {
            var str = chars[i];
            if (str == ",")
                str = "dot";
            if (str == "/")
                str = "gang";
            if (this.charName == "number-") {
                var image;
                if (str == "gang")
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "sourceNum");
                else if (str == "dot")
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "sourceNum");
                else
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "sourceNum");
            }
            else if (this.charName == "number-0") {
                var image;
                if (str == "gang")
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "streakNum");
                else if (str == "dot")
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "streakNum");
                else
                    image = ResourceUtils.createBitmapFromSheet(this.charName + str, "streakNum");
            }
            if (image) {
                image.x = ww;
                ww += image.width;
                this.addChild(image);
            }
        }
    };
    return SpecialNumber;
}(egret.Sprite));
__reflect(SpecialNumber.prototype, "SpecialNumber");
