import { _decorator, CCClass, Component, sp , Node, log} from "cc";
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component{



    @property(Node)
    characterNode: Node = null;

    private currentAnimation: string = '';

    private spine?: sp.Skeleton;
    onLoad () {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        // this._hasStop = false;
    }

    playAnimation(animation: string, loop: boolean) {
        if (this.currentAnimation === animation) {
            return; // Animation is already playing
        }
        this.spine?.setAnimation(0, animation, loop);
        this.currentAnimation = animation;
    }

    stopAnimation() {
        this.currentAnimation = '';
        this.spine?.clearTrack(0);
    }


    walkByNumber (number: string) {
        this.playAnimation(number+'_walking', true);
    }

    attackByNumber (number: string, onComplete: () => void) {
        this.playAnimation(number+'_attack', false);
        this.spine.setCompleteListener((entry) => {
            if (entry.animation.name === number+'_attack') {
                onComplete();
            }
        });    
        this.currentAnimation = number+'_attack';
    }

    restartAttack(number: string, onComplete: () => void) {
        this.playAnimation(number+'_attack', false);
        this.spine.setCompleteListener((entry) => {
            if (entry.animation.name === number+'_attack') {
                onComplete();
            }
        });
        this.currentAnimation = number+'_attack';

    }


    idleByNumber (number: string) {
        this.spine?.setToSetupPose();
        this.playAnimation(number+'_idle', true);
    }

}


