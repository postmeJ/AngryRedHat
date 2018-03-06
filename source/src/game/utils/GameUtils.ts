/**
 * Created by husong on 14/11/6.
 */
class GameUtils {
    public static createBitmapByName(name:string):egret.Bitmap {
        var bitmap = new egret.Bitmap();
        bitmap.texture = GameUtils.createTextureByName(name);
        return bitmap;
    }

    public static createTextureByName(name:string):egret.Texture {
        if(name.indexOf(".") == -1) {
            return RES.getRes(name);
        }
        else {
            var sheetName:string = name.split(".")[0];
            var textureName:string = name.split(".")[1];
            return GameUtils.createTexturesFromSheet(textureName,sheetName);
        }
    }

    public static createTexturesFromSheet(name:string, sheetName:string):egret.Texture {
        var sheet:egret.SpriteSheet = RES.getRes(sheetName);
        return sheet.getTexture(name);
    }
}