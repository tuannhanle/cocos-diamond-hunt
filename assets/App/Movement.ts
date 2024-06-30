import { _decorator, Node,Component, Vec2,Contact2DType, Collider2D,RigidBody2D } from 'cc';
import { Character } from './Character';
import { GameManager } from './GameManager';
import { SoundManage } from './SoundManage';

const { ccclass, property } = _decorator;

@ccclass('Movement')
export class Movement extends Component {

    @property(Character)
    character: Character = null; // Reference to the Character component

    @property(GameManager)
    gameManager: GameManager = null; // Reference to the GameManager component

    @property
    speed: number = 10; // Normal movement speed

    @property
    runMultiplier: number = 2; // Speed multiplier when running

    boost: number = 1; // Speed multiplier when running

    public rigidBody: RigidBody2D = null;
    public velocity: Vec2 = new Vec2();

    public direction: Vec2 = new Vec2();
    public isRunning: boolean = false;
    public isAttacking: boolean = false;
    public lastDirection: number = 1;

    onEnable() {
        
        this.node.on('endGame', ()=>this.endGameHandler(),this)

    }


    onLoad() {
        this.rigidBody = this.getComponent(RigidBody2D);
    }

    endGameHandler(){
        
        this.stopRunning();
        this.stopMovement();

    }


    bootsUp() {
        SoundManage.instance.playAudioBooster();
        this.boost = 2;
        console.log("bootsUp: " );
        
        this.updateVelocity();
        this.schedule(()=>{
            this.boost = 1;
            this.updateVelocity();
        },0,0,5)
    }

    moveLeft() {        
        this.velocity.x = -this.speed;
        this.character.walkByNumber('1');
        this.lastDirection = 1;
        this.updateVelocity();

    }

    moveRight() {
        this.velocity.x = this.speed;
        this.character.walkByNumber('3');
        this.lastDirection = 3;
        this.updateVelocity();

    }

    moveUp() {
        this.velocity.y = this.speed;
        this.character.walkByNumber('4');
        this.lastDirection = 4;
        this.updateVelocity();

    }

    moveDown() {
        this.velocity.y = -this.speed;
        this.character.walkByNumber('2');
        this.lastDirection = 2;
        this.updateVelocity();

    }

    startRunning() {
        this.isRunning = true;
        this.updateVelocity();
 
    }

    stopRunning() {
        this.isRunning = false;
        // this.character.idleByNumber(this.lastDirection.toString());
        this.updateVelocity();
    }

    stopMovement() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.updateVelocity();

        this.character.stopAnimation();
        this.character.idleByNumber(this.lastDirection.toString());

    }




    attack() {
        if (this.gameManager.isGameOver === true) {
            return;
        }
        SoundManage.instance.playAudioOneHit();

        if (this.isAttacking) {
            this.character.restartAttack(this.lastDirection.toString(), () => {
                this.isAttacking = false;
                this.updateMovementAnimation();
            });
            return;

        }

        this.isAttacking = true;
        this.character.attackByNumber( this.lastDirection.toString(), () => {
            this.isAttacking = false;
            this.updateMovementAnimation();
        });
    }

    updateVelocity() {
        // Set the velocity on the rigidBody
        const velocityMultiplier = new Vec2(this.velocity.x * this.runMultiplier, this.velocity.y * this.runMultiplier);
        const speed =  this.isRunning ? velocityMultiplier: this.velocity;
        this.rigidBody.linearVelocity = new Vec2(speed.x * this.boost, speed.y * this.boost);
    }

    updateMovementAnimation() {
        if(this.gameManager.isGameOver){ 
            this.stopMovement();
            return;
        }
        if (this.isAttacking) 
            return;
        this.character.walkByNumber(this.lastDirection.toString());

    }

}
