var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by lcj on 14-8-5.
 */
var ShareUtils = (function () {
    function ShareUtils() {
    }
    ShareUtils.moreGame = function () {
        if (ShareUtils.isInU9()) {
            location.href = "u9time://gamelist";
        }
        else {
            var appId = ShareUtils.findLocationProperty("app_id");
            window.open("http://games.egret-labs.org/more.php?app_id=" + appId, "_self");
        }
    };
    ShareUtils.shareToWeChat = function () {
        //if(!window.hasOwnProperty("location")){
        //    return;
        //}
        //if (WeixinApi) {
        //    WeixinApi.ready(function (api:WeixinApi) {
        //        var info:WeixinShareInfo = new WeixinShareInfo();
        //        info.title = ShareUtils.shareTitle;
        //        info.desc = ShareUtils.shareDesc;
        //        info.link = window.location.href;
        //        info.imgUrl = ShareUtils.IconPath;
        //        api.shareToFriend(info);
        //        api.shareToTimeline(info);
        //    });
        //}
    };
    ShareUtils.isSetSwfFrame = function () {
        var i = 0;
        var b = "";
        var num = GameData.num.length;
        for (; i < num; i++) {
            b += GameData.num[i] + "";
        }
        return b;
    };
    ShareUtils.shareOther = function () {
        if (!window.hasOwnProperty("location")) {
            return;
        }
        //WeixinApi.ready(function (api:WeixinApi) {
        //    var info:WeixinShareInfo = new WeixinShareInfo();
        //    info.title = ShareUtils.shareTitle;
        //    info.desc = ShareUtils.shareDesc;
        //    info.link = window.location.href;
        //    info.imgUrl = ShareUtils.IconPath;
        //});
    };
    ShareUtils.shareToU9 = function () {
        if (!window.hasOwnProperty("location")) {
            return;
        }
        var url = location.href;
        if (location.search == "") {
            url += "?channel=weixin";
        }
        else {
            url += "&channel=weixin";
        }
        url = encodeURIComponent(url);
        var a = "123";
        var msg = encodeURIComponent(ShareUtils.shareDesc);
        var uid = ShareUtils.getUid();
        var link = "u9time://share?" + "uid=" + uid + "&game_url=" + url + "&a=" + a + "&msg=" + msg;
        if (!uid) {
            link = "u9time://share?" + "&game_url=" + url + "&a=" + a + "&msg=" + msg;
        }
        location.href = link;
    };
    ShareUtils.shareToBaidu = function () {
        //BaiduAPI.setShareContent(ShareUtils.shareTitle, ShareUtils.shareDesc);
        //BaiduAPI.showShareView();
    };
    ShareUtils.setUserScore = function (score) {
        if (ShareUtils.isInBaidu()) {
            //BaiduAPI.setUserScore(score);
        }
    };
    ShareUtils.rank = function () {
        if (ShareUtils.isInBaidu()) {
            //BaiduAPI.showRankList();
        }
    };
    ShareUtils.setShareInfo = function (title, desc) {
        ShareUtils.shareTitle = title;
        ShareUtils.shareDesc = desc;
        if (ShareUtils.isInWeChat()) {
            ShareUtils.shareToWeChat();
        }
        else {
            ShareUtils.shareOther();
        }
    };
    ShareUtils.isInWeChat = function () {
        if (!window.hasOwnProperty("navigator")) {
            return false;
        }
        var ua = window.navigator.userAgent;
        return ua.indexOf("MicroMessenger") != -1;
    };
    ShareUtils.isInU9 = function () {
        if (!window.hasOwnProperty("navigator")) {
            return false;
        }
        var ua = window.navigator.userAgent;
        return ua.indexOf("EgretRuntime") != -1 && ua.indexOf("yoyo") != -1;
    };
    ShareUtils.isInBaidu = function () {
        if (!window.hasOwnProperty("location")) {
            return false;
        }
        var url = location.href;
        return url.indexOf("release_baidu") != -1;
    };
    ShareUtils.findLocationProperty = function (key) {
        if (!window.hasOwnProperty("location")) {
            return null;
        }
        var search = location.search;
        if (search == "") {
            return null;
        }
        search = search.slice(1);
        var searchArr = search.split("&");
        var length = searchArr.length;
        for (var i = 0; i < length; i++) {
            var str = searchArr[i];
            var arr = str.split("=");
            if (arr[0] == key) {
                return arr[1];
            }
        }
        return null;
    };
    ShareUtils.getUid = function () {
        return ShareUtils.findLocationProperty("uid");
    };
    ShareUtils.onEnterGame = function () {
        if (ShareUtils.isInBaidu())
            return;
        var appId = ShareUtils.findLocationProperty("app_id");
        var gameId = ShareUtils.findLocationProperty("game_id");
        var deviceId = ShareUtils.findLocationProperty("device_id");
        if (appId && gameId) {
            if (!deviceId) {
                deviceId = egret.localStorage.getItem("device_id");
                if (!deviceId) {
                    deviceId = Math.random();
                }
            }
            egret.localStorage.setItem("device_id", deviceId);
            var url = "http://statistics.egret-labs.org/api.php?app_id=" + appId + "&game_id=" + gameId + "&device_id=" + deviceId;
            var channel = ShareUtils.findLocationProperty("channel");
            if (channel && ShareUtils.isInWeChat()) {
                url += "&channel=" + channel;
            }
            if (url) {
                var urlLoader = new egret.URLLoader();
                urlLoader.load(new egret.URLRequest(url));
            }
        }
    };
    ShareUtils.IconPath = "http://static.egret-labs.org/h5game/icons/10000062.jpg";
    ShareUtils.shareSwfInfo = Const.setSwfArr.join("");
    return ShareUtils;
}());
__reflect(ShareUtils.prototype, "ShareUtils");
