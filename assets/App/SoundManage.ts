import { _decorator, Component, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManage')
export class SoundManage extends Component {
    @property({ type: AudioClip })
    soundDiamond: AudioClip = null;


    @property({ type: AudioClip })
    soundBGGame: AudioClip = null;

    @property({ type: AudioClip })
    soundClickButton: AudioClip = null;

    @property({ type: AudioClip })
    soundGameOver: AudioClip = null;

    @property({ type: AudioClip })
    soundOneHit: AudioClip = null;

    @property({ type: AudioClip })
    soundBooster: AudioClip = null;

    @property({ type: AudioSource })
    bmgGameSource: AudioSource ;


    soundSource: AudioSource = null;

    static instance: SoundManage = null;

    onLoad() {
        if (SoundManage.instance == null) {
            SoundManage.instance = this;
        } else {
            this.node.destroy();
            return;
        }
        this.soundSource = this.getComponent(AudioSource);
        this.playSoundBackgroundGame();
    }

    playAudioOneHit() {

        this.soundSource.playOneShot(this.soundOneHit);
    }


    playGameOver(){
        this.soundSource.playOneShot(this.soundGameOver);
    }


    playSoundBackgroundGame() {
        console.log("1");
        if(this.bmgGameSource===null){
            console.log("nu;;");
            
        }
        this.bmgGameSource.loop = true;
        console.log("2");

        this.bmgGameSource.clip = this.soundBGGame;
        this.bmgGameSource.volume = 0.8;
        this.bmgGameSource.play();
    }

    stopSoundBackgroundGame() {
        this.bmgGameSource.stop();
    }

    playAudioBooster() {

        this.soundSource.playOneShot(this.soundBooster);
    }

    playAudioDiamond() {

        this.soundSource.playOneShot(this.soundDiamond);
    }

    playSound(clip: AudioClip) {

        this.soundSource.playOneShot(clip);
    }
}

