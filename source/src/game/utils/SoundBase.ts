/**
 * Created by FCX on 3/14/2016.
 */
class SoundBase extends egret.DisplayObjectContainer{

    public constructor (url?:string) {
        super();
        if(url)
            this._soundURL = url;

        this._sound = new egret.Sound();
        this._loadSound();

    }

    private _sound:egret.Sound;

    private _soundURL:string = "bgSound";

    private _soundChannel:egret.SoundChannel;
    //Ĭ�ϲ���λ�ã���ͷ��ʼ��
    private _positon:number = 0;
    //Ĭ�ϲ�ѭ��������Ϊ����ѭ��
    private _loop:number = 1;
    //��ǰ״̬0λ�գ�1λ���ţ�2λ��ͣ, 3��ʾ�������,4��ʾ����ʧ��
    private _status:number = 0;
    //������Ƶ
    private _loadSound() {
        if(RES.getRes(this._soundURL)){
            this._sound = RES.getRes(this._soundURL);
        }else{
            //���RES��δ���ظ���Դ�����Ծ���·������֮��
            this._sound.once(egret.Event.COMPLETE,this.loadComplete,this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
            this._sound.load(this._soundURL);
        }
    }
    //������Ƶ���
    private loadComplete (e:egret.Event) {
        this._status = 3;
        var waring:string = "�������";
        egret.log(waring);
        //ɾ������ʧ�ܵļ���
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this)
        this.dispatchEventWith(egret.Event.COMPLETE,false,waring);
    }
    //������Ƶʧ��
    private onLoadErr (e:egret.IOErrorEvent) {
        this._status = 4;
        var waring:string = "����ʧ��"+this._soundURL;
        egret.log(waring);
        //ɾ�����سɹ��ļ���
        this._sound.removeEventListener(egret.Event.COMPLETE,this.loadComplete,this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,waring);
    }
    //����url�����¼���
    public setUrl(url:string) {
        this._soundURL = url;
        this._loadSound();
    }
    //����ѭ��
    private looped(e:egret.Event){
        console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring: string = "�������";
        if(this._loop >= 0) {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE,false,waring);
        } else {
            this.play();
        }
    }
    //��ȡ״̬
    public getStatus() {
        return this._status;
    }
    //��������
    public setVolume (volume:number) {
        console.log(this._status);
        if(1 === this._status)
            this._soundChannel.volume = volume / 100;
    }
    //��ʾ����ʱ��
    public showPosition ():number {

        if(1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    }
    //������Ƶ
    public play() {
        if(4 === this._status){
            this._loadSound();
            return;
        }
        this._status = 1;
        if(this._soundChannel)
            this._soundChannel.stop();

        this._soundChannel = this._sound.play(this._positon,1);

        this._soundChannel.once(egret.Event.SOUND_COMPLETE,this.looped,this);

        return this._status;
    }
    //����ѭ��
    public setLoop(loop:number = 1):number{
        this._loop = loop;

        return loop;
    }
    //������ͣ
    public pause () {
        var temp = this._status;
        if(1 === temp){
            this._positon = this._soundChannel.position;
            this._soundChannel.stop();
            this._status = 2;
        }
        egret.log(this._positon);
        return temp;
    }
    //�ָ�
    public resume () {
        var temp = this._status;
        if(2 === temp) {
            this.play();

        }
        egret.log(this._positon);
        return temp;
    }
    //ֹͣ
    public stop () {
        this._status = 0;
        this._positon = 0;
        this._soundChannel.stop();
        this._soundChannel = null;
    }
}