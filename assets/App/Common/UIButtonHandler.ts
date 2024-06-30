import { _decorator, Component, Node, Button, EventHandler , KeyCode} from 'cc';
import { KeyLisener } from '../KeyListener';
const { ccclass, property } = _decorator;

@ccclass('UIButtonHandler')
export class UIButtonHandler extends Component {

    @property(Button)
    button: Button = null;

    @property(KeyLisener)
    keyListener: KeyLisener = null;

    // Define KeyCode enumeration

    @property
    keyNumber : number = 10;

    private keycode: KeyCode;

    onLoad() {
        // Ensure the button component is present
        if (!this.button) {
            this.button = this.getComponent(Button);
        }

        // Add event listeners for button press and release
        this.node.on(Node.EventType.TOUCH_START, this.onButtonPress, this);
        this.node.on(Node.EventType.TOUCH_END, this.onButtonRelease, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onButtonRelease, this);
        this.init();
    }

    init(){
        if(this.keyNumber == 1){
            this.keycode = KeyCode.KEY_W;
        }
        if(this.keyNumber == 2){
            this.keycode = KeyCode.KEY_A;
        }
        if(this.keyNumber == 3){
            this.keycode = KeyCode.KEY_S;
        }
        if(this.keyNumber == 4){
            this.keycode = KeyCode.KEY_D;
        }
        if(this.keyNumber == 5){
            this.keycode = KeyCode.SHIFT_LEFT;
        }
    }

    onButtonPress() {
        console.log('Button pressed');
        this.keyListener.onPress(this.keycode);
        // Handle button press logic here
    }

    onButtonRelease() {
        console.log('Button released');
        this.keyListener.onRelease(this.keycode);

        // Handle button release logic here
    }
}
