var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
