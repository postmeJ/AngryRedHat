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
// 没有调用清除???
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.logoUrl = "resource/assets/loading_logo.png";
        _this.bgUrl = "resource/assets/loading_bg.jpg";
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.w = Const.SCENT_WIDTH;
        this.h = Const.SCENT_HEIGHT;
        this.textField = new egret.TextField();
        this.textField.y = 500;
        this.textField.textColor = 0x333333;
        this.textField.size = 23;
        this.textField.width = this.w;
        this.textField.height = 100;
        this.textField.fontFamily = "Black";
        this.textField.textAlign = "center";
        this.textField_power = new egret.TextField();
        this.textField_power.y = this.h * 0.9;
        this.textField_power.textColor = 0x333333;
        this.textField_power.width = this.w;
        this.textField_power.height = 100;
        this.textField_power.size = 20;
        this.textField_power.text = "Powered by Egret Engine";
        this.textField_power.fontFamily = "Black";
        this.textField_power.textAlign = "center";
        // 使用的URLLoader, 而不是ImageLoader 
        // http://developer.egret.com/cn/github/egret-docs/Engine2D/net/loadText/index.html
        // dataFormat值的设置
        // http://developer.egret.com/cn/apidoc/index/name/egret.URLLoader
        // 如果 dataFormat 属性是 URLLoaderDataFormat.TEXTURE，则所接收的数据是一个包含位图数据的Texture对象
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.logoUrl));
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bgUrl));
        this.bg = new egret.Bitmap();
        this.logo = new egret.Bitmap();
        // DisplayObjectContainer 类是基本显示列表构造块：一个可包含子项的显示列表节点
        this.uiContainer = new egret.DisplayObjectContainer();
        this.addChild(this.uiContainer);
        this.addChild(this.logo);
        this.addChildAt(this.bg, 0);
        this.addChild(this.textField);
        this.addChild(this.textField_power);
    };
    LoadingUI.prototype.onComplete = function (e) {
        // e.target
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.bgUrl) {
            this.bg.texture = texture;
            this.bg.scaleX = this.w / 640;
            this.bg.scaleY = this.h / 960;
        }
        else if (urlLoader._request.url == this.logoUrl) {
            this.logo.texture = texture;
            this.logo.anchorOffsetX = this.logo.width * 0.5;
            this.logo.anchorOffsetY = this.logo.height * 0.5;
            this.logo.x = this.w / 2;
            this.logo.y = this.h / 2 - 60;
            this.logo.scaleX = this.logo.scaleY = this.h / 960;
            this.textField.y = this.logo.y + 100;
        }
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        var num = Math.floor((current / total) * 100);
        this.textField.text = "游戏加载中…" + num + "%";
    };
    LoadingUI.prototype.onLoadComplete = function (callback, thisObj) {
        callback.call(thisObj);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
