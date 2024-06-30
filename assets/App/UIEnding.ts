import { _decorator, Component, Label, Node} from 'cc';
import { SoundManage } from './SoundManage';
const { ccclass, property } = _decorator;

@ccclass('UIEnding')
export class UIEnding extends Component {

    @property(Node)
    movement2: Node;

    @property(Label)
    highScoreLabel: Label = null; 


    show(highScore: number){
        this.node.active = true;
        this.highScoreLabel.string  = highScore.toString();
    }

    close(){
        SoundManage.instance.playSoundBackgroundGame();
        this.node.active = false;
    }
}