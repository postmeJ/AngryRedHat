/**
 * Created by husong on 14/10/22.
 */
class ButtonSkin {
    private _upSkinName:string;
    private _downSkinName:string;
    constructor(upSkinName:string,downSkinName:string) {
        this._upSkinName = upSkinName;
        this._downSkinName = downSkinName;
    }

    public get upSkinName() {
        return this._upSkinName;
    }
    public get downSkinName() {
        return this._downSkinName;
    }
}