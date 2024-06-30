import { _decorator, Component, EventKeyboard, Input, input, KeyCode, log } from 'cc';
import { Movement } from './Movement'; // Import the Movement class
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('KeyListener')
export class KeyLisener extends Component {

    @property(Movement)
    movement: Movement = null; // Reference to the Movement component
    @property(GameManager)
    gameManager: GameManager = null; // Reference to the GameManager component
    
    private keys: { [keyCode: number]: boolean } = {}; // Dictionary to keep track of key states

    
    onEnable() {
        // Register the event listeners for the key events
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        // Unregister the event listeners when the component is destroyed
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onAtack(){
        this.gameManager.earnGem();
        this.movement.attack();
    }

    onRelease(keycode: KeyCode) {
        this.keys[keycode] = false; 
        this.onKeyUp2(keycode);
    }
    
    onPress(keycode: KeyCode) {
        this.keys[keycode] = true;
        this.onKeyDown2(keycode);

    }

    onKeyDown(event: EventKeyboard){
        this.onKeyDown2(event.keyCode);
    }

    onKeyDown2(keyCode: KeyCode) {
        this.keys[keyCode] = true; // Mark the key as pressed
        if(this.gameManager.isGameOver)
            return;
        switch (keyCode) {
            case KeyCode.KEY_A:
                this.movement.moveLeft();
                break;
            case KeyCode.KEY_W:
                this.movement.moveUp();
                break;
            case KeyCode.KEY_S:
                this.movement.moveDown();
                break;
            case KeyCode.KEY_D:
                this.movement.moveRight();
                break;
            case KeyCode.SHIFT_LEFT:
            case KeyCode.SHIFT_RIGHT:
                this.movement.startRunning();
                break;
                case KeyCode.SPACE:
                    this.gameManager.earnGem();
                    this.movement.attack();
                    break;
        }
    }

    onKeyUp(event: EventKeyboard){
        this.onKeyUp2(event.keyCode);
    }

    onKeyUp2(keyCode: KeyCode) {

        this.keys[keyCode] = false; // Mark the key as released
        if(this.gameManager.isGameOver)
            return;
        if (keyCode === KeyCode.SHIFT_LEFT || keyCode === KeyCode.SHIFT_RIGHT) {
            this.movement.stopRunning();
            
        } else if (!this.keys[KeyCode.KEY_A] && !this.keys[KeyCode.KEY_W] && !this.keys[KeyCode.KEY_S] && !this.keys[KeyCode.KEY_D]) {            
            this.movement.stopMovement(); // Stop the animation if no movement key is pressed
            // if (event.keyCode === KeyCode.SPACE) //atack
                // this.movement.attack();

        } else {
            switch (keyCode) {
                case KeyCode.KEY_A:
                case KeyCode.KEY_D:
                    if (!this.keys[KeyCode.KEY_A] && !this.keys[KeyCode.KEY_D]) {
                        this.movement.direction.x = 0;
                    }
                    break;
                case KeyCode.KEY_W:
                case KeyCode.KEY_S:
                    if (!this.keys[KeyCode.KEY_W] && !this.keys[KeyCode.KEY_S]) {
                        this.movement.direction.y = 0;
                    }
                    break;
                case KeyCode.SPACE: //atack
                    // this.movement.attack();
                    break;
                default:                
                    break;
            }
        }
    }
}
