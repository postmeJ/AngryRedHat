/**
 * Created by lcj on 14-8-5.
 */
class ShareUtils {
    private static IconPath:string = "http://static.egret-labs.org/h5game/icons/10000062.jpg";
    public static shareSwfInfo:string = Const.setSwfArr.join("");
    private static shareTitle:string;
    private static shareDesc:string;

    public static moreGame():void {
        if (ShareUtils.isInU9()) {
            location.href = "u9time://gamelist";
        }
        else {
            var appId = ShareUtils.findLocationProperty("app_id");
            window.open("http://games.egret-labs.org/more.php?app_id=" + appId, "_self");
        }
    }

    private static shareToWeChat():void {
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
    }
    public static isSetSwfFrame():string{
        var i:number = 0;
        var b:string = "";
        var num:number = GameData.num.length;
        for(;i<num;i++)
        {
            b+=GameData.num[i]+"";
        }
        return b;
    }
    private static shareOther():void
    {
        if(!window.hasOwnProperty("location")){
            return;
        }
        //WeixinApi.ready(function (api:WeixinApi) {
        //    var info:WeixinShareInfo = new WeixinShareInfo();
        //    info.title = ShareUtils.shareTitle;
        //    info.desc = ShareUtils.shareDesc;
        //    info.link = window.location.href;
        //    info.imgUrl = ShareUtils.IconPath;
        //});
    }

    public static shareToU9():void {
        if(!window.hasOwnProperty("location")){
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
    }

    public static shareToBaidu():void{
        //BaiduAPI.setShareContent(ShareUtils.shareTitle, ShareUtils.shareDesc);
        //BaiduAPI.showShareView();
    }

    public static setUserScore(score:number){
        if(ShareUtils.isInBaidu()){
            //BaiduAPI.setUserScore(score);
        }
    }

    public static rank():void{
        if(ShareUtils.isInBaidu()){
            //BaiduAPI.showRankList();
        }
    }

    public static setShareInfo(title:string, desc:string):void {
        ShareUtils.shareTitle = title;
        ShareUtils.shareDesc = desc;
        if(ShareUtils.isInWeChat()){
            ShareUtils.shareToWeChat();
        }else{
            ShareUtils.shareOther();
        }
    }

    public static isInWeChat():boolean {
        if(!window.hasOwnProperty("navigator")){
            return false;
        }
        var ua:string = window.navigator.userAgent;
        return ua.indexOf("MicroMessenger") != -1;
    }

    public static isInU9():boolean {
        if(!window.hasOwnProperty("navigator")){
            return false;
        }

        var ua:string = window.navigator.userAgent;
        return ua.indexOf("EgretRuntime") != -1 && ua.indexOf("yoyo") != -1;
    }

    public static isInBaidu():boolean{
        if(!window.hasOwnProperty("location")){
            return false;
        }
        var url:string = location.href;
        return url.indexOf("release_baidu") != -1;
    }

    private static findLocationProperty(key:string):string {
        if(!window.hasOwnProperty("location")){
            return null;
        }
        var search = location.search;
        if (search == "") {
            return null;
        }
        search = search.slice(1);
        var searchArr = search.split("&");
        var length = searchArr.length;
        for (var i:number = 0; i < length; i++) {
            var str = searchArr[i];
            var arr = str.split("=");
            if (arr[0] == key) {
                return arr[1];
            }
        }
        return null;
    }

    private static getUid():string {
        return ShareUtils.findLocationProperty("uid");
    }

    public static onEnterGame():void {
        if(ShareUtils.isInBaidu())
            return;

        var appId:string = ShareUtils.findLocationProperty("app_id");
        var gameId:string = ShareUtils.findLocationProperty("game_id");
        var deviceId:string = ShareUtils.findLocationProperty("device_id");
        if (appId && gameId) {
            if (!deviceId) {
                deviceId = egret.localStorage.getItem("device_id");
                if (!deviceId) {
                    deviceId = <any>Math.random();
                }
            }
            egret.localStorage.setItem("device_id",deviceId);
            var url:string = "http://statistics.egret-labs.org/api.php?app_id=" + appId + "&game_id=" + gameId + "&device_id=" + deviceId;
            var channel = ShareUtils.findLocationProperty("channel");
            if (channel && ShareUtils.isInWeChat()) {
                url += "&channel=" + channel;
            }

            if (url) {
                var urlLoader = new egret.URLLoader();
                urlLoader.load(new egret.URLRequest(url));
            }
        }
    }
}